import React, { useEffect, useState } from "react";
import ChatChip from "./components/ChatChip";
import { Layout } from "antd";
import { chatData } from "./__mocks__/chat";
import { cssContainer } from "./style";


const { Header, Footer, Content } = Layout;

// import { useData } from "react-isomophic-data";

const Home = () => {
	const [chat, setChat] = useState([]);

	useEffect(() => {
		setChat(chatData);
	}, []);

	return (
		<div className={cssContainer}>
			<Header>
				WKWKWKWK
			</Header>
			<Content>
				{chat.length > 0 && chat.map((value, key) => {
					return (
						<ChatChip key={key} {...value} />
					);
				})}
			</Content>
			<Footer>
				WKWKW
			</Footer>
		</div>
	);
};

export default Home;