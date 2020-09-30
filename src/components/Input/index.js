import React from "react";
import InputChip from "./chip";
import { inputData } from "../../__mocks__/input";
import { cssInputContainer } from "./style";
import { func } from 'prop-types';

const Input = ({ addChat }) => {
  const add = ({text}) => {
    addChat({
      isSender: true, text
    })
  }

  return(
    <div className={cssInputContainer}>
      {inputData.map((value, key) => (
        <InputChip onClick={add} text={value.text} key={key} />
      ))}
    </div>
  )
};

Input.propTypes = {
  addChat: func.isRequired,
}
export default Input;