import { css } from 'emotion';
import { fullGrey } from './color';

export const cssContainer = ({ color }) =>
  css({
    background: color ? color : fullGrey,
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
