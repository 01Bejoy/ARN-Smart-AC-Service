import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/booking.service";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Service</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border p-2">{booking.serviceType}</td>
                <td className="border p-2">{booking.acBrand}</td>
                <td className="border p-2">{booking.bookingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}