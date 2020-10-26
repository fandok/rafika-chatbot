import { css } from 'emotion';

export const cssChatChip = ({ isSender }) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 24,
    ['.ant-card']: {
      background: isSender ? '#FFFFFF' : '#E8E8E8',
      borderRadius: isSender ? '6px 0px 6px 6px' : '0px 6px 6px 6px',
      minWidth: 299,
      marginRight: 16,
      ...(isSender && { marginLeft: 16 }),
    },
  });

export const cssAvatar = css({
  margin: 16,
  borderRadius: 20,
});
