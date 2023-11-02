import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  
  const getChatState = () => {
    return new Promise((resolve) => {
      let currState: unknown = undefined;
      setState((state: { [key: string]: any }) => {
        console.log("Inside", state);
        currState = state;
        console.log("Inside CurrState", currState);
        return { ...state };
      });
      const checkCurrState = () => {
        if (currState !== undefined) {
          resolve(currState);
        } else {
          setTimeout(checkCurrState, 100); // Adjust the timeout as needed
        }
      };
      checkCurrState();
    });
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            getChatState,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
