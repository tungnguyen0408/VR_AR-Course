import axiosClient from "./axiosClient";
const authService = {
  login: (user) =>
    axiosClient.post("/auth/login", user, { withCredentials: true }),
};
export default authService;
