import Chatroom from "../model/Chatroom";

class ChatroomService {
  async createNewChatroom(users: number[]) {
    const newChatRoom = new Chatroom({ messages: [], users });
    return await newChatRoom.save();
  }
}

export default ChatroomService;
