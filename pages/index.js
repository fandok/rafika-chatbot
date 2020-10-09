import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';

import ChatChip from '../src/components/ChatChip';
import SelectInput from '../src/components/Input';
import { sendMessage } from '../src/fetcher';
import { answerData, chatData } from '../src/__mocks__/chat';

import { cssContainer, cssFooter, cssTitle } from '../styles';

const Home = () => {
  const [chat, setChat] = useState([]);
  const [color, setColor] = useState('');

  const [form] = Form.useForm();

  const sendChat = e => {
    console.log(e.target.value);
    form.resetFields();
  };

  const addChat = (data, duration, respond) => {
    setTimeout(() => {
      setChat(prev => [...prev, data]);
    }, duration || 3000);

    if (respond?.needRespond) {
      setTimeout(() => {
        setChat(prev => [...prev, answerData[respond.answer ? 1 : 0]]);
        setColor(respond.color);
      }, 6000);
    }
  };

  useEffect(() => {
    sendMessage({ message: 'day 1' }).then(response => {
      const chat = response.message;
      chat.map(value => {
        addChat({ isSender: false, text: value }, 0);
      });
    });
  }, []);

  return (
    <div className={cssContainer({ color })}>
      <div className={cssTitle}>Chatting Session</div>
      {chat.length > 0 &&
        chat.map((value, key) => {
          return <ChatChip key={key} {...value} />;
        })}
      <div className={cssFooter}>
        <Form form={form} onFinish={sendChat}>
          <Form.Item>
            <Input placeholder="Type your text here" />
          </Form.Item>
        </Form>

        {/* <SelectInput addChat={addChat} /> */}
      </div>
    </div>
  );
};

export default Home;
