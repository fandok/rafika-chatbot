import React from "react";
import InputChip from "./chip";
import { inputData } from "../../__mocks__/input";
import { cssInputContainer } from "./style";

const Input = () => (
	<div className={cssInputContainer}>
		{inputData.map((value, key) => (
			<InputChip text={value.text} key={key} />
		))}
	</div>
);

export default Input;