import axiosClient from "./axiosClient";
const userService = {
  update: (userUpdate) =>
    axiosClient.put(`/users/${userUpdate.id}`, userUpdate),
  create: (user) => axiosClient.post("/users", user),
  changePassword: (id, oldPassword, newPassword) => {
    const url = `/users/${id}/change-password`;
    return axiosClient.put(url, null, {
      params: {
        oldPassword,
        newPassword,
      },
    });
  },
  getUserByEmail: (email) => {
    const url = `/users/email/${encodeURIComponent(email)}`;
    return axiosClient.get(url);
  },
};
export default userService;
