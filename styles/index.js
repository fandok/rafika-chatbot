import { css } from 'emotion';

export const cssContainer = ({ color }) =>
  css({
    background: color
      ? color
      : 'linear-gradient(180deg, rgba(177,223,165,1) 0%, rgba(212,208,208,1) 0%, rgba(171,223,165,1) 100%)',
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
