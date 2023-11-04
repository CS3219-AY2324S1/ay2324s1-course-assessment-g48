import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const getChatState = () => {
    return new Promise((resolve) => {
      let currState: unknown = undefined;
      setState((state: { [key: string]: any }) => {
        currState = state;
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
            getChatState,
          },
        });
      })}
    </div>
  );
};
export default ActionProvider;
