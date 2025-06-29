import { Types } from 'mongoose';

export interface IEvent {
  eventTitle: string;
  name: string;
  dateTime: Date;
  location: string;
  description: string;
  attendeeCount: number;
  userId: Types.ObjectId;
  attendees: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventFilters {
  search?: string;
  filter?: 'today' | 'currentWeek' | 'lastWeek' | 'currentMonth' | 'lastMonth';
  sortBy?: 'dateTime';
  sortOrder?: 'asc' | 'desc';
}

export interface ICreateEventData {
  eventTitle: string;
  dateTime: Date;
  location: string;
  description: string;
  userId: string;
  name: string;
}

export interface IUpdateEventData {
  eventTitle?: string;
  dateTime?: Date;
  location?: string;
  description?: string;
}

export interface IJoinEventData {
  eventId: string;
  userId: string;
} 
export interface IEvent {
  eventTitle: string;
  name: string; // event creator name
  dateTime: Date;
  location: string;
  description: string;
  attendeeCount: number;
  userId: Types.ObjectId;
  attendees: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}