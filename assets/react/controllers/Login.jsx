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

        Login

    </div>
}
