import React, { useEffect, useState } from 'react';

import ChatChip from '../src/components/ChatChip';
import Input from '../src/components/Input';
import { chatData } from '../src/__mocks__/chat';

import { cssContainer, cssFooter, cssTitle } from '../styles';

const Home = () => {
  const [chat, setChat] = useState([]);

  const addChat = (data, duration) => {
    setTimeout(() => {
      setChat(prev => [...prev, data]);
    }, duration || 5000);
  };

  useEffect(() => {
    addChat(chatData[0]);
    addChat(chatData[1], 10000);
  }, []);

  return (
    <div className={cssContainer}>
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
