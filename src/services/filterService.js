import axiosClient from "./axiosClient";

const filterService = {
  // Filter sản phẩm
  filterProducts: (filters, page = 0, size = 9) => {
    const url = `/v1/filter?page=${page}&size=${size}`;
    const requestBody = {
      brands: filters.brands?.length > 0 ? filters.brands : undefined,
      colors: filters.colors?.length > 0 ? filters.colors : undefined,
      sizes:
        filters.sizes?.length > 0
          ? filters.sizes.map((size) => Number(size))
          : undefined,
      minPrice: Number(filters.minPrice) || 0,
      maxPrice: Number(filters.maxPrice) || 10000000,
      gender: filters.gender || undefined,
      sortBy: filters.sortBy || "name",
      sortDirection: filters.sortDirection || "asc",
      isBestseller: filters.isBestseller || undefined,
      isNew: filters.isNew || undefined,
      isFeatured: filters.isFeatured || undefined,
    };

    // Xóa các trường undefined
    Object.keys(requestBody).forEach(
      (key) => requestBody[key] === undefined && delete requestBody[key]
    );

    console.log("Filter URL:", url);
    console.log("Filter Body:", JSON.stringify(requestBody, null, 2));

    return axiosClient
      .post(url, requestBody)
      .then((response) => {
        console.log("Success Response:", response);
        return response;
      })
      .catch((error) => {
        console.error("Error Details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      });
  },
};

export default filterService;
