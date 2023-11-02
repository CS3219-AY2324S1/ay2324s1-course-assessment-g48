import React from "react";

type MessageParserProps = {
  children: React.ReactNode;
  actions: {
    handleHello: () => void;
    getChatState: () => any;
  };
};

const MessageParser = ({ children, actions }: MessageParserProps) => {
  const parse = async (message: string) => {
    if (!message) {
      return;
    }
    await sendMessageToWebsocket(message);
  };

  const sendMessageToWebsocket = async (message: string) => {
    const chatState = await actions.getChatState();
    chatState.handleSubmit(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          parse: parse,
          actions
        });
      })}
    </div>
  );
};

export default MessageParser;
