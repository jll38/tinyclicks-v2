// Assuming this is in /types/types.ts

export interface ILocation {
  city: string;
  region_name: string;
  country_name: string;
  country_code: string;
  postal: string;
  coordinates: Coordinate;
}

export class Traffic {
  readonly ip_address: string;
  readonly ip_type: string;
  readonly location: Location;
  readonly device: string;
  readonly browser: string;

  private constructor(
    ip_address: string,
    ip_type: string,
    location: Location,
    device: string,
    browser: string
  ) {
    this.location = location;
    this.ip_address = ip_address;
    this.ip_type = ip_type;
    this.browser = browser;
    this.device = device;
  }

  // Factory Method
  static create(
    ip_address: string,
    ip_type: string,
    location: Location,
    device: string,
    browser: string
  ): Traffic {
    return new Traffic(ip_address, ip_type, location, device, browser);
  }
}

export class Coordinate {
  readonly latitude: number;
  readonly longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

}

export class Location implements ILocation {
  readonly city: string;
  readonly region_name: string;
  readonly country_name: string;
  readonly country_code: string;
  readonly postal: string;
  readonly coordinates: Coordinate;

  constructor(
    city: string,
    region_name: string,
    country_name: string,
    country_code: string,
    postal: string,
    coordinates: Coordinate
  ) {
    this.city = city;
    this.region_name = region_name;
    this.country_name = country_name;
    this.country_code = country_code;
    this.postal = postal;
    this.coordinates = coordinates;
  }

  getCoordinates(): number[] {
    return [this.coordinates.latitude, this.coordinates.longitude];
  }

  toString(): string {
    return `${this.city}, ${this.region_name}, ${this.country_name}, ${this.country_code}`;
  }
}

import { User as NextAuthUser } from "next-auth";

export class User implements NextAuthUser {
  id: string;
  name: string;
  email: string;
  image?: string

  constructor(name: string, email: string, id: string, image?: string) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.image = image;
  }
}
