import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
   console.log('✅ Chatbot component is loading!');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?', sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Agregar mensaje del usuario
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simular respuesta del bot después de 1 segundo
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('mesa') || message.includes('mesas')) {
      return 'Puedo ayudarte con la gestión de mesas. Ve a la sección "Gestión de Mesas" para ver, crear o modificar mesas.';
    } else if (message.includes('hola') || message.includes('buenas')) {
      return '¡Hola! Bienvenido al sistema de gestión del restaurante. ¿En qué puedo ayudarte?';
    } else if (message.includes('ayuda') || message.includes('help')) {
      return 'Puedo ayudarte con: gestión de mesas, información del sistema, y consultas generales.';
    } else {
      return 'Lo siento, no entendí tu pregunta. Puedo ayudarte con gestión de mesas e información del sistema.';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <div className="chatbot-button" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Asistente Virtual</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
