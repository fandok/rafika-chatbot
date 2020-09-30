import React from "react";
import { string } from "prop-types";
import { cssInputChip, cssInputChipContent } from "./style";

const InputChip = ({ text }) => (
  <div className={cssInputChip}>
    <button className={cssInputChipContent}>{text}</button>
  </div>
);

InputChip.propTypes = {
  text: string.isRequired,
};

export default InputChip;
