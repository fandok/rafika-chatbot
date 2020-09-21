import React from "react";
import { string, bool } from "prop-types";
import { Avatar, Card, Row, Col, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";


const ChatChip = ({ isSender, text }) => {
	console.log(text);
	return (
		<Space direction="horizontal">
			{!isSender && (
				<Avatar size={64} icon={<UserOutlined />} />
			)}
			<Card style={{width: 300}}>
				{text}
			</Card>
		</Space>
	);
};

ChatChip.propTypes = {
	isSender: bool,
	text: string.isRequired,
};

ChatChip.defaultProps = {
	isSender: false,
};

export default ChatChip;