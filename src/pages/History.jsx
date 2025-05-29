import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/ContextUser";
import "./History.scss";

const History = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const pageSize = 5;

  useEffect(() => {
    if (!user?.id) return;
    fetchOrders();
  }, [user, currentPage, selectedStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = selectedStatus === "ALL"
        ? `http://localhost:8080/api/orders/user/${user.id}?page=${currentPage}&size=${pageSize}`
        : `http://localhost:8080/api/orders/status/${selectedStatus}?page=${currentPage}&size=${pageSize}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 200) {
        setOrders(data.data.content);
        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ xử lý";
      case "PROCESSING":
        return "Đang xử lý";
      case "SHIPPED":
        return "Đang giao hàng";
      case "DELIVERED":
        return "Đã giao hàng";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <h1 className="history-title">Lịch sử đơn hàng</h1>

        <div className="filter-section">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(0);
            }}
            className="status-filter"
          >
            <option value="ALL">Tất cả đơn hàng</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="PROCESSING">Đang xử lý</option>
            <option value="SHIPPED">Đang giao hàng</option>
            <option value="DELIVERED">Đã giao hàng</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">Không có đơn hàng nào</div>
        ) : (
          <>
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Đơn hàng #{order.id}</h3>
                      <p className="order-date">
                        Ngày đặt: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="order-status">
                      <span className="status-badge">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-info">
                          <h4>{item.productName}</h4>
                          <p>Số lượng: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          {item.totalPrice.toLocaleString("vi-VN")} đ
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      Tổng tiền: {order.totalAmount.toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                >
                  Trước
                </button>
                <span>
                  Trang {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default History;
