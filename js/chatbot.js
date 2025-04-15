// Enhanced AI Chatbot for KaraAGI
class KaraAGIChatbot {
    constructor() {
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotWindow = document.getElementById('chatbot-window');
        this.minimizeChat = document.querySelector('.minimize-chat');
        this.chatInput = document.getElementById('chat-input');
        this.sendMessageBtn = document.getElementById('send-message');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        
        // Chatbot state
        this.isOpen = false;
        this.conversationHistory = [];
        this.userContext = {
            name: null,
            email: null,
            interests: [],
            visitCount: this.getVisitCount()
        };
        
        // Knowledge base for responses
        this.knowledgeBase = {
            greetings: [
                "Hello! Welcome to KaraAGI. How can I assist you today?",
                "Hi there! I'm the KaraAGI assistant. What can I help you with?",
                "Greetings! How may I help you explore KaraAGI today?"
            ],
            about: [
                "KaraAGI is developing an advanced AI agent under the leadership of Abdullah Chaudhary. Our mission is to create an artificial general intelligence that can understand, learn, and adapt to complex human needs.",
                "We're building the next generation of AI technology that will seamlessly integrate into your daily life, providing intelligent assistance across various domains while maintaining the highest standards of privacy and security."
            ],
            founder: [
                "KaraAGI was founded by Abdullah Chaudhary (Kara ACH's), a visionary in the field of artificial intelligence.",
                "Abdullah Chaudhary is dedicated to developing advanced AI systems that enhance human capabilities. With a passion for innovation and a deep understanding of machine learning technologies, he founded KaraAGI to bring his vision of accessible, powerful AI to reality."
            ],
            features: [
                "KaraAGI features advanced intelligence powered by cutting-edge machine learning algorithms.",
                "Your data remains protected with enterprise-grade security in KaraAGI.",
                "KaraAGI continuously improves based on your interactions through adaptive learning."
            ],
            launch: [
                "KaraAGI is currently under development. We're planning to launch soon! Join our waitlist to be notified when we go live.",
                "The countdown on our homepage shows the approximate time until our initial release. We're working hard to bring KaraAGI to you as soon as possible."
            ],
            waitlist: [
                "You can join our waitlist by clicking the 'Join Waitlist' button at the top of the page. We'll notify you as soon as KaraAGI launches!",
                "Joining our waitlist is easy! Just click the 'Join Waitlist' button and fill out the short form. You'll be among the first to experience KaraAGI."
            ],
            contact: [
                "You can contact us at info@karaagi.com or call us at +1 (555) 123-4567. We'd be happy to answer any questions you have!",
                "For any inquiries, please reach out to us via email at info@karaagi.com or by phone at +1 (555) 123-4567."
            ],
            partners: [
                "KaraAGI is built on the shoulders of giants. We collaborate with and draw inspiration from leading AI platforms including ChatGPT, Grok AI, DeepSeek, Manus AI, and Microsoft Copilot.",
                "We're proud to be part of the growing AI ecosystem, working alongside innovative platforms like ChatGPT, Grok AI, DeepSeek, Manus AI, and Microsoft Copilot."
            ],
            fallback: [
                "Thank you for your message. I'm still learning and may not have all the answers yet. For specific questions, please contact us at info@karaagi.com.",
                "I appreciate your interest in KaraAGI. While I'm still developing my knowledge base, our team would be happy to address your specific questions. Please email us at info@karaagi.com."
            ]
        };
        
        // Initialize chatbot
        this.init();
    }
    
    init() {
        // Add event listeners
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.minimizeChat.addEventListener('click', () => this.toggleChatbot());
        this.sendMessageBtn.addEventListener('click', () => this.handleUserMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });
        
        // Check if returning visitor
        if (this.userContext.visitCount > 1) {
            setTimeout(() => {
                this.toggleChatbot();
                this.addBotMessage("Welcome back to KaraAGI! How can I assist you today?");
            }, 3000);
        }
    }
    
    toggleChatbot() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.chatbotWindow.style.display = 'flex';
            this.chatInput.focus();
            
            // If first time opening, add welcome message
            if (this.conversationHistory.length === 0) {
                const greeting = this.getRandomResponse('greetings');
                this.addBotMessage(greeting);
            }
        } else {
            this.chatbotWindow.style.display = 'none';
        }
    }
    
    handleUserMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;
        
        // Add user message to UI and history
        this.addUserMessage(message);
        this.conversationHistory.push({ role: 'user', content: message });
        this.chatInput.value = '';
        
        // Process message and generate response
        this.processUserMessage(message);
    }
    
    processUserMessage(message) {
        // Simulate typing indicator
        this.addTypingIndicator();
        
        // Analyze message intent
        const intent = this.analyzeIntent(message);
        
        // Generate response based on intent
        setTimeout(() => {
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Get appropriate response
            let response = '';
            
            switch (intent) {
                case 'greeting':
                    response = this.getRandomResponse('greetings');
                    break;
                case 'about':
                    response = this.getRandomResponse('about');
                    break;
                case 'founder':
                    response = this.getRandomResponse('founder');
                    break;
                case 'features':
                    response = this.getRandomResponse('features');
                    break;
                case 'launch':
                    response = this.getRandomResponse('launch');
                    break;
                case 'waitlist':
                    response = this.getRandomResponse('waitlist');
                    break;
                case 'contact':
                    response = this.getRandomResponse('contact');
                    break;
                case 'partners':
                    response = this.getRandomResponse('partners');
                    break;
                case 'thanks':
                    response = "You're welcome! Is there anything else I can help you with?";
                    break;
                case 'goodbye':
                    response = "Thank you for your interest in KaraAGI! Feel free to return if you have more questions. Have a great day!";
                    break;
                default:
                    response = this.getRandomResponse('fallback');
            }
            
            // Add bot response to UI and history
            this.addBotMessage(response);
            this.conversationHistory.push({ role: 'assistant', content: response });
            
            // Suggest follow-up questions if appropriate
            if (['greeting', 'thanks', 'about'].includes(intent)) {
                setTimeout(() => {
                    this.suggestFollowUps();
                }, 1000);
            }
        }, 1000); // Simulate thinking time
    }
    
    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple keyword matching for intent recognition
        if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
            return 'greeting';
        } else if (this.containsAny(lowerMessage, ['about', 'what is', 'tell me about', 'karaagi'])) {
            return 'about';
        } else if (this.containsAny(lowerMessage, ['founder', 'ceo', 'abdullah', 'chaudhary', 'who created'])) {
            return 'founder';
        } else if (this.containsAny(lowerMessage, ['feature', 'capability', 'can do', 'function'])) {
            return 'features';
        } else if (this.containsAny(lowerMessage, ['launch', 'release', 'when', 'available'])) {
            return 'launch';
        } else if (this.containsAny(lowerMessage, ['waitlist', 'sign up', 'join', 'notify'])) {
            return 'waitlist';
        } else if (this.containsAny(lowerMessage, ['contact', 'email', 'phone', 'reach'])) {
            return 'contact';
        } else if (this.containsAny(lowerMessage, ['partner', 'chatgpt', 'grok', 'deepseek', 'manus', 'copilot'])) {
            return 'partners';
        } else if (this.containsAny(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
            return 'thanks';
        } else if (this.containsAny(lowerMessage, ['bye', 'goodbye', 'see you', 'later'])) {
            return 'goodbye';
        } else {
            return 'unknown';
        }
    }
    
    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    getRandomResponse(category) {
        const responses = this.knowledgeBase[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = message;
        
        messageContent.appendChild(messagePara);
        messageDiv.appendChild(messageContent);
        this.chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = message;
        
        messageContent.appendChild(messagePara);
        messageDiv.appendChild(messageContent);
        this.chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dots.appendChild(dot);
        }
        
        messageContent.appendChild(dots);
        typingDiv.appendChild(messageContent);
        this.chatbotMessages.appendChild(typingDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    suggestFollowUps() {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'message bot-message suggestions';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = "You might also be interested in:";
        
        const suggestionsList = document.createElement('div');
        suggestionsList.className = 'suggestion-buttons';
        
        // Create 3 random suggestions
        const suggestions = [
            { text: "Tell me about KaraAGI", intent: "about" },
            { text: "Who is the founder?", intent: "founder" },
            { text: "What are the features?", intent: "features" },
            { text: "When will it launch?", intent: "launch" },
            { text: "How do I join the waitlist?", intent: "waitlist" },
            { text: "How can I contact you?", intent: "contact" },
            { text: "Who are your partners?", intent: "partners" }
        ];
        
        // Shuffle and take first 3
        const shuffled = suggestions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        selected.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-button';
            button.textContent = suggestion.text;
            button.addEventListener('click', () => {
                this.chatInput.value = suggestion.text;
                this.handleUserMessage();
            });
            suggestionsList.appendChild(button);
        });
        
        messageContent.appendChild(messagePara);
        messageContent.appendChild(suggestionsList);
        suggestionsDiv.appendChild(messageContent);
        this.chatbotMessages.appendChild(suggestionsDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }
    
    getVisitCount() {
        let count = parseInt(localStorage.getItem('karaagi_visit_count') || '0');
        count++;
        localStorage.setItem('karaagi_visit_count', count.toString());
        return count;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for typing indicator and suggestions
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--gray-color);
            animation: typing-animation 1.4s infinite ease-in-out both;
        }
        
        .typing-dots span:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing-animation {
            0%, 80%, 100% {
                transform: scale(0.6);
                opacity: 0.6;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .suggestion-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .suggestion-button {
            background: var(--light-color);
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            border-radius: 15px;
            padding: 6px 12px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .suggestion-button:hover {
            background: var(--primary-color);
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize chatbot
    window.karaAGIChatbot = new KaraAGIChatbot();
});
