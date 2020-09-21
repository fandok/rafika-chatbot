import React, { useEffect, useState } from "react";
import ChatChip from "./components/ChatChip";
import { chatData } from "./__mocks__/chat";
import { cssContainer, cssFooter, cssTitle } from "./style";
import Input from "./components/Input";

// import { useData } from "react-isomophic-data";

const Home = () => {
	const [chat, setChat] = useState([]);

	useEffect(() => {
		setChat(chatData);
	}, []);

	return (
		<div className={cssContainer}>
			<div className={cssTitle}>
				Chatting Session
			</div>
			{chat.length > 0 && chat.map((value, key) => {
				return (
					<ChatChip key={key} {...value} />
				);
			})}
			<div className={cssFooter}>
				<Input />
			</div>
		</div>
	);
};

export default Home;