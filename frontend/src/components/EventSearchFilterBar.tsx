import React from "react";

interface Props {
  search: string;
  filter: string;
  onSearchChange: (v: string) => void;
  onFilterChange: (v: string) => void;
}

const filters = [
  { value: '', label: 'All Dates' },
  { value: 'today', label: "Today's Date" },
  { value: 'currentWeek', label: 'Current Week' },
  { value: 'lastWeek', label: 'Last Week' },
  { value: 'currentMonth', label: 'Current Month' },
  { value: 'lastMonth', label: 'Last Month' },
];

const EventSearchFilterBar: React.FC<Props> = ({ search, filter, onSearchChange, onFilterChange }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
    <input
      type="text"
      value={search}
      onChange={e => onSearchChange(e.target.value)}
      placeholder="Search events by title..."
      className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    />
    <select
      value={filter}
      onChange={e => onFilterChange(e.target.value)}
      className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    >
      {filters.map(f => (
        <option key={f.value} value={f.value}>{f.label}</option>
      ))}
    </select>
  </div>
);

export default EventSearchFilterBar; 