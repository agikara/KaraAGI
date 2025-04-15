// Waitlist and Email Notification Handler for KaraAGI

// This script handles the waitlist form submission and email notification
// In a production environment, this would be implemented on a server
// For this demo, we'll simulate the email notification process

class WaitlistManager {
    constructor() {
        this.waitlistForm = document.getElementById('waitlist-form');
        this.waitlistModal = document.getElementById('waitlist-modal');
        this.successModal = document.getElementById('success-modal');
        
        // Initialize the waitlist manager
        this.init();
    }
    
    init() {
        // Add event listener for form submission
        if (this.waitlistForm) {
            this.waitlistForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }
    }
    
    handleFormSubmission(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.waitlistForm);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || 'Not provided',
            interest: formData.get('interest'),
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage for demo purposes
        this.saveToWaitlist(userData);
        
        // Simulate sending email notification
        this.sendEmailNotification(userData);
        
        // Close waitlist modal and show success modal
        this.closeModal(this.waitlistModal);
        this.openModal(this.successModal);
        
        // Reset form
        this.waitlistForm.reset();
    }
    
    saveToWaitlist(userData) {
        // In a real implementation, this data would be sent to a server
        // For demo purposes, we'll store it in localStorage
        const waitlist = JSON.parse(localStorage.getItem('karaagi_waitlist') || '[]');
        waitlist.push(userData);
        localStorage.setItem('karaagi_waitlist', JSON.stringify(waitlist));
        
        console.log('User added to waitlist:', userData);
    }
    
    sendEmailNotification(userData) {
        // In a real implementation, this would send an API request to a server
        // For demo purposes, we'll simulate the email sending process
        
        // Log the email content to console
        console.log('Sending email notification to:', userData.email);
        
        // Simulate email content
        const emailSubject = 'Welcome to KaraAGI Waitlist!';
        const emailBody = `
            Dear ${userData.name},
            
            Thank you for joining the KaraAGI waitlist! We're excited to have you on board.
            
            Your registration details:
            - Email: ${userData.email}
            - Phone: ${userData.phone}
            - Interest: ${this.getInterestText(userData.interest)}
            
            We'll notify you as soon as KaraAGI launches. In the meantime, feel free to explore our website and learn more about our vision for the future of AI.
            
            If you have any questions, please don't hesitate to contact us at info@karaagi.com.
            
            Best regards,
            Abdullah Chaudhary
            Founder & CEO, KaraAGI
        `;
        
        console.log('Email subject:', emailSubject);
        console.log('Email body:', emailBody);
        
        // In a real implementation, this would be handled by a server-side API
        // For demo purposes, we'll simulate a successful email send
        return true;
    }
    
    getInterestText(interestValue) {
        const interestMap = {
            'personal': 'Personal AI Assistant',
            'business': 'Business Applications',
            'development': 'AI Development',
            'research': 'Research Opportunities',
            'other': 'Other'
        };
        
        return interestMap[interestValue] || interestValue;
    }
    
    openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
}

// Initialize the waitlist manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.waitlistManager = new WaitlistManager();
    
    // Add server-side implementation note for production
    console.log('Note: In a production environment, the waitlist and email functionality would be implemented on a server using technologies like Node.js, PHP, or a dedicated email service like SendGrid or Mailchimp.');
});
