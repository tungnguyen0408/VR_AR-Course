import axiosClient from "./axiosClient";

const productApi = {
  // Lấy danh sách sản phẩm
  getAll: () => {
    const url = "/products";
    return axiosClient.get(url);
  },

  // Lấy thông tin chi tiết sản phẩm theo ID
  getById: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  // Lấy sản phẩm theo giới tính
  getByGender: (gender, page = 1, size = 9) => {
    const url = `/products/gender/${gender}?page=${page}&size=${size}`;
    return axiosClient.get(url);
  },

  // Lấy sản phẩm mới nhất
  getNewProducts: () => {
    const url = "/products/newest";
    return axiosClient.get(url);
  },

  // Thêm sản phẩm mới
  add: (data) => {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  // Cập nhật thông tin sản phẩm
  // update: (data) => {
  //   const url = `/products/${data.id}`;
  //   return axiosClient.patch(url, data);
  // },

  // Xóa sản phẩm
  remove: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },

  // Thêm đánh giá sản phẩm
  addReview: (productId, review) => {
    const url = `/products/${productId}/reviews`;
    return axiosClient.post(url, review);
  },

  getBestSellers: (page = 1, size = 9) =>
    axiosClient.get(`/products/bestsellers?page=${page}&size=${size}`),

  getDiscounted: (page = 0, size = 9) =>
    axiosClient.get(`/products/discounted?page=${page}&size=${size}`),

  // Lấy danh sách đánh giá của sản phẩm
  getReviews: (productId) => {
    const url = `/products/${productId}/reviews`;
    return axiosClient.get(url);
  },

  // Admin APIs
  create: (data) => {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },

  // Add this to your existing productApi object
  search: (query) => {
    const url = `/products/search?q=${encodeURIComponent(query)}`;
    return axiosClient.get(url);
  },
};

export default productApi;
