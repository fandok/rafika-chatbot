import React from 'react';
import { string } from 'prop-types';
import { cssInputChip, cssInputChipContent } from './style';

const InputChip = ({ text }) => (
  <div className={cssInputChip}>
    <div className={cssInputChipContent}>{text}</div>
  </div>
);

InputChip.propTypes = {
  text: string.isRequired,
};

export default InputChip;
