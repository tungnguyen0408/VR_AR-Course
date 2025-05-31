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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SidebarAdmin from "../../components/SidebarAdmin";
import "./ManagementCategory.scss";

const { TextArea } = Input;

const ManagementCategory = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []); // [] để chỉ gọi 1 lần khi component mount

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Số sản phẩm",
      dataIndex: "productCount",
      key: "productCount",
      sorter: (a, b) => a.productCount - b.productCount,
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
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này?"
            description="Việc xóa danh mục có thể ảnh hưởng đến các sản phẩm thuộc danh mục này."
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              disabled={record.productCount > 0}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    axios.delete(`http://localhost:8080/api/categories/${id}`);
    message.success("Xóa danh mục thành công");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingCategory) {
        // Cập nhật danh mục
        setCategories(
          categories.map((category) =>
            category.id === editingCategory.id
              ? { ...category, ...values }
              : category
          )
        );
        const temp = {
          id: editingCategory.id,
          name: editingCategory.name,
          description: editingCategory.description,
          slug: "test",
        };
        axios.put(
          `http://localhost:8080/api/categories/${editingCategory.id}`,
          temp
        );
        message.success("Cập nhật danh mục thành công");
      } else {
        // Thêm danh mục mới
        const newCategory = {
          id: categories.length + 1,
          productCount: 0,
          status: "active",
          ...values,
        };
        setCategories([...categories, newCategory]);
        const temp = {
          id: categories.length + 1,
          name: values.name,
          description: values.description,
          slug: "test",
        };
        axios.post("http://localhost:8080/api/categories", temp);
        message.success("Thêm danh mục thành công");
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
            <h1>Quản lý danh mục</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm danh mục
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={categories}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />

          <Modal
            title={editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={() => setIsModalVisible(false)}
            width={600}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Tên danh mục"
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục" },
                  { min: 2, message: "Tên danh mục phải có ít nhất 2 ký tự" },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <TextArea rows={4} placeholder="Nhập mô tả danh mục" />
              </Form.Item>

              {editingCategory && (
                <Form.Item
                  name="status"
                  label="Trạng thái"
                  rules={[
                    { required: true, message: "Vui lòng chọn trạng thái" },
                  ]}
                >
                  <Input
                    type="radio"
                    options={[
                      { label: "Hoạt động", value: "active" },
                      { label: "Không hoạt động", value: "inactive" },
                    ]}
                  />
                </Form.Item>
              )}
            </Form>
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default ManagementCategory;
