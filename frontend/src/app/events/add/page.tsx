/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddEventPage() {
  const [eventTitle, setEventTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!eventTitle || !dateTime || !location || !description) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt_token");
      const res = await apiFetch("/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventTitle,
          dateTime: new Date(dateTime).toISOString(),
          location,
          description,
        }),
      });
      console.log(res);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create event");
      setSuccess("Event created successfully!");
      setTimeout(() => router.push("/events"), 1200);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Add Event</h1>
        <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-xl border border-blue-100 space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Event Title</label>
            <input
              type="text"
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event title"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter location"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event description"
              required
              disabled={loading}
              rows={4}
            />
          </div>
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm">{error}</div>}
          {success && <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center text-sm">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
} 