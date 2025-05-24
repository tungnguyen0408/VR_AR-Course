import axiosClient from "./axiosClient";
const emailService = {
  register: (data) => axiosClient.post("/email/register", data),
  order: (data) => axiosClient.post("/email/order", data),
};
export default emailService;
