import React from 'react';

type MessageParserProps = {
  children: React.ReactNode;
  actions: {
    handleHello: () => void;
    getChatState: () => any;
  };
};

const MessageParser = ({ children, actions }: MessageParserProps) => {
  const parse = async (message: string) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }
    const chatState = await actions.getChatState();
    console.log("MessageParser", chatState);
    chatState.handleSubmit(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;