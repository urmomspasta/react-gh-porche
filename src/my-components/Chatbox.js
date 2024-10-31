// src/components/Chatbox.js

import React, { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js'; // Import Fuse.js

function Chatbox() {
    const [messages, setMessages] = useState([{ text: 'Hi! How can we help you today?', sender: 'bot' }]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    // Predefined keywords and responses
    const responses = [
        { keywords: ['hi', 'hello'], response: 'Hello! How can we assist you today?' },
        { keywords: ['how are you', 'how r u'], response: 'I am just a bot, but thank you for asking!' },
        { keywords: ['help', 'support'], response: 'Sure! I am here to help. What seems to be the issue?' },
        { keywords: ['phone not working', 'phone issue'], response: 'Let’s figure this out. Could you provide more details?' },
        { keywords: ['battery'], response: 'If your battery is draining fast, try reducing screen brightness or closing background apps.' },
        { keywords: ['charging'], response: 'Make sure you’re using the correct charger and check if the port is clean.' },
        { keywords: ['screen'], response: 'For screen issues, try restarting your phone or checking for cracks.' },
        { keywords: ['sd'], response: 'If your SD card is not detected, try reinserting it or formatting it.' },
        { keywords: ['storage'], response: 'If your storage is full, consider deleting unnecessary files to make space.' },
        { keywords: ['software'], response: 'For software issues, try updating your apps or resetting the phone settings.' },
        { keywords: ['thank you', 'thanks'], response: 'You’re welcome! Let me know if you need further assistance.' },
        { 
            keywords: ['still not working', 'issue persists'], 
            response: 'I’m sorry we could not help fix your issue. For further assistance, you can contact us by phone or email.' 
        },
    ];

    // Initialize Fuse.js with fuzzy matching options
    const fuse = new Fuse(responses, { keys: ['keywords'], threshold: 0.3 });

    useEffect(() => {
        // Scroll to the bottom of the chatbox whenever a new message is added
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const userMessage = { text: inputValue, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);

        // Reset input field
        setInputValue('');

        // Find a matching response using Fuse.js
        const result = fuse.search(inputValue);
        const botResponse = result.length > 0
            ? result[0].item.response
            : "I'm sorry, I didn't understand that. Could you please rephrase?";

        // Simulate bot response
        setTimeout(() => {
            setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 1000); // Delay bot response for realism
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div style={chatboxContainerStyle}>
            <div style={chatboxHeaderStyle}>Chat with us!</div>

            <div style={chatboxMessagesStyle}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...messageStyle,
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.sender === 'user' ? '#1CAAD9' : '#e5e5ea',
                            color: msg.sender === 'user' ? 'white' : 'black',
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={chatboxInputContainerStyle}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={chatboxInputStyle}
                />
                <button onClick={handleSendMessage} style={chatboxSendButtonStyle}>
                    Send
                </button>
            </div>
        </div>
    );
}

// Chatbox CSS-in-JS styles
const chatboxContainerStyle = {
    width: '100%',
    height: '70vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    overflow: 'hidden',
};

const chatboxHeaderStyle = {
    backgroundColor: '#1CAAD9',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
};

const chatboxMessagesStyle = {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const messageStyle = {
    maxWidth: '70%',
    padding: '15px',
    borderRadius: '10px',
    fontSize: '1.3rem',
};

const chatboxInputContainerStyle = {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #e0e0e0',
};

const chatboxInputStyle = {
    flex: 1,
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '8px',
};

const chatboxSendButtonStyle = {
    backgroundColor: '#1CAAD9',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
};

export default Chatbox;
