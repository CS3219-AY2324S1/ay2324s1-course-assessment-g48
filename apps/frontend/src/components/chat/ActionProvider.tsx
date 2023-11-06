import React from 'react';

type ActionProviderProps = {
  createChatBotMessage: any;
  setState: any;
  children: any;
};

const ActionProvider = ({ createChatBotMessage, setState, children }: ActionProviderProps) => {
  return (
    <div>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          actions: {},
        });
      })}
    </div>
  );
};

export default ActionProvider;
