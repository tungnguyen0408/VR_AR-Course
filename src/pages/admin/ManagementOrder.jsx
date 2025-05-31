import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  message,
  Space,
  Card,
  Tag,
  Tooltip,
  Descriptions,
  Badge,
} from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import SidebarAdmin from "../../components/SidebarAdmin";
import "./ManagementOrder.scss";

const { Option } = Select;

const ManagementOrder = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    // Fake data
    {
      id: "DH001",
      customerName: "Nguyễn Văn A",
      customerPhone: "0123456789",
      customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
      orderDate: "2024-03-15 14:30",
      totalAmount: 2500000,
      status: "pending",
      paymentMethod: "COD",
      items: [
        {
          id: 1,
          name: "Giày thể thao Nike Air Max",
          price: 1500000,
          quantity: 1,
          size: "42",
          color: "Đen",
        },
        {
          id: 2,
          name: "Giày chạy bộ Adidas Ultraboost",
          price: 1000000,
          quantity: 1,
          size: "41",
          color: "Trắng",
        },
      ],
    },
    {
      id: "DH002",
      customerName: "Trần Thị B",
      customerPhone: "0987654321",
      customerAddress: "456 Đường XYZ, Quận 2, TP.HCM",
      orderDate: "2024-03-14 09:15",
      totalAmount: 1800000,
      status: "processing",
      paymentMethod: "BANKING",
      items: [
        {
          id: 3,
          name: "Giày cao gót Jimmy Choo",
          price: 1800000,
          quantity: 1,
          size: "38",
          color: "Đỏ",
        },
      ],
    },
    {
      id: "DH003",
      customerName: "Lê Văn C",
      customerPhone: "0369852147",
      customerAddress: "789 Đường DEF, Quận 3, TP.HCM",
      orderDate: "2024-03-13 16:45",
      totalAmount: 3200000,
      status: "completed",
      paymentMethod: "COD",
      items: [
        {
          id: 4,
          name: "Giày thể thao Puma RS-X",
          price: 1600000,
          quantity: 2,
          size: "43",
          color: "Xám",
        },
      ],
    },
    {
      id: "DH004",
      customerName: "Phạm Thị D",
      customerPhone: "0123987456",
      customerAddress: "321 Đường GHI, Quận 4, TP.HCM",
      orderDate: "2024-03-12 11:20",
      totalAmount: 4500000,
      status: "cancelled",
      paymentMethod: "BANKING",
      items: [
        {
          id: 5,
          name: "Giày bóng đá Adidas Predator",
          price: 2250000,
          quantity: 2,
          size: "40",
          color: "Đen",
        },
      ],
    },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((response) => {
        setOrders(response.data.data.content);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []); // [] để chỉ gọi 1 lần khi component mount
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "processing";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "COD":
        return "Thanh toán khi nhận hàng";
      case "BANKING":
        return "Chuyển khoản ngân hàng";
      default:
        return method;
    }
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `${amount.toLocaleString("vi-VN")}đ`,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => getPaymentMethodText(method),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge status={getStatusColor(status)} text={getStatusText(status)} />
      ),
      filters: [
        { text: "Chờ xử lý", value: "pending" },
        { text: "Đang xử lý", value: "processing" },
        { text: "Hoàn thành", value: "completed" },
        { text: "Đã hủy", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          {record.status === "pending" && (
            <>
              <Tooltip title="Xác nhận đơn hàng">
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleUpdateStatus(record.id, "processing")}
                />
              </Tooltip>
              <Tooltip title="Hủy đơn hàng">
                <Button
                  type="primary"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleUpdateStatus(record.id, "cancelled")}
                />
              </Tooltip>
            </>
          )}
          {record.status === "processing" && (
            <Tooltip title="Hoàn thành đơn hàng">
              <Button
                type="primary"
                icon={<TruckOutlined />}
                onClick={() => handleUpdateStatus(record.id, "completed")}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsViewModalVisible(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    message.success(
      `Cập nhật trạng thái đơn hàng ${orderId} thành ${getStatusText(
        newStatus
      )}`
    );
  };

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="management-content">
        <Card className="management-card">
          <div className="management-header">
            <h1>Quản lý đơn hàng</h1>
          </div>

          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />

          {/* Modal xem chi tiết đơn hàng */}
          <Modal
            title={`Chi tiết đơn hàng ${selectedOrder?.id}`}
            open={isViewModalVisible}
            onCancel={() => setIsViewModalVisible(false)}
            footer={null}
            width={800}
          >
            {selectedOrder && (
              <div className="order-details">
                <Descriptions title="Thông tin đơn hàng" bordered>
                  <Descriptions.Item label="Mã đơn hàng" span={3}>
                    {selectedOrder.id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày đặt" span={3}>
                    {selectedOrder.orderDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái" span={3}>
                    <Badge
                      status={getStatusColor(selectedOrder.status)}
                      text={getStatusText(selectedOrder.status)}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Phương thức thanh toán" span={3}>
                    {getPaymentMethodText(selectedOrder.paymentMethod)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tổng tiền" span={3}>
                    {selectedOrder.totalAmount.toLocaleString("vi-VN")}đ
                  </Descriptions.Item>
                </Descriptions>

                <Descriptions
                  title="Thông tin khách hàng"
                  bordered
                  style={{ marginTop: 24 }}
                >
                  <Descriptions.Item label="Tên khách hàng" span={3}>
                    {selectedOrder.customerName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại" span={3}>
                    {selectedOrder.customerPhone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ" span={3}>
                    {selectedOrder.customerAddress}
                  </Descriptions.Item>
                </Descriptions>

                <div className="order-items" style={{ marginTop: 24 }}>
                  <h3>Chi tiết sản phẩm</h3>
                  <Table
                    columns={[
                      {
                        title: "Sản phẩm",
                        dataIndex: "name",
                        key: "name",
                      },
                      {
                        title: "Giá",
                        dataIndex: "totalPrice",
                        key: "price",
                        render: (price) => `${price.toLocaleString("vi-VN")}đ`,
                      },
                      {
                        title: "Số lượng",
                        dataIndex: "quantity",
                        key: "quantity",
                      },
                      {
                        title: "Size",
                        dataIndex: "size",
                        key: "size",
                      },
                      {
                        title: "Màu sắc",
                        dataIndex: "color",
                        key: "color",
                      },
                      {
                        title: "Thành tiền",
                        key: "total",
                        render: (_, record) =>
                          `${(
                            record.totalPrice * record.quantity
                          ).toLocaleString("vi-VN")}đ`,
                      },
                    ]}
                    dataSource={selectedOrder.items}
                    rowKey="id"
                    pagination={false}
                  />
                </div>
              </div>
            )}
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default ManagementOrder;
