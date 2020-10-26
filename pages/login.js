import React from 'react';
import { message, Form, Input, Button } from 'antd';
import { cssLogin, cssLoginInput } from '../styles/login';
import { useCookies } from 'react-cookie';
import { postLogin } from '../src/fetcher.js';
import 'antd/dist/antd.css';

const Login = () => {
  const [, setCookie] = useCookies(['login']);
  const [form] = Form.useForm();

  const submitLogin = () => {
    const email = form.getFieldValue('email');
    const name = form.getFieldValue('name');

    postLogin({ email, name })
      .then(response => {
        const { is_success, message: msg } = response;
        if (is_success) {
          message.success(msg, 3);
          setCookie('email', email, { path: '/' });
          setCookie('name', name, { path: '/' });
          window.location.href('/');
        } else {
          message.error(msg, 3);
          form.resetFields();
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <Form className={cssLogin} form={form}>
      <Form.Item className={cssLoginInput} name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item className={cssLoginInput} name="name">
        <Input placeholder="Full Name" />
      </Form.Item>
      <Form.Item>
        <Button onClick={submitLogin} htmlType="button" aria-label="Login">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
