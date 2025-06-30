/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  event: any;
  onSubmit: (data: { eventTitle: string; dateTime: string; location: string; description: string }) => void;
  loading?: boolean;
  error?: string;
}

const EventEditModal: React.FC<Props> = ({ open, onClose, event, onSubmit, loading, error }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (event) {
      setEventTitle(event.eventTitle || "");
      setDateTime(event.dateTime ? event.dateTime.slice(0, 16) : ""); // for datetime-local input
      setLocation(event.location || "");
      setDescription(event.description || "");
    }
  }, [event, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          disabled={loading}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit({ eventTitle, dateTime, location, description });
          }}
          className="space-y-5"
        >
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Event Title</label>
            <input
              type="text"
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
              rows={3}
            />
          </div>
          {error && <div className="p-2 bg-red-50 border border-red-200 rounded text-red-600 text-center text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventEditModal; 