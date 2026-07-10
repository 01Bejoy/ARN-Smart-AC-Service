import api from "../api/axios";

export const getMyBookings = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/bookings/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};