import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Typography, message as messageModal } from 'antd';
import { string } from 'prop-types';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import ChatChip from '../src/components/ChatChip';
import SelectInput from '../src/components/Input';
import { sendMessage, getColorState, setColorState } from '../src/fetcher';
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

const Home = ({ message }) => {
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
      return;
    }
  };

  useEffect(() => {
    checkLogin();
    getColorState({ email: cookies.email })
      .then(response => {
        setColorIndex(Number(response.color_state));
      })
      .catch(error => console.error(error));
  }, [cookies]);

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

        if (
          chatInput.UID[1]?.group !== 'C' ||
          chatInput.UID[1]?.group !== 'D' ||
          chatInput.UID[1]?.group !== 'E' ||
          chatInput?.type === 'SmallTalk'
        ) {
          let colorIndex = -1;
          const prevColor = color;

          if (sentiment?.sentiment_class === 'pos') {
            if (color < 3) {
              switch (chatInput.day) {
                case 'DAY1':
                case 'DAY2':
                case 'DAY3':
                  colorIndex = color < 1 ? color + 1 : color;
                  break;
                case 'DAY4':
                case 'DAY5':
                case 'DAY6':
                  colorIndex = color < 2 ? color + 1 : color;
                  break;
                default:
                  colorIndex = color + 1;
                  break;
              }
            } else {
              colorIndex = color;
            }
            setColorIndex(colorIndex);
          } else if (sentiment?.sentiment_class === 'neg') {
            colorIndex = color > 0 ? color - 1 : color;
            setColorIndex(colorIndex);
          }

          if (colorIndex !== -1 && colorIndex !== prevColor) {
            setColorState({ email: cookies.email, color_state: colorIndex })
              .then(response => {
                if (response.is_success) {
                  messageModal.success('Background updated');
                }
              })
              .catch(error => console.error(error));
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
                  showCount
                  maxLength={256}
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
