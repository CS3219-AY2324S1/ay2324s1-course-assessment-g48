import React from 'react';

type LoadingModalProps = {
    isLoading: boolean;
};

const LoadingModal:React.FC<LoadingModalProps> = ({isLoading}) => {
    if (!isLoading) return null;
    return (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
        </div>
      );
}
export default LoadingModal;