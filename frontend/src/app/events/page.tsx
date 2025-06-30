/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/utils/authContext";
import EventCard from "@/components/EventCard";
import EventSearchFilterBar from "@/components/EventSearchFilterBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { useEvents } from "@/hooks/useEvent";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const { isLoggedIn, user } = useAuth();
  const userId = user?.id || user?._id;
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
  const { events, loading, error, updatingId, joinEvent, leaveEvent } = useEvents(search, filter, userId);

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">All Events</h1>
        <EventSearchFilterBar
          search={search}
          filter={filter}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
        />
        {loading ? (
          <div className="text-center py-12">Loading events...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No events found.</div>
        ) : (
          events.map((event: any) => (
            <EventCard
              key={event._id}
              event={event}
              onJoin={!event.joined && isLoggedIn && token ? (id) => joinEvent(id, token) : undefined}
              joining={updatingId === event._id}
              extraButton={event.joined ? (
                <button
                  onClick={() => token && leaveEvent(event._id, token)}
                  disabled={updatingId === event._id}
                  className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-600 border border-red-200 hover:bg-red-200 transition-all duration-200"
                >
                  {updatingId === event._id ? "Leaving..." : "Leave Event"}
                </button>
              ) : null}
            />
          ))
        )}
      </div>
    </ProtectedRoute>
  );
} 