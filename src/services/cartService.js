import axiosClient from "./axiosClient";

const cartService = {
  getByUser: (userId) => axiosClient.get(`/cart/${userId}`),
  getNumber: (userId) => axiosClient.get(`/cart/get/number/${userId}`),
  create: (data) => axiosClient.post("/cart/add", data),
  update: (id, data) => axiosClient.put(`/cart/update/${id}`, data),
  delete: (id) => axiosClient.delete(`/cart/delete/${id}`),
  deleteItem: (itemId) => {
    const url = `/cart/item/${itemId}`;
    return axiosClient.delete(url);
  },
};

export default cartService;
