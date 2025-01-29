import React from 'react';
import ChatPreview from "../component/chatPreview";
import ChatMessage from "../component/chatMessage";

export default function (props) {
    return <div>
    <div class="mx-auto rounded-lg  ">
        <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2 ">
            <div class="font-semibold text-2xl">Symfony chat</div>
            <div class="w-1/2">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="search contact"
                    class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                />
            </div>
            <div
                class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
            >
                EM
            </div>
        </div>
        <div class="flex flex-row justify-between bg-white">
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">


                <ChatPreview username="Emilien" message="Salut!"></ChatPreview>

            </div>
            <div class="w-full px-5 flex flex-col justify-between ">
                <div class="flex flex-col mt-5">
                    <ChatMessage isSender={true} message="salut"></ChatMessage>
                    <ChatMessage isSender={false} message="Bonjour !"></ChatMessage>



                </div>
                <div class="py-5 ">
                    <input
                        class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                        type="text"
                        placeholder="type your message here..."
                    />
                </div>
            </div>

        </div>
    </div>
</div>
}
