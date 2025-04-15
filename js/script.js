// Main JavaScript for KaraAGI Coming Soon Page

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const waitlistBtn = document.getElementById('waitlist-btn');
const learnMoreBtn = document.getElementById('learn-more-btn');
const waitlistModal = document.getElementById('waitlist-modal');
const successModal = document.getElementById('success-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const closeSuccessBtn = document.querySelector('.close-success');
const waitlistForm = document.getElementById('waitlist-form');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const minimizeChat = document.querySelector('.minimize-chat');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');
const chatbotMessages = document.getElementById('chatbot-messages');

// Countdown Timer
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 30); // Launch in 30 days

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Initialize countdown
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Navigation Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Modal Functions
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Waitlist Button
if (waitlistBtn) {
    waitlistBtn.addEventListener('click', () => {
        openModal(waitlistModal);
    });
}

// Learn More Button
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
}

// Close Modal Buttons
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// Close Success Button
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        closeModal(successModal);
    });
}

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Waitlist Form Submission
if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(waitlistForm);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            interest: formData.get('interest')
        };
        
        // Store in localStorage for demo purposes
        // In a real implementation, this would be sent to a server
        const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
        waitlist.push(userData);
        localStorage.setItem('waitlist', JSON.stringify(waitlist));
        
        // Simulate email sending
        console.log(`Email notification sent to ${userData.email}`);
        
        // Close waitlist modal and show success modal
        closeModal(waitlistModal);
        openModal(successModal);
        
        // Reset form
        waitlistForm.reset();
    });
}

// Chatbot Functions
function toggleChatbot() {
    if (chatbotWindow.style.display === 'flex') {
        chatbotWindow.style.display = 'none';
    } else {
        chatbotWindow.style.display = 'flex';
        chatInput.focus();
    }
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messagePara = document.createElement('p');
    messagePara.textContent = message;
    
    messageContent.appendChild(messagePara);
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleUserMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Simulate bot thinking
    setTimeout(() => {
        // Bot response based on keywords
        let botResponse = getBotResponse(message);
        addMessage(botResponse);
    }, 1000);
}

function getBotResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Check for common keywords and provide appropriate responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! How can I help you today?";
    } else if (lowerMessage.includes('waitlist') || lowerMessage.includes('sign up') || lowerMessage.includes('join')) {
        return "You can join our waitlist by clicking the 'Join Waitlist' button at the top of the page. We'll notify you as soon as KaraAGI launches!";
    } else if (lowerMessage.includes('launch') || lowerMessage.includes('release') || lowerMessage.includes('when')) {
        return "KaraAGI is currently under development. We're planning to launch in about a month. Join our waitlist to be notified!";
    } else if (lowerMessage.includes('founder') || lowerMessage.includes('ceo') || lowerMessage.includes('abdullah')) {
        return "KaraAGI was founded by Abdullah Chaudhary (Kara ACH's), a visionary in the field of artificial intelligence. You can learn more about him in the Founder section of our website.";
    } else if (lowerMessage.includes('feature') || lowerMessage.includes('do') || lowerMessage.includes('capability')) {
        return "KaraAGI is an advanced AI agent that will offer intelligent assistance across various domains. It features advanced intelligence, secure & private operation, and adaptive learning capabilities.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        return "You can contact us at info@karaagi.com or call us at +1 (555) 123-4567. We'd be happy to answer any questions you have!";
    } else if (lowerMessage.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        return "Thank you for your interest in KaraAGI! Feel free to return if you have more questions. Have a great day!";
    } else {
        return "Thank you for your message. KaraAGI is currently under development. Please join our waitlist to be notified when we launch. If you have specific questions, feel free to contact us at info@karaagi.com.";
    }
}

// Chatbot Event Listeners
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', toggleChatbot);
}

if (minimizeChat) {
    minimizeChat.addEventListener('click', toggleChatbot);
}

if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', handleUserMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}

// Scroll Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature, .partner-logo, .contact-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Header Scroll Effect
function headerScrollEffect() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', headerScrollEffect);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Run initial functions
    revealOnScroll();
    headerScrollEffect();
    
    // Add CSS class for animation
    document.querySelectorAll('.feature, .partner-logo, .contact-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add active class for animation
    document.addEventListener('scroll', function() {
        document.querySelectorAll('.feature, .partner-logo, .contact-item').forEach(element => {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Trigger scroll event to check initial positions
    window.dispatchEvent(new Event('scroll'));
});
