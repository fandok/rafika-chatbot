import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { string } from 'prop-types';

import ChatChip from '../src/components/ChatChip';
// import SelectInput from '../src/components/Input';
import { sendMessage } from '../src/fetcher';
// import { answerData, chatData } from '../src/__mocks__/chat';

const { TextArea } = Input;

import {
  cssChatButton,
  cssChatButtonImage,
  cssChatInput,
  cssContainer,
  cssFooter,
  cssForm,
  cssTitle,
} from '../styles';

const Home = ({ message }) => {
  const [chat, setChat] = useState([]);
  const [color, setColorIndex] = useState(0);

  const [form] = Form.useForm();

  const addChat = data => {
    setChat(prev => [...prev, data]);
  };

  const sendChat = () => {
    const chatMessage = form.getFieldValue('chat-input');
    addChat({ isSender: true, text: chatMessage });
    sendMessage({ message: chatMessage })
      .then(response => {
        const chat = response.message;
        chat.map(value => {
          addChat({ isSender: false, text: value }, 0);
        });
        if (color < 4) {
          setColorIndex(prev => prev + 1);
        }
      })
      .catch(error => console.error(error));

    form.resetFields();
  };

  useEffect(() => {
    if (message) {
      sendMessage({ message }).then(response => {
        const chat = response.message;
        chat.map(value => {
          addChat({ isSender: false, text: value }, 0);
        });
      });
    }
  }, [message]);

  return (
    <div className={cssContainer({ color })}>
      <div className={cssTitle}>Chatting Session</div>
      {chat.length > 0 &&
        chat.map((value, key) => {
          return <ChatChip key={key} {...value} />;
        })}
      <div className={cssFooter}>
        <Form className={cssForm} form={form}>
          <Form.Item style={{ flexGrow: 1 }} name="chat-input">
            <TextArea
              rows={3}
              className={cssChatInput}
              placeholder="Type your text here"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className={cssChatButton}
              htmlType="button"
              aria-label="Send"
              onClick={sendChat}
            >
              <img className={cssChatButtonImage} src="/send.png" alt="Send" />
            </Button>
          </Form.Item>
        </Form>

        {/* <SelectInput addChat={addChat} /> */}
      </div>
    </div>
  );
};

Home.propTypes = {
  message: string,
};

Home.defaultProps = {
  message: '',
};

export default Home;
