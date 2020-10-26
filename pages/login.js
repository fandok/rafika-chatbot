import React, { useEffect } from 'react';
import { message, Form, Input, Button } from 'antd';

import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import { postLogin } from '../src/fetcher.js';
import { cssLogin, cssLoginInput } from '../styles/login';

import 'antd/dist/antd.css';

const Login = () => {
  const router = useRouter();
  const [, setCookie] = useCookies(['login']);
  const [form] = Form.useForm();

  const submitLogin = e => {
    e.preventDefault();

    const email = form.getFieldValue('email');
    const name = form.getFieldValue('name');

    postLogin({ email, name })
      .then(response => {
        const { is_success, message: msg } = response;
        if (is_success) {
          message.success(msg, 3);
          setCookie('email', email, { path: '/' });
          setCookie('name', name, { path: '/' });
          router.push('/chat');
        } else {
          message.error(msg, 3);
          form.resetFields();
        }
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    // Prefetch the chat page
    router.prefetch('/chat');
  }, []);

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
