import { css } from 'emotion';

const colorList = [
  'linear-gradient(180deg, rgba(177, 223, 165, 0) 99.99%, #ABDFA5 100%), #D5D0D0',
  'linear-gradient(180deg, rgba(165, 223, 179, 0) 0%, rgba(165, 223, 179, 0) 55.45%, #ABDFA5 71.82%), #D5D0D0',
  'linear-gradient(180deg, rgba(165, 223, 179, 0) 0%, rgba(165, 223, 179, 0) 26.36%, #ABDFA5 42.5%), #D5D0D0',
  'linear-gradient(180deg, rgba(165, 223, 179, 0) 0%, rgba(165, 223, 179, 0) 0%, #ABDFA5 0%), #D5D0D0',
];

export const cssContainer = ({ color }) =>
  css({
    background: colorList[color],
    transition: '2s',
    minHeight: '100vh',
    margin: '0px auto',
    width: '100%',
  });

export const cssTitle = css({
  fontWeight: 600,
  fontSize: 25,
  lineHeight: '22px',
  textAlign: 'center',
  paddingTop: 45,
  paddingBottom: 45,
});

export const cssFooter = css({
  position: 'absolute',
  height: 84,
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: '#FFFFFF',
  boxShadow: 'inset 0px 0.5px 0px rgba(0, 0, 0, 0.3)',
});

export const cssForm = css({
  display: 'flex',
});

export const cssChatInput = css({
  borderStyle: 'none',
});
