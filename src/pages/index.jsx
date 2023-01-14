import React from "react";
import { Button, Layout, Row } from "antd";
import FileRegister  from "../components/FileRegister";
import CheckFile  from "../components/CheckFile";

export default function HomePage() {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/auth";
  };

  return (
    <Layout>
      <Layout.Header className="header">
        <Button danger type="primary" onClick={handleLogout}>
          Log out
        </Button>
      </Layout.Header>
      <Row gutter={[24, 24]} align="center">
        <FileRegister />
        <CheckFile />
      </Row>
    </Layout>
  );
}
