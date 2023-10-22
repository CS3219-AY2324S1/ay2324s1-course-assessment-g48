import React from 'react';

const MessageParser = ({ children }: { children: React.ReactNode }, actions: any) => {
  const parse = (message: any) => {
    if (!message) {
      return;
    }
    sendMessageToWebsocket(message);
  };

  const sendMessageToWebsocket = (message: any) => {
    //TODO
    console.log(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {  
        return React.cloneElement(child as React.ReactElement<any>, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;