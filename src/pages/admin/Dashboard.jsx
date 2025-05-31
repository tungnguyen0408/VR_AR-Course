import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Progress,
  Space,
  Tag,
  DatePicker,
  Select,
  Button,
  Tooltip,
  Badge,
} from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShoppingOutlined,
  WarningOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import SidebarAdmin from "../../components/SidebarAdmin";
import "./Dashboard.scss";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dataDashBoard, setDataDashBoard] = useState({});
  const [revenueData, setRevenueData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/dashboard/stats")
      .then((response) => {
        setDataDashBoard(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []); // [] để chỉ gọi 1 lần khi component mount
  // Fake data cho biểu đồ doanh thu
  // const revenueData = [
  //   { date: "01/03", revenue: 2500000, orders: 15 },
  //   { date: "02/03", revenue: 3200000, orders: 18 },
  //   { date: "03/03", revenue: 2800000, orders: 12 },
  //   { date: "04/03", revenue: 3500000, orders: 20 },
  //   { date: "05/03", revenue: 4200000, orders: 25 },
  //   { date: "06/03", revenue: 3800000, orders: 22 },
  //   { date: "07/03", revenue: 4500000, orders: 28 },
  //   { date: "08/03", revenue: 4100000, orders: 24 },
  //   { date: "09/03", revenue: 4800000, orders: 30 },
  //   { date: "10/03", revenue: 5200000, orders: 32 },
  //   { date: "11/03", revenue: 4900000, orders: 29 },
  //   { date: "12/03", revenue: 5500000, orders: 35 },
  //   { date: "13/03", revenue: 5100000, orders: 31 },
  //   { date: "14/03", revenue: 5800000, orders: 36 },
  //   { date: "15/03", revenue: 6200000, orders: 38 },
  // ];
  // Fake data cho thống kê sản phẩm

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/dashboard/revenue")
      .then((response) => {
        setRevenueData(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []); // [] để chỉ gọi 1 lần khi component mount
  const productStats = {
    totalProducts: 150,
    lowStockProducts: 12,
    outOfStockProducts: 3,
    productsByCategory: [
      { category: "Giày nam", count: 45, lowStock: 5, color: "#1890ff" },
      { category: "Giày nữ", count: 38, lowStock: 4, color: "#eb2f96" },
      { category: "Giày thể thao", count: 42, lowStock: 2, color: "#52c41a" },
      { category: "Giày trẻ em", count: 25, lowStock: 1, color: "#faad14" },
    ],
  };

  // Fake data cho sản phẩm sắp hết hàng
  const lowStockProducts = [
    {
      id: 1,
      name: "Giày thể thao Nike Air Max",
      category: "Giày thể thao",
      currentStock: 3,
      minStock: 5,
      status: "low",
      lastOrder: "2024-03-10",
    },
    {
      id: 2,
      name: "Giày cao gót Jimmy Choo",
      category: "Giày nữ",
      currentStock: 2,
      minStock: 5,
      status: "low",
      lastOrder: "2024-03-12",
    },
    {
      id: 3,
      name: "Giày bóng đá Adidas Predator",
      category: "Giày thể thao",
      currentStock: 0,
      minStock: 5,
      status: "out",
      lastOrder: "2024-03-15",
    },
  ];

  const lowStockColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          {record.status === "out" && <Badge status="error" text="Hết hàng" />}
        </Space>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      filters: productStats.productsByCategory.map((cat) => ({
        text: cat.category,
        value: cat.category,
      })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Tồn kho",
      dataIndex: "currentStock",
      key: "currentStock",
      render: (stock, record) => (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <span>{stock}</span>
            <Progress
              percent={Math.round((stock / record.minStock) * 100)}
              size="small"
              status={record.status === "out" ? "exception" : "normal"}
              style={{ width: 100 }}
            />
          </Space>
          <span className="last-order">Đơn hàng cuối: {record.lastOrder}</span>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "out" ? "red" : "orange"}>
          {status === "out" ? "Hết hàng" : "Sắp hết hàng"}
        </Tag>
      ),
    },
  ];

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log("Refreshing data...");
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleCategoryFilterChange = (value) => {
    setCategoryFilter(value);
  };

  const COLORS = productStats.productsByCategory.map((cat) => cat.color);

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Tổng quan</h1>
            <Tooltip title="Làm mới dữ liệu">
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                className="refresh-button"
              />
            </Tooltip>
          </div>
          <div className="header-filters">
            <Space>
              <RangePicker
                onChange={handleDateRangeChange}
                value={dateRange}
                placeholder={["Từ ngày", "Đến ngày"]}
              />
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={handleCategoryFilterChange}
                value={categoryFilter}
              >
                <Option value="all">Tất cả danh mục</Option>
                {productStats.productsByCategory.map((cat) => (
                  <Option key={cat.category} value={cat.category}>
                    {cat.category}
                  </Option>
                ))}
              </Select>
            </Space>
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <Row gutter={[16, 16]} className="statistics-row">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng doanh thu"
                value={dataDashBoard.totalRevenue}
                precision={0}
                prefix={<DollarOutlined />}
                suffix="đ"
                valueStyle={{ color: "#3f8600" }}
              />
              {/* <div className="statistic-footer">
                <Space>
                  <span className="trend up">
                    <ArrowUpOutlined /> 15%
                  </span>
                  <span className="period">so với tháng trước</span>
                </Space>
              </div> */}
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng đơn hàng"
                value={dataDashBoard.totalOrders}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
              {/* <div className="statistic-footer">
                <Space>
                  <span className="trend up">
                    <ArrowUpOutlined /> 8%
                  </span>
                  <span className="period">so với tháng trước</span>
                </Space>
              </div> */}
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng khách hàng"
                value={dataDashBoard.totalCustomers}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
              {/* <div className="statistic-footer">
                <Space>
                  <span className="trend up">
                    <ArrowUpOutlined /> 12%
                  </span>
                  <span className="period">so với tháng trước</span>
                </Space>
              </div> */}
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng sản phẩm"
                value={dataDashBoard.totalProducts}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: "#fa8c16" }}
              />
              <div className="statistic-footer">
                <Space direction="vertical" size="small">
                  <span className="trend warning">
                    <WarningOutlined /> {productStats.lowStockProducts} sản phẩm
                    sắp hết hàng
                  </span>
                  <span className="trend danger">
                    {productStats.outOfStockProducts} sản phẩm hết hàng
                  </span>
                </Space>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Biểu đồ doanh thu và đơn hàng */}
        <Row gutter={[16, 16]} className="chart-row">
          <Col xs={24} lg={16}>
            <Card title="Biểu đồ doanh thu và đơn hàng" className="chart-card">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    yAxisId="left"
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => value}
                  />
                  <RechartsTooltip
                    formatter={(value, name) => {
                      if (name === "revenue") {
                        return [
                          `${value.toLocaleString("vi-VN")}đ`,
                          "Doanh thu",
                        ];
                      }
                      return [value, "Số đơn hàng"];
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    name="Doanh thu"
                    stroke="#1890ff"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    name="Số đơn hàng"
                    stroke="#52c41a"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Phân bố sản phẩm theo danh mục" className="chart-card">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productStats.productsByCategory}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {productStats.productsByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value, name) => [`${value} sản phẩm`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Thống kê sản phẩm */}
        {/* <Row gutter={[16, 16]} className="product-stats-row">
          <Col xs={24} lg={12}>
            <Card
              title="Thống kê sản phẩm theo danh mục"
              className="category-stats-card"
              extra={
                <Tooltip title="Lọc theo danh mục">
                  <Button icon={<FilterOutlined />} />
                </Tooltip>
              }
            >
              <div className="category-stats">
                {productStats.productsByCategory.map((category) => (
                  <div key={category.category} className="category-item">
                    <div className="category-header">
                      <Space>
                        <div
                          className="category-color"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="category-name">
                          {category.category}
                        </span>
                      </Space>
                      <span className="category-count">
                        {category.count} sản phẩm
                      </span>
                    </div>
                    <Progress
                      percent={Math.round(
                        (category.count / productStats.totalProducts) * 100
                      )}
                      size="small"
                      status={category.lowStock > 0 ? "exception" : "normal"}
                      strokeColor={category.color}
                    />
                    {category.lowStock > 0 && (
                      <div className="low-stock-warning">
                        <WarningOutlined /> {category.lowStock} sản phẩm sắp hết
                        hàng
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title="Sản phẩm sắp hết hàng"
              className="low-stock-card"
              extra={
                <Space>
                  <Badge
                    count={productStats.lowStockProducts}
                    style={{ backgroundColor: "#faad14" }}
                  />
                  <Badge
                    count={productStats.outOfStockProducts}
                    style={{ backgroundColor: "#ff4d4f" }}
                  />
                </Space>
              }
            >
              <Table
                columns={lowStockColumns}
                dataSource={lowStockProducts}
                rowKey="id"
                pagination={false}
                size="small"
                scroll={{ y: 300 }}
              />
            </Card>
          </Col>
        </Row> */}
      </div>
    </div>
  );
};

export default Dashboard;
