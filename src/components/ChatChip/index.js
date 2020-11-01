import React from 'react';
import { string, bool } from 'prop-types';
import { Card } from 'antd';
import { cssAvatar, cssChatChip } from './style';
import Linkify from 'react-linkify';

const ChatChip = ({ isSender, text }) => (
  <div className={cssChatChip({ isSender })}>
    {!isSender && (
      <div className={cssAvatar}>
        <img src="/avatar.png" alt="Avatar" width={32} height={32} />
      </div>
    )}
    <Card>
      <Linkify>{text}</Linkify>
    </Card>
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
