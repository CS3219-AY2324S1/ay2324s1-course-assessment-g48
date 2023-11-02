import React from "react";

type ActionProviderProps = {
  createChatBotMessage: any;
  setState: any;
  children: any;
  handleSendMessage: (message: string) => void;
};

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
  handleSendMessage,
}: ActionProviderProps) => {
  return (
    <div>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          actions: { handleSendMessage },
        });
      })}
    </div>
  );
};

export default ActionProvider;
