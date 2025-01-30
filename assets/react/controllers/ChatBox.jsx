import React, {useEffect, useState} from 'react';
import ChatPreview from "../component/ChatPreview";
import ChatMessage from "../component/ChatMessage";
import axios from "axios";

export default function (props) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/messages/1')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);



    return <div>

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
            <div
                className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
            >
                EM
            </div>
        </div>
        <div className="flex flex-row justify-between bg-white">
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                <ChatPreview username="Emilien" message="Salut!"></ChatPreview>
            </div>
            <div className="w-full px-5 flex flex-col justify-between ">
                <div className="flex flex-col mt-5">
                    {messages.map(message => (
                        <ChatMessage isSender={message.userId===1} message={message.content} username={message.username}></ChatMessage>
                    ))}
                </div>
                <div className="py-5 ">
                    <input
                        className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                        type="text"
                        placeholder="type your message here..."
                    />
                </div>
            </div>

        </div>
    </div>
</div>
}
