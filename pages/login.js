import React from 'react';
import { Form, Input, Button } from 'antd';
import { cssLogin, cssLoginInput } from '../styles/login';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie] = useCookies(['login']);
  const [form] = Form.useForm();

  const submitLogin = () => {
    const email = form.getFieldValue('email');
    const name = form.getFieldValue('name');
    console.log(email);
    console.log(name);
    setCookie('email', email, { path: '/' });
    setCookie('name', name, { path: '/' });

    form.resetFields();
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
      <Form.Item>
        {cookies.name && <div>{cookies.name}</div>}
        {cookies.email && <div>{cookies.email}</div>}
      </Form.Item>
    </Form>
  );
};

export default Login;
