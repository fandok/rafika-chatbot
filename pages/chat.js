import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Typography, message as messageModal } from 'antd';
import { string } from 'prop-types';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import ChatChip from '../src/components/ChatChip';
import SelectInput from '../src/components/Input';
import { sendMessage } from '../src/fetcher';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const { Title } = Typography;

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

const Home = ({ message, mode }) => {
  const [chat, setChat] = useState([]);
  const [color, setColorIndex] = useState(0);
  const [options, setOptions] = useState([]);

  const [cookies] = useCookies(['login']);
  const router = useRouter();
  const chatRef = useRef(null);

  const checkLogin = () => {
    if (!cookies.name && !cookies.email) {
      messageModal.info('You are not logged in. Redirect to login page....');
      router.push('login');
    }
  };

  useEffect(checkLogin, [cookies]);

  const shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chat]);

  const [form] = Form.useForm();

  const addChat = data => {
    setChat(prev => [...prev, data]);
  };

  const sendChat = message => {
    checkLogin();

    let chatMessage;
    if (message) {
      chatMessage = message;
    } else {
      chatMessage = form.getFieldValue('chat-input');
    }

    if (!chatMessage) {
      return;
    }

    addChat({ isSender: true, text: chatMessage });
    sendMessage({ message: chatMessage, email: cookies?.email || '' })
      .then(response => {
        const chat = response.message;
        const gameplay = response.data.gameplay || {};
        const sentiment = response.data.sentiment || {};
        const chatInput = response.data.chat_input || {};

        const state = gameplay.record?.state || '';

        if (state === 'correct' || state === 'wrong') {
          setOptions([]);
        }

        if (mode !== '1' && chatInput?.type === 'SmallTalk') {
          if (sentiment?.sentiment_class === 'pos') {
            setColorIndex(prev => (prev < 2 ? prev + 1 : prev));
          } else if (sentiment?.sentiment_class === 'neg') {
            setColorIndex(prev => (prev > 0 ? prev - 1 : prev));
          }
        }

        chat.map(value => {
          if (value.includes('Choose:')) {
            const choices = value.split(',').map((value, key) => {
              let temp;
              if (key === 0) {
                temp = value.split(':')[1].trim();
              } else {
                temp = value.trim();
              }
              return temp;
            });
            setOptions(shuffle(choices));
          } else {
            addChat({ isSender: false, text: value }, 0);
          }
        });
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
      <Title className={cssTitle}>Chatting Session</Title>
      <div className={cssChatContainer}>
        {chat.length > 0 &&
          chat.map((value, key) => {
            return <ChatChip key={key} {...value} />;
          })}
        <div ref={chatRef} />
      </div>
      <div className={cssFooter}>
        <Form className={cssForm} form={form}>
          {options.length ? (
            <SelectInput options={options} sendChat={sendChat} />
          ) : (
            <>
              <Form.Item
                style={{ flexGrow: 1, marginBottom: 0 }}
                name="chat-input"
              >
                <TextArea
                  rows={2}
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
  mode: string,
};

Home.defaultProps = {
  message: '',
  mode: '',
};

export default Home;
