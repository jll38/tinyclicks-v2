import moment from "moment-timezone";
import { Prisma } from "./Prisma";

import { IPINFO_TOKEN, countries } from "./constants";

import { ILocation, Traffic, Coordinate, Location } from "@/types/types";

import { NextRequest } from "next/server";
interface ITrafficServiceQuery {
  userId: string;
  startTime: string;
  endTime?: string;
}

interface ITrafficServiceQueryByLink extends ITrafficServiceQuery {
  linkId: string;
}
export class TrafficLogger {
  static _parseRequestIP(req: NextRequest) {
    // Check if running in development environment
    if (process.env.NODE_ENV === "development") {
      // Return a simulated external IP address
      return "128.235.13.5";
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : req.ip;
    return ip;
  }

  static async _retrieveLocation(ip: string | undefined): Promise<Location> {
    if (!ip) throw new Error("Invalid or non-existant IP address");
    const response = await fetch(
      `https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`
    );
    const {
      city,
      region: region_name,
      country: country_code,
      postal,
      loc,
    } = await response.json();

    const country_name = countries[country_code];

    // Destructure the 'loc' string to parse latitude and longitude for coordinates
    const [latitude, longitude] = loc.split(",").map(Number.parseFloat);
    const coordinates = new Coordinate(latitude, longitude);

    return new Location(
      city,
      region_name,
      country_name,
      country_code,
      postal,
      coordinates
    );
  }
}

export class LinkTrafficLogger extends TrafficLogger {
  static async recordTraffic(linkId: string, req: NextRequest): Promise<void> {
    //1. Parse Request IP
    const ip = this._parseRequestIP(req);
    //2. Get Location Object
    const location = await this._retrieveLocation(ip);
    //3. Get Origin Device and Browser

    //4. Write to the database

    try {
      await Prisma.getInstance().traffic.create({
        data: {
          linkId,
          //@ts-ignore
          location,
        },
      });
    } catch (e) {
      throw new Error(`Error creating Traffic Record:\n ${e}`);
    }
  }
}

export class TrafficService {
  // Helper function to calculate start of the day in UTC for given day offset
  static _getStartOfDayUTC(timeZone: string, daysOffset = 0) {
    return moment()
      .tz(timeZone)
      .startOf("day")
      .subtract(daysOffset, "days")
      .tz("UTC")
      .format();
  }

  // Function to query traffic data for a specific period
  static async _queryTrafficData(query: ITrafficServiceQuery) {
    // Use the Prisma singleton instance for database operations
    return await Prisma.getInstance().user.findMany({
      where: {
        id: query.userId,
      },
      select: {
        links: {
          select: {
            traffic: {
              select: {
                createdAt: true,
              },
              where: {
                createdAt: {
                  gte: query.startTime,
                  lt: query.endTime ? query.endTime : undefined,
                },
              },
            },
          },
        },
      },
    });
  }

  static async _queryTrafficDataByLink(query: ITrafficServiceQueryByLink) {
    // Use the Prisma singleton instance for database operations
    return await Prisma.getInstance().user.findMany({
      where: {
        id: query.userId
      },
      select: {
        links: {
          select: {
            traffic: {
              select: {
                createdAt: true,
              },
              where: {
                linkId: query.linkId,
                createdAt: {
                  gte: query.startTime,
                  lt: query.endTime ? query.endTime : undefined,
                },
              },
            },
          },
        },
      },
    });
  }

  static async _queryAllTrafficData(userId: string) {
    // Use the Prisma singleton instance for database operations
    return await Prisma.getInstance().user.findMany({
      where: {
        id: userId,
      },
      select: {
        links: {
          select: {
            id: true,
            traffic: {
              select: {
                id: true,
                location: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
  }
}

export class TodaysTrafficService extends TrafficService {
  static async getClicksCount(userId: string, timeZone: string) {
    const startOfTodayUTC = this._getStartOfDayUTC(timeZone);
    const startOfPreviousDayUTC = this._getStartOfDayUTC(timeZone, 1);

    const trafficData = await this._queryTrafficData({
      userId,
      startTime: startOfPreviousDayUTC,
    });

    let todaysClicks = 0;
    let previousDaysClicks = 0;

    trafficData.forEach(({ links }: any) => {
      links.forEach(({ traffic }: any) => {
        traffic.forEach(({ createdAt }: any) => {
          const createdAtUTC = moment(createdAt).tz("UTC").format();
          if (createdAtUTC >= startOfTodayUTC) {
            todaysClicks++;
          } else {
            previousDaysClicks++;
          }
        });
      });
    });

    return { todaysClicks, previousDaysClicks };
  }
}
