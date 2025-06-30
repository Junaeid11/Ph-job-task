/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useEvents.ts
import { useState, useEffect } from "react";
import { apiFetch } from "@/utils/api";

interface Event {
  _id: string;
  eventTitle: string;
  name: string;
  dateTime: string;
  location: string;
  description: string;
  attendeeCount: number;
  attendees: any[];
  joined?: boolean;
}

export const useEvents = (search: string, filter: string, userId?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filter) params.append("filter", filter);
        params.append("sortBy", "dateTime");
        params.append("sortOrder", "desc");

        const res = await apiFetch(`/events?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch events");

        const updated = data.data.map((event: Event) => ({
          ...event,
          joined: event.attendees?.some((att) => att._id === userId),
        }));

        setEvents(updated);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [search, filter, userId]);

  const joinEvent = async (eventId: string, token: string) => {
    setUpdatingId(eventId);
    try {
      await apiFetch(`/events/${eventId}/join`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId
            ? {
                ...event,
                joined: true,
                attendeeCount: event.attendeeCount + 1,
                attendees: [...event.attendees, { _id: userId }],
              }
            : event
        )
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const leaveEvent = async (eventId: string, token: string) => {
    setUpdatingId(eventId);
    try {
      await apiFetch(`/events/${eventId}/leave`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId
            ? {
                ...event,
                joined: false,
                attendeeCount: event.attendeeCount - 1,
                attendees: event.attendees.filter((att) => att._id !== userId),
              }
            : event
        )
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return { events, loading, error, updatingId, joinEvent, leaveEvent };
};
