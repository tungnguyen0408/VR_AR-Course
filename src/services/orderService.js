import axiosClient from "./axiosClient";
const orderService = {
  getByUser: (userId, status) =>
    axiosClient.get(
      `/order/get?filter=user.id:${userId} and status~'${status}'&sort=orderDate,desc`
    ),
  create: (order) => axiosClient.post("/order/create", order),
  update: (id) => axiosClient.put(`/order/update/${id}`),
};
export default orderService;
