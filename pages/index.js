import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

import ChatChip from '../src/components/ChatChip';
// import SelectInput from '../src/components/Input';
import { sendMessage } from '../src/fetcher';
// import { answerData, chatData } from '../src/__mocks__/chat';

import { cssContainer, cssFooter, cssTitle } from '../styles';

const Home = () => {
  const [chat, setChat] = useState([]);

  const [form] = Form.useForm();

  const addChat = data => {
    setChat(prev => [...prev, data]);
  };

  const sendChat = () => {
    const chatMessage = form.getFieldValue('chat-input');
    addChat({ isSender: true, text: chatMessage });
    sendMessage({ message: chatMessage }).then(response => {
      const chat = response.message;
      chat.map(value => {
        addChat({ isSender: false, text: value }, 0);
      });
    });

    form.resetFields();
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
    <div className={cssContainer({ color: '' })}>
      <div className={cssTitle}>Chatting Session</div>
      {chat.length > 0 &&
        chat.map((value, key) => {
          return <ChatChip key={key} {...value} />;
        })}
      <div className={cssFooter}>
        <Form form={form}>
          <Form.Item name="chat-input">
            <Input placeholder="Type your text here" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" onClick={sendChat}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* <SelectInput addChat={addChat} /> */}
      </div>
    </div>
  );
};

export default Home;
