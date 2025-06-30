/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from "react";
import Image from "next/image";

export interface EventCardProps {
  event: {
    _id: string;
    eventTitle: string;
    name: string;
    dateTime: string;
    location: string;
    description: string;
    attendeeCount: number;
          attendees?: {
        _id: string;
        name: string;
        email: string;
        photoURL?: string;
      }[],
    joined?: boolean;
  };
  onJoin?: (eventId: string) => void;
  joining?: boolean;
  extraButton?: React.ReactNode;
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoin, joining, extraButton }) => {
  const attendees = event.attendees || [];
  return (
    <div className="card p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h2 className="text-xl font-bold text-blue-700 mb-2 md:mb-0">{event.eventTitle}</h2>
        <span className="text-sm text-gray-500">By {event.name}</span>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
        <span>📅 {new Date(event.dateTime).toLocaleString()}</span>
        <span>📍 {event.location}</span>
      </div>
      <p className="mb-3 text-gray-700">{event.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-semibold">Attendees: {event.attendeeCount}</span>
          {attendees.length > 0 && (
            <div className="flex -space-x-2">
              {attendees.slice(0, 5).map((att, idx) => (
                <Image
                  key={att._id || att.email || idx}
                  src={att.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt={att.name || att.email || 'Attendee'}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full border-2 border-white shadow object-cover"
                  title={att.name || att.email}
                />
              ))}
              {attendees.length > 5 && (
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold border-2 border-white">+{attendees.length - 5}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {onJoin && (
            <button
              onClick={() => onJoin(event._id)}
              disabled={joining || event.joined}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow ${event.joined ? 'bg-green-100 text-green-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'} ${joining ? 'opacity-60' : ''}`}
            >
              {event.joined ? 'Joined' : joining ? 'Joining...' : 'Join Event'}
            </button>
          )}
          {extraButton}
        </div>
      </div>
    </div>
  );
};

export default EventCard; 