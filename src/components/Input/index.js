import React from 'react';
import InputChip from './chip';
import { cssInputContainer } from './style';
import { func, arrayOf, string } from 'prop-types';

const Input = ({ options, sendChat }) => {
  return (
    <div className={cssInputContainer}>
      {options.map((value, key) => (
        <div key={key} onClick={() => sendChat(value)}>
          <InputChip text={value} key={key} />
        </div>
      ))}
    </div>
  );
};

Input.propTypes = {
  options: arrayOf(string),
  sendChat: func.isRequired,
};

Input.defaultProps = {
  options: [],
};

export default Input;
