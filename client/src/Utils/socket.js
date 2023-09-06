import { io } from "socket.io-client";

export const initSocket = () => {
  return io(import.meta.env.VITE_BACKEND_BASE);
};
