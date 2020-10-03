import React from 'react';
import InputChip from './chip';
import { inputData } from '../../__mocks__/input';
import { cssInputContainer } from './style';
import { func } from 'prop-types';

const Input = ({ addChat }) => {
  const add = ({ text, answer, color }) => {
    addChat(
      {
        isSender: true,
        text,
      },
      0,
      {
        needRespond: true,
        answer,
        color,
      },
    );
  };

  return (
    <div className={cssInputContainer}>
      {inputData.map((value, key) => (
        <div
          key={key}
          onClick={() =>
            add({ text: value.text, answer: value.answer, color: value.color })
          }
        >
          <InputChip text={value.text} key={key} />
        </div>
      ))}
    </div>
  );
};

Input.propTypes = {
  addChat: func.isRequired,
};
export default Input;
