import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Traffic, Location, Coordinate } from '@/types/types'; // Adjust the import path as necessary
import { Prisma } from '@/lib/prisma'