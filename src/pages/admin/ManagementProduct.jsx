import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Space,
  Popconfirm,
  Card,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import SidebarAdmin from "../../components/SidebarAdmin";
import "./ManagementProduct.scss";

const { Option } = Select;
const { TextArea } = Input;

const ManagementProduct = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    // Fake data
    {
      id: 1,
      name: "Nike Air Max",
      price: 2500000,
      brand: "Nike",
      image: "https://example.com/nike-air-max.jpg",
      description: "Giày thể thao Nike Air Max",
      stock: 50,
      category: "Nam",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 3200000,
      brand: "Adidas",
      image: "https://example.com/adidas-ultraboost.jpg",
      description: "Giày chạy bộ Adidas Ultraboost",
      stock: 30,
      category: "Nam",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/all")
      .then((response) => {
        setProducts(response.data.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []); // [] để chỉ gọi 1 lần khi component mount
  // Fake data cho brands
  const brands = [
    { id: 1, name: "Nike" },
    { id: 2, name: "Adidas" },
    { id: 3, name: "Puma" },
    { id: 4, name: "New Balance" },
    { id: 5, name: "Converse" },
  ];

  // Fake data cho categories
  const categories = ["Nam", "Nữ", "Trẻ em"];

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      filters: brands.map((brand) => ({ text: brand.name, value: brand.name })),
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")}đ`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Tồn kho",
      dataIndex: "stockQuantity",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "category",
      filters: categories.map((category) => ({
        text: category,
        value: category,
      })),
      onFilter: (value, record) => record.category === value,
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
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    axios.delete(`http://localhost:8080/api/products/${id}`);
    message.success("Xóa sản phẩm thành công");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        // Cập nhật sản phẩm
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id
              ? { ...product, ...values }
              : product
          )
        );
        message.success("Cập nhật sản phẩm thành công");
      } else {
        // Thêm sản phẩm mới
        const newProduct = {
          id: products.length + 1,
          ...values,
        };
        setProducts([...products, newProduct]);
        const temp = {
          name: values.name,
          describe: values.description,
          price: values.price,
          categoryId: 2,
          stockQuantity: values.stock,
        };
        axios.post("http://localhost:8080/api/products", temp);
        message.success("Thêm sản phẩm thành công");
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
            <h1>Quản lý sản phẩm</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm sản phẩm
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />

          <Modal
            title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={() => setIsModalVisible(false)}
            width={800}
          >
            <Form form={form} layout="vertical" initialValues={{ stock: 0 }}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                name="brand"
                label="Thương hiệu"
                rules={[
                  { required: true, message: "Vui lòng chọn thương hiệu" },
                ]}
              >
                <Select placeholder="Chọn thương hiệu">
                  {brands.map((brand) => (
                    <Option key={brand.id} value={brand.name}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  min={0}
                  placeholder="Nhập giá sản phẩm"
                />
              </Form.Item>

              <Form.Item
                name="stock"
                label="Số lượng tồn kho"
                rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Nhập số lượng tồn kho"
                />
              </Form.Item>

              <Form.Item
                name="image"
                label="Link ảnh sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập link ảnh" }]}
              >
                <Input placeholder="Nhập link ảnh sản phẩm" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default ManagementProduct;
