import { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import { Link } from "@reach/router";

export default function Sider() {
  const [collapsed, onCollapse] = useState(false);

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
