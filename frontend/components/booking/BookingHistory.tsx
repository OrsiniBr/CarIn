"use client";

import { useState, useEffect } from "react";
import BookingCard from "./BookingCard";

interface Booking {
  id: string;
  spotId: string;
  spotLocation: string;
  date: string;
  startTime: string;
  endTime: string;
  totalCost: string;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  qrCode?: string;
  transactionHash?: string;
}

interface BookingHistoryProps {
  userAddress: string;
}

export default function BookingHistory({ userAddress }: BookingHistoryProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "active" | "completed">("all");

  useEffect(() => {
    fetchBookings();
  }, [userAddress]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // TODO: Fetch from smart contract or backend
      const mockBookings: Booking[] = [
        {
          id: "booking_1",
          spotId: "1",
          spotLocation: "123 Main St, San Francisco, CA",
          date: "2024-12-05",
          startTime: "09:00",
          endTime: "17:00",
          totalCost: "20.00",
          status: "confirmed",
          transactionHash: "0x123...abc",
        },
        {
          id: "booking_2",
          spotId: "2",
          spotLocation: "456 Market St, San Francisco, CA",
          date: "2024-12-04",
          startTime: "10:00",
          endTime: "14:00",
          totalCost: "12.50",
          status: "completed",
          transactionHash: "0x456...def",
        },
      ];
      setBookings(mockBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  if (loading) {
    return <div className="text-center py-12">Loading bookings...</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex gap-2">
          {(["all", "pending", "active", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No bookings found</p>
          <p className="text-sm text-gray-500">
            {filter === "all"
              ? "You haven't made any bookings yet."
              : `No ${filter} bookings found.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

