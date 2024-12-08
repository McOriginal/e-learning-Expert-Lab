import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './UserMessage.module.css';

export default function UserMessage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://https://e-learning-expert-lab-backend.onrender.com/user/messages');
                setMessages(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className={classes.userMessageContainer}>
            <h2>Messages des utilisateurs</h2>
            <ul className={classes.messageList}>
                {messages.map((message) => (
                    <li key={message._id} className={classes.messageItem}>
                        <h3>{message.nom}</h3>
                        <p><strong>Email:</strong> {message.email}</p>
                        <p><strong>Téléphone:</strong> {message.telephone}</p>
                        <p><strong>Message:</strong> {message.message}</p>
                        <p><strong>Date d'envoi:</strong> {new Date(message.dateEnvoi).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
