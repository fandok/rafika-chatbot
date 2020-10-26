import React from 'react';
import { string, bool } from 'prop-types';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { cssAvatar, cssChatChip } from './style';

const ChatChip = ({ isSender, text }) => (
  <div className={cssChatChip({ isSender })}>
    {!isSender && (
      <div className={cssAvatar}>
        <Avatar size={32} icon={<UserOutlined />} />
      </div>
    )}
    <Card>{text}</Card>
  </div>
);

ChatChip.propTypes = {
  isSender: bool,
  text: string.isRequired,
};

ChatChip.defaultProps = {
  isSender: false,
};

export default ChatChip;
