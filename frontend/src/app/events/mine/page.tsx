/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EventCard from "@/components/EventCard";
import EventEditModal from "@/components/EventEditModal";
import { apiFetch } from "@/utils/api";

const deleteEvent = async ({ eventId, token }: { eventId: string; token: string }) => {
  const res = await fetch(`/api/events/${eventId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete event");
  return data.data;
};

const updateEvent = async ({ eventId, token, updateData }: { eventId: string; token: string; updateData: any }) => {
  const res = await fetch(`/api/events/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...updateData,
      dateTime: new Date(updateData.dateTime).toISOString(),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update event");
  return data.data;
};

export default function MyEventsPage() {
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<any>(null);
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const res = await apiFetch("/events/my/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch events");
        setEvents(data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, [token]);

  const handleDelete = async (eventId: string) => {
    if (!token) return;
    if (window.confirm("Are you sure you want to delete this event?")) {
      setDeletingId(eventId);
      try {
        await deleteEvent({ eventId, token });
        setEvents((prev) => prev.filter((e) => e._id !== eventId));
      } catch (err: any) {
        setEditError(err.message || "Failed to delete event");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (event: any) => {
    setEditEvent(event);
    setEditOpen(true);
    setEditError("");
  };

  const handleEditSubmit = async (data: { eventTitle: string; dateTime: string; location: string; description: string }) => {
    if (!token || !editEvent) return;
    setEditLoading(true);
    setEditError("");
    try {
      await updateEvent({ eventId: editEvent._id, token, updateData: data });
      setEditOpen(false);
      setEditEvent(null);
      // Refetch events after update
      const res = await fetch("/api/events/my/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await res.json();
      setEvents(updatedData.data || []);
    } catch (err: any) {
      setEditError(err.message || "Failed to update event");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">My Events</h1>
        {loading ? (
          <div className="text-center py-12">Loading your events...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 py-12">You haven&lsquo;t created any events yet.</div>
        ) : (
          events.map((event: any) => (
            <div key={event._id} className="relative">
              <EventCard event={event} />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 font-medium border border-yellow-200 hover:bg-yellow-200 transition-all"
                  onClick={() => handleEdit(event)}
                  disabled={editLoading && editEvent?._id === event._id}
                >
                  Update
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-medium border border-red-200 hover:bg-red-200 transition-all"
                  onClick={() => handleDelete(event._id)}
                  disabled={deletingId === event._id}
                >
                  {deletingId === event._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
        <EventEditModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          event={editEvent}
          onSubmit={handleEditSubmit}
          loading={editLoading}
          error={editError}
        />
      </div>
    </ProtectedRoute>
  );
} 