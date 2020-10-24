import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { string } from 'prop-types';

import ChatChip from '../src/components/ChatChip';
import SelectInput from '../src/components/Input';
import { sendMessage } from '../src/fetcher';
// import { answerData, chatData } from '../src/__mocks__/chat';

const { TextArea } = Input;

import {
  cssChatButton,
  cssChatButtonImage,
  cssChatContainer,
  cssChatInput,
  cssContainer,
  cssFooter,
  cssForm,
  cssTitle,
} from '../styles';

const Home = ({ message }) => {
  const [chat, setChat] = useState([]);
  const [color, setColorIndex] = useState(0);
  const [options, setOptions] = useState([]);

  const [form] = Form.useForm();

  const addChat = data => {
    setChat(prev => [...prev, data]);
  };

  const sendChat = message => {
    let chatMessage;
    if (message) {
      chatMessage = message;
    } else {
      chatMessage = form.getFieldValue('chat-input');
    }
    addChat({ isSender: true, text: chatMessage });
    sendMessage({ message: chatMessage })
      .then(response => {
        const chat = response.message;
        chat.map(value => {
          addChat({ isSender: false, text: value }, 0);
          console.log(value);
          if (value.includes('Choose:')) {
            const choices = value.split(',').map((value, key) => {
              let temp;
              if (key === 0) {
                temp = value.split(' ')[1];
              } else {
                temp = value.trim();
              }
              return temp;
            });
            setOptions(choices);
          }
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
      <div className={cssChatContainer}>
        {chat.length > 0 &&
          chat.map((value, key) => {
            return <ChatChip key={key} {...value} />;
          })}
      </div>
      <div className={cssFooter}>
        <Form className={cssForm} form={form}>
          {options.length ? (
            <SelectInput options={options} sendChat={sendChat} />
          ) : (
            <>
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
                  onClick={() => sendChat('')}
                >
                  <img
                    className={cssChatButtonImage}
                    src="/send.png"
                    alt="Send"
                  />
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
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
