import React, { useEffect, useState } from 'react';

import ChatMessage from '../component/ChatMessage';
import axios from 'axios';
import ChatPreview from '../component/ChatPreview';
import { fetchUsers } from '../services/Api/UserService';
import { UserType } from '../type/api/UserType';
import { fetchConversation } from '../services/Api/ConversationService';
import { ConversationListType } from '../type/api/ConversationType';
import { fetchMessages, postNewMessage } from '../services/Api/MessageService';
import { MessagesListType, MessageType } from '../type/api/MessageType';

export default function () {
  const [messages, setMessages] = useState<MessagesListType>([]);
  const [newMessage, setNewMessage] = useState('');

  const userId = Number((document.querySelector('#app') as HTMLInputElement | null)?.dataset.user_id);
  const [user, setUser] = useState<UserType>();
  const [recentConversation, setRecentConversation] = useState<ConversationListType>([]);
  const [selectedChat, setSelectedChat] = useState(0);

  useEffect(() => {
    getUser();
    getConversation();
  }, []);
  useEffect(() => {
    const url = new URL('http://localhost:8083/.well-known/mercure');
    url.searchParams.append('topic', `http://localhost:8083/conversation/${selectedChat}`);

    const eventSource = new EventSource(url);

    eventSource.onmessage = (e) => postNewMessageFromTopic(JSON.parse(e.data)[0]);

    getMessages();
  }, [selectedChat]);

  const getConversation = async () => {
    const response = await fetchConversation(userId);
    setRecentConversation(response);
    console.log(userId);
    setSelectedChat(response[0].conversationId);
  };

  const getUser = async () => {
    try {
      const response = await fetchUsers(userId);
      setUser(response);
    } catch (e) {}
  };
  const getMessages = async () => {
    try {
      const response = await fetchMessages(selectedChat);
      setMessages(response);
    } catch (e) {}
  };
  const sendMessage = async (selectedChat: number, newMessage: string, userId: number) => {
    try {
      const response = await postNewMessage(selectedChat, newMessage, userId);
      messages.push(response[0]);
      setNewMessage('');
    } catch (e) {}
  };

  function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    sendMessage(selectedChat, newMessage, userId);
  }

  function postNewMessageFromTopic(data: MessageType) {
    if (data.userId !== userId) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  }

  function changeSelectedChat(id: number) {
    setSelectedChat(id);
    getMessages();
  }

  return (
    <div>
      <div className="mx-auto rounded-lg  ">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2 ">
          <div className="font-semibold text-2xl">Symfony chat</div>
          <div className="w-1/2">
            <input
              type="text"
              name=""
              id=""
              placeholder="search contact"
              className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
            />
          </div>
          <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
            {user && user.username.substring(0, 2)}
          </div>
        </div>

        <div className="flex flex-row justify-between bg-white">
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {recentConversation.length === null ? (
              <div role="status" className="mx-auto">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              recentConversation.map((conversation, index) => (
                <div onClick={() => changeSelectedChat(conversation.conversationId)} key={index}>
                  <ChatPreview
                    username={conversation.username}
                    message={conversation.content}
                    selected={conversation.conversationId === selectedChat}
                    key={index}
                  ></ChatPreview>
                </div>
              ))
            )}
          </div>
          <div className="w-full px-5 flex flex-col justify-between ">
            <div className="flex flex-col mt-5">
              {messages.length === 0 ? (
                <div role="status" className="mx-auto">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                messages.map((message: MessageType) => (
                  <ChatMessage
                    key={message.messageId}
                    isSender={message.userId === userId}
                    message={message.content}
                    username={message.username}
                  ></ChatMessage>
                ))
              )}
            </div>
            <div className="">
              <div className="py-5 ">
                <input
                  className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="type your message here..."
                  id="inputText"
                  onChange={(event) => setNewMessage(event.target.value)}
                  value={newMessage}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSubmit(event);
                    }
                  }}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleSubmit}
              >
                envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
