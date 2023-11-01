import { chatroomSocket } from '@/utils/socket/socket';
import React from 'react';

const MessageParser = ({ children }: { children: React.ReactNode }, actions: any) => {
  const parse = (message: any) => {
    if (!message) {
      return;
    }
    sendMessageToWebsocket(message);
  };

  const sendMessageToWebsocket = (message: any) => {
    console.log(message);
    chatroomSocket.emit("sendMessage", {
      uid: 1,
      content: message,
      timestamp: new Date(),
    });
    console.log("HELLO");
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