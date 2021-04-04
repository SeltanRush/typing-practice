import "./styles.css";
import useLogin from "../../hooks/use-login";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Layout, Typography } from "antd";
import type { RouteComponentProps } from "@reach/router";
import { Email } from "../../entities/email";
import { Password } from "../../entities/password";

type CredentialsFrom = {
  email: string;
  password: string;
};

export default function Login(_: RouteComponentProps) {
  const [error, changeError] = useState(null);

  const { login } = useLogin();

  const onSubmit = (form: CredentialsFrom | null) => {
    if (form) {
      try {
        const email = Email.from(form.email);
        const password = Password.from(form.password);
        login({
          email,
          password,
        });
      } catch (e) {
        changeError(e.toString());
      }
    }
  };

  return (
    <Layout className="full-page login">
      <Card size="small" className="login-container">
        <Typography.Title>Login</Typography.Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
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
              Log in
            </Button>
            {error ? <div className="error">{error}</div> : null}
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
