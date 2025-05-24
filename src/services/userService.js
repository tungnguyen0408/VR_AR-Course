import axiosClient from "./axiosClient";
const userService = {
  update: (userUpdate) => axiosClient.put("/update", userUpdate),
  create: (user) => axiosClient.post("/users", user),
};
export default userService;
