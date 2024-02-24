// Import moment-timezone at the top of your file
import moment from "moment-timezone";
// Import your Prisma class; ensure the path is correct relative to this file
import { Prisma } from "./Prisma";

interface ITrafficServiceQuery {
  userId: string;
  startTime: string;
  endTime?: string;
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
