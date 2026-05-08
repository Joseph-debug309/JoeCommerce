import React, { useState } from 'react';
import '../css/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 Welcome to JoeCommerce. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Predefined responses for common questions
  const botResponses = {
    'shipping': 'We offer free shipping on all orders! Your order will be delivered within 3-5 business days.',
    'payment': 'We accept various payment methods including M-Pesa, credit cards, and debit cards.',
    'return': 'We have a 30-day return policy. If you\'re not satisfied, you can return items in original condition.',
    'tracking': 'Once your order ships, you\'ll receive a tracking number via email to track your package.',
    'warranty': 'All products come with a 1-year warranty from the date of purchase.',
    'support': 'You can contact our support team via email or chat. Response time is typically within 24 hours.',
    'discount': 'Follow our social media pages for exclusive discounts and promotional codes!',
    'product': 'We carry a wide range of products. Use the search function to find specific items.',
    'account': 'You need to sign up for an account to make purchases and track orders.',
    'cart': 'You can add items to your cart and proceed to checkout when ready.',
  };

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for keywords
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return 'Thanks for your question! For more detailed information, please contact our support team or browse our FAQ section.';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      text: userInput,
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = findResponse(userInput);
      const newBotMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        className="chatbot-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us"
      >
        💬
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h4>JoeCommerce Support 🤖</h4>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`message ${message.type}`}
              >
                <div className="message-content">
                  {message.type === 'bot' && <span className="bot-icon">🤖</span>}
                  <p>{message.text}</p>
                  {message.type === 'user' && <span className="user-icon">👤</span>}
                </div>
                <small className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </small>
              </div>
            ))}

            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <span className="bot-icon">🤖</span>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isLoading}
              className="chatbot-input"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="chatbot-send-btn"
            >
              📤
            </button>
          </form>

          <div className="chatbot-suggestions">
            <small>Quick tips: Ask about shipping, payment, returns, tracking, warranty, support, discounts, or products</small>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
