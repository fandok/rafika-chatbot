import React, { useEffect, useState } from 'react';

import ChatChip from '../src/components/ChatChip';
import Input from '../src/components/Input';
import { answerData, chatData } from '../src/__mocks__/chat';

import { cssContainer, cssFooter, cssTitle } from '../styles';

const Home = () => {
  const [chat, setChat] = useState([]);
  const [color, setColor] = useState('');

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
    addChat(chatData[0]);
    addChat(chatData[1], 10000);
    addChat(chatData[2], 13000);
    addChat(chatData[3], 16000);
  }, []);

  return (
    <div className={cssContainer({ color })}>
      <div className={cssTitle}>Chatting Session</div>
      {chat.length > 0 &&
        chat.map((value, key) => {
          return <ChatChip key={key} {...value} />;
        })}
      <div className={cssFooter}>
        <Input addChat={addChat} />
      </div>
    </div>
  );
};

export default Home;
