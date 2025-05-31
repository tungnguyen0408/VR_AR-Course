import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
  Card,
  Tag,
  Select,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import SidebarAdmin from "../../components/SidebarAdmin";
import "./ManagementCustomer.scss";

const { TextArea } = Input;
const { Option } = Select;

const ManagementCustomer = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([
    // Fake data
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      totalOrders: 5,
      totalSpent: 2500000,
      status: "active",
      joinDate: "2024-01-15",
      lastOrder: "2024-03-10",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      totalOrders: 3,
      totalSpent: 1500000,
      status: "active",
      joinDate: "2024-02-01",
      lastOrder: "2024-03-05",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@gmail.com",
      phone: "0369852147",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      totalOrders: 0,
      totalSpent: 0,
      status: "inactive",
      joinDate: "2024-03-01",
      lastOrder: null,
    },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/profiles")
      .then((response) => {
        setCustomers(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []); // [] để chỉ gọi 1 lần khi component mount
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tổng đơn hàng",
      dataIndex: "totalOrders",
      key: "totalOrders",
      sorter: (a, b) => a.totalOrders - b.totalOrders,
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (totalSpent) => `${totalSpent.toLocaleString("vi-VN")}đ`,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "green"}>
          {status === "active" ? "Hoạt động" : "Hoạt động"}
        </Tag>
      ),
      filters: [
        { text: "Hoạt động", value: "active" },
        { text: "Không hoạt động", value: "inactive" },
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
          <Tooltip title="Sửa thông tin">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa khách hàng">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa khách hàng này?"
              description="Việc xóa khách hàng sẽ không thể khôi phục."
              onConfirm={() => handleDelete(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                disabled={record.totalOrders > 0}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingCustomer(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalVisible(true);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    message.success("Xóa khách hàng thành công");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingCustomer) {
        // Cập nhật khách hàng
        setCustomers(
          customers.map((customer) =>
            customer.id === editingCustomer.id
              ? { ...customer, ...values }
              : customer
          )
        );
        message.success("Cập nhật thông tin khách hàng thành công");
      } else {
        // Thêm khách hàng mới
        const newCustomer = {
          id: customers.length + 1,
          totalOrders: 0,
          totalSpent: 0,
          status: "active",
          joinDate: new Date().toISOString().split("T")[0],
          lastOrder: null,
          ...values,
        };
        setCustomers([...customers, newCustomer]);
        message.success("Thêm khách hàng mới thành công");
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="management-content">
        <Card className="management-card">
          <div className="management-header">
            <h1>Quản lý khách hàng</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm khách hàng
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={customers}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />

          {/* Modal thêm/sửa khách hàng */}
          <Modal
            title={
              editingCustomer
                ? "Sửa thông tin khách hàng"
                : "Thêm khách hàng mới"
            }
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={() => setIsModalVisible(false)}
            width={600}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Tên khách hàng"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khách hàng" },
                  { min: 2, message: "Tên khách hàng phải có ít nhất 2 ký tự" },
                ]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <TextArea rows={3} placeholder="Nhập địa chỉ" />
              </Form.Item>

              {editingCustomer && (
                <Form.Item
                  name="status"
                  label="Trạng thái"
                  rules={[
                    { required: true, message: "Vui lòng chọn trạng thái" },
                  ]}
                >
                  <Select>
                    <Option value="active">Hoạt động</Option>
                    <Option value="inactive">Không hoạt động</Option>
                  </Select>
                </Form.Item>
              )}
            </Form>
          </Modal>

          {/* Modal xem chi tiết khách hàng */}
          <Modal
            title={null}
            open={isViewModalVisible}
            onCancel={() => setIsViewModalVisible(false)}
            footer={null}
            width={500}
            className="customer-view-modal"
          >
            {selectedCustomer && (
              <div className="customer-details-modal">
                <div className="customer-avatar-block">
                  <img
                    src="/avatar-admin.png"
                    alt="Avatar"
                    className="customer-avatar-large"
                  />
                  <div className="customer-main-info">
                    <div className="customer-name">{selectedCustomer.name}</div>
                    <div className="customer-email">
                      <i
                        className="fa fa-envelope"
                        style={{ marginRight: 6 }}
                      />
                      {selectedCustomer.email}
                    </div>
                    <Tag
                      color={
                        selectedCustomer.status === "active" ? "green" : "red"
                      }
                      className="customer-status-tag"
                    >
                      {selectedCustomer.status === "active"
                        ? "Hoạt động"
                        : "Không hoạt động"}
                    </Tag>
                  </div>
                </div>
                <div className="customer-info-list">
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fa fa-phone" /> Số điện thoại:
                    </span>
                    <span className="info-value">{selectedCustomer.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fa fa-map-marker" /> Địa chỉ:
                    </span>
                    <span className="info-value">
                      {selectedCustomer.address}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fa fa-calendar-plus-o" /> Ngày tham gia:
                    </span>
                    <span className="info-value">
                      {selectedCustomer.joinDate}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fa fa-shopping-cart" /> Tổng đơn hàng:
                    </span>
                    <span className="info-value">
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fa fa-money" /> Tổng chi tiêu:
                    </span>
                    <span className="info-value">
                      {selectedCustomer.totalSpent.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fa fa-history" /> Đơn hàng gần nhất:
                    </span>
                    <span className="info-value">
                      {selectedCustomer.lastOrder || "Chưa có đơn hàng"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default ManagementCustomer;
