import React from 'react';

type ChatHeaderProps = {
  header: string;
};

const ChatHeader:React.FC<ChatHeaderProps> = ({header}) => {
  
  return <div className="react-chatbot-kit-chat-header">{header}</div>;
}
export default ChatHeader;