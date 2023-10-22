import { UserIcon } from '@heroicons/react/24/outline';
import React from 'react';

type AvatarProps = {
  
};

const Avatar:React.FC<AvatarProps> = () => {
  
  return <div className='react-chatbot-kit-chat-bot-container'>
    <UserIcon className='w-1/2 h-1/2 text-white'/>
  </div> 
}
export default Avatar;