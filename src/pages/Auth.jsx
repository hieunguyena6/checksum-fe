import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, notification } from "antd";
import { useNavigate } from 'react-router-dom';
import { useMutation } from "react-query";
import { login, signUp } from "../utils/service";

const App = () => {
  const [form] = Form.useForm();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();
  const authMutation = useMutation({
    mutationFn: isLoginPage ? login : signUp,
  })

  const onFinish = async (values) => {
    try {        
      const response = await authMutation.mutateAsync(values);
      if (!isLoginPage) {
        notification.success({
          message: 'Sign up success! Please login again!'
        });
        form.resetFields();
        setIsLoginPage(true);
      } else {
        window.localStorage.setItem('token', response.data.data?.token)
        navigate('/');
      }
    } catch (error) {
      notification.error({
        message: `Auth error: ${error.response?.data?.message}`
      });
    }
  };

  return (
    <div className="login-page">
      <Card>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 6,
                message: "Password must be greater than 6 characters",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {isLoginPage ? "Login" : "Sign up"}
            </Button>
            <br />
            <br />
            Or{" "}
            <Button
              type="link"
              onClick={() => setIsLoginPage(!isLoginPage)}
              style={{ paddingLeft: 4 }}
            >
              {isLoginPage ? "Register now" : "Login now"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default App;
