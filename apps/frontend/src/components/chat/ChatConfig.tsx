// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const ChatConfig = {
  initialMessages: [createChatBotMessage("Hello world", {})],
  botName: "John Smith",
  customComponents: {
    header: () => <div className="react-chatbot-kit-chat-header">John Smith</div>,
  },
};

export default ChatConfig;
