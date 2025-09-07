/*===== CONVERSION-FOCUSED FEATURES =====*/

// Initialize all conversion features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact integration with floating buttons and enhanced existing buttons
    const contactIntegration = new ContactIntegration();
    
    // Initialize newsletter signup
    const newsletter = new NewsletterSignup();
    
    // Initialize virtual consultation booking
    const consultationBooking = new VirtualConsultationBooking();
    
    // Initialize brochure download
    const brochureDownload = new BrochureDownload();
    
    // Initialize exit intent popups
    // const exitIntentPopups = new ExitIntentPopups();
    
    // Initialize main contact form as smart form
    const mainContactForm = new SmartContactForm('main-contact-form', {
        steps: [
            {
                title: 'Personal Information',
                fields: [
                    { name: 'firstName', type: 'text', label: 'First Name', required: true, grid: true },
                    { name: 'lastName', type: 'text', label: 'Last Name', required: true, grid: true },
                    { name: 'email', type: 'email', label: 'Email Address', required: true, grid: true },
                    { name: 'phone', type: 'tel', label: 'Phone Number', required: true, grid: true }
                ]
            },
            {
                title: 'Investment Interest',
                fields: [
                    {
                        name: 'investment_type',
                        type: 'select',
                        label: 'Investment Interest',
                        required: true,
                        options: [
                            { value: 'casa-de-casablanca-plots', label: 'Casa de Casablanca - Individual Plots (₦10M+)' },
                            { value: 'casa-de-casablanca-acres', label: 'Casa de Casablanca - Acre Parcels (₦50M+)' },
                            { value: 'vip-site-inspection', label: 'VIP Site Inspection' },
                            { value: 'investment-portfolio', label: 'Investment Portfolio Review' },
                            { value: 'partnership-opportunities', label: 'Partnership Opportunities' }
                        ]
                    },
                    {
                        name: 'budget_range',
                        type: 'select',
                        label: 'Investment Budget',
                        required: true,
                        options: [
                            { value: '10m-25m', label: '₦10M - ₦25M' },
                            { value: '25m-50m', label: '₦25M - ₦50M' },
                            { value: '50m-100m', label: '₦50M - ₦100M' },
                            { value: '100m-plus', label: '₦100M+' }
                        ]
                    },
                    {
                        name: 'timeline',
                        type: 'select',
                        label: 'Investment Timeline',
                        required: true,
                        options: [
                            { value: 'immediate', label: 'Ready to purchase now' },
                            { value: '1-3months', label: '1-3 months' },
                            { value: '3-6months', label: '3-6 months' },
                            { value: '6months-plus', label: '6+ months' }
                        ]
                    }
                ]
            },
            {
                title: 'Requirements & Preferences',
                fields: [
                    {
                        name: 'preferences',
                        type: 'checkbox',
                        label: 'Preferences (select all that apply)',
                        options: [
                            { value: 'waterfront', label: 'Waterfront location' },
                            { value: 'corner-piece', label: 'Corner piece plots' },
                            { value: 'bulk-purchase', label: 'Bulk purchase discount' },
                            { value: 'payment-plan', label: 'Flexible payment plans' },
                            { value: 'documentation', label: 'Fast-track documentation' },
                            { value: 'site-development', label: 'Site development services' }
                        ]
                    },
                    {
                        name: 'message',
                        type: 'textarea',
                        label: 'Additional Requirements',
                        placeholder: 'Tell us about your specific investment goals, timeline, or any questions you have...',
                        required: false
                    }
                ]
            },
            {
                title: 'Final Details',
                fields: [
                    {
                        name: 'referral_source',
                        type: 'select',
                        label: 'How did you hear about us?',
                        required: false,
                        options: [
                            { value: 'google', label: 'Google Search' },
                            { value: 'social-media', label: 'Social Media' },
                            { value: 'referral', label: 'Friend/Family Referral' },
                            { value: 'advertisement', label: 'Advertisement' },
                            { value: 'real-estate-event', label: 'Real Estate Event' },
                            { value: 'other', label: 'Other' }
                        ]
                    },
                    {
                        name: 'newsletter_signup',
                        type: 'checkbox',
                        label: 'Communication Preferences',
                        options: [
                            { value: 'newsletter', label: 'Send me market updates and investment opportunities' },
                            { value: 'whatsapp', label: 'Contact me via WhatsApp for quick updates' },
                            { value: 'exclusive-offers', label: 'Notify me of exclusive pre-launch opportunities' }
                        ]
                    }
                ]
            }
        ],
        enableFileUpload: true,
        allowedFileTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
        maxFileSize: 5 * 1024 * 1024, // 5MB
        submitButtonText: 'Schedule Confidential Consultation',
        submitIcon: 'fas fa-shield-alt',
        onSubmit: async (formData) => {
            console.log('Main contact form submitted:', formData);
            
            // Track conversion
            ConversionTracker.track('main_contact_form_submitted', {
                investment_type: formData.investment_type,
                budget_range: formData.budget_range,
                timeline: formData.timeline
            });
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Return success with next steps
            return {
                success: true,
                title: 'Consultation Scheduled Successfully!',
                message: 'Thank you for your interest in Casa de Casablanca. Our investment specialists will contact you within 24 hours to schedule your confidential consultation.',
                nextSteps: [
                    {
                        icon: 'fas fa-phone',
                        text: 'Call us now for immediate assistance',
                        action: () => window.open('tel:+2347072172680', '_self')
                    },
                    {
                        icon: 'fab fa-whatsapp',
                        text: 'Chat with us on WhatsApp',
                        action: () => window.open('https://wa.me/2348173611767?text=Hi! I just submitted a consultation request for Casa de Casablanca', '_blank')
                    },
                    {
                        icon: 'fas fa-download',
                        text: 'Download our investment brochure',
                        action: () => brochureDownload.openModal()
                    }
                ]
            };
        }
    });
    
    // Initialize property inquiry form (extend main form for property-specific inquiries)
    const propertyInquiry = new PropertyInquiryForm();
    
    // Set up conversion triggers for various buttons
    const setupConversionTriggers = () => {
        // Hero section download button
        const heroDownloadBtn = document.getElementById('hero-download-brochure');
        if (heroDownloadBtn) {
            heroDownloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                brochureDownload.openModal();
            });
        }
        
        // Main CTA buttons
        const downloadBrochureBtn = document.getElementById('download-brochure');
        if (downloadBrochureBtn) {
            downloadBrochureBtn.addEventListener('click', (e) => {
                e.preventDefault();
                brochureDownload.openModal();
            });
        }
        
        const bookConsultationBtn = document.getElementById('book-consultation');
        if (bookConsultationBtn) {
            bookConsultationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                consultationBooking.openModal();
            });
        }
        
        // Calculator download buttons
        const calcDownloadBtn = document.getElementById('calc-download-summary');
        if (calcDownloadBtn) {
            calcDownloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                brochureDownload.openModal();
            });
        }
        
        const calcEmailBtn = document.getElementById('calc-email-projections');
        if (calcEmailBtn) {
            calcEmailBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Show newsletter signup for email capture
                newsletter.showNewsletter();
            });
        }
        
        // Add property inquiry triggers to property showcase buttons
        const propertyButtons = document.querySelectorAll('.property-cta-btn, .plot-select-btn, .pricing-cta-btn');
        propertyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const plotData = btn.closest('.property-card, .plot-option')?.dataset;
                propertyInquiry.openModal(plotData);
            });
        });
        
        // Add consultation triggers to key sections
        const consultationTriggers = document.querySelectorAll('.consultation-trigger, .book-inspection, .schedule-consultation');
        consultationTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                consultationBooking.openModal();
            });
        });
        
        // Add download triggers
        const downloadTriggers = document.querySelectorAll('.download-trigger, .download-brochure, .download-guide');
        downloadTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                brochureDownload.openModal();
            });
        });
    };
    
    // Initialize conversion triggers
    setupConversionTriggers();
    
    // Newsletter timing trigger (show after 30 seconds if not shown)
    setTimeout(() => {
        if (!localStorage.getItem('newsletter_shown_session')) {
            newsletter.showNewsletter();
            localStorage.setItem('newsletter_shown_session', 'true');
        }
    }, 30000);
    
    // Scroll-based newsletter trigger (show at 50% scroll if not shown)
    let scrollTriggered = false;
    window.addEventListener('scroll', () => {
        if (!scrollTriggered && !localStorage.getItem('newsletter_shown_scroll')) {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 50) {
                scrollTriggered = true;
                newsletter.showNewsletter();
                localStorage.setItem('newsletter_shown_scroll', 'true');
            }
        }
    });
    
    // Contact button scroll visibility
    window.addEventListener('scroll', () => {
        const contactButtons = document.getElementById('floating-contact');
        if (contactButtons) {
            if (window.scrollY > 300) {
                contactButtons.classList.add('visible');
            } else {
                contactButtons.classList.remove('visible');
            }
        }
    });
    
    console.log('🚀 Conversion optimization system initialized successfully!');
});

// Global conversion tracking
window.ConversionTracker = {
    events: [],
    
    track: function(event, data = {}) {
        this.events.push({
            event,
            data,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
        
        console.log('Conversion Event:', event, data);
        
        // Send to analytics (placeholder for actual implementation)
        if (typeof gtag !== 'undefined') {
            gtag('event', event, data);
        }
    }
};

/*===== SMART CONTACT FORMS =====*/
class SmartContactForm {
    constructor(formElement) {
        this.form = formElement;
        this.currentStep = 0;
        this.totalSteps = 0;
        this.formData = {};
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        this.setupFormSteps();
        this.setupConditionalFields();
        this.setupProgressIndicator();
        this.setupFileUpload();
        this.bindEvents();
        this.loadSavedData();
    }
    
    setupFormSteps() {
        const steps = this.form.querySelectorAll('.form-step');
        this.totalSteps = steps.length;
        
        if (this.totalSteps > 1) {
            this.createStepNavigation();
            this.showStep(0);
        }
    }
    
    createStepNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'form-navigation';
        navContainer.innerHTML = `
            <button type="button" class="btn btn--secondary btn--prev" disabled>
                <i class="fas fa-arrow-left"></i> Previous
            </button>
            <button type="button" class="btn btn--primary btn--next">
                Next <i class="fas fa-arrow-right"></i>
            </button>
            <button type="submit" class="btn btn--success btn--submit" style="display: none;">
                Submit <i class="fas fa-paper-plane"></i>
            </button>
        `;
        
        this.form.appendChild(navContainer);
        
        // Bind navigation events
        navContainer.querySelector('.btn--prev').addEventListener('click', () => this.previousStep());
        navContainer.querySelector('.btn--next').addEventListener('click', () => this.nextStep());
    }
    
    setupProgressIndicator() {
        if (this.totalSteps <= 1) return;
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'form-progress';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(1/this.totalSteps) * 100}%"></div>
            </div>
            <div class="progress-steps">
                ${Array.from({length: this.totalSteps}, (_, i) => `
                    <div class="progress-step ${i === 0 ? 'active' : ''}" data-step="${i}">
                        <div class="step-number">${i + 1}</div>
                        <div class="step-label">Step ${i + 1}</div>
                    </div>
                `).join('')}
            </div>
            <div class="progress-text">
                Step <span class="current-step">1</span> of <span class="total-steps">${this.totalSteps}</span>
            </div>
        `;
        
        this.form.insertBefore(progressContainer, this.form.firstChild);
    }
    
    setupConditionalFields() {
        const conditionalTriggers = this.form.querySelectorAll('[data-conditional]');
        
        conditionalTriggers.forEach(trigger => {
            trigger.addEventListener('change', (e) => {
                this.handleConditionalField(e.target);
            });
        });
    }
    
    handleConditionalField(trigger) {
        const conditions = JSON.parse(trigger.dataset.conditional);
        const value = trigger.type === 'checkbox' ? trigger.checked : trigger.value;
        
        Object.keys(conditions).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const condition = conditions[fieldId];
            
            if (this.evaluateCondition(value, condition)) {
                this.showField(field);
            } else {
                this.hideField(field);
            }
        });
    }
    
    evaluateCondition(value, condition) {
        if (typeof condition === 'string') return value === condition;
        if (typeof condition === 'boolean') return value === condition;
        if (Array.isArray(condition)) return condition.includes(value);
        return false;
    }
    
    showField(field) {
        if (field) {
            field.style.display = 'block';
            field.classList.add('field-visible');
            field.classList.remove('field-hidden');
            
            // Make required if it has data-required
            if (field.hasAttribute('data-required')) {
                const input = field.querySelector('input, select, textarea');
                if (input) input.required = true;
            }
        }
    }
    
    hideField(field) {
        if (field) {
            field.style.display = 'none';
            field.classList.add('field-hidden');
            field.classList.remove('field-visible');
            
            // Remove required
            const input = field.querySelector('input, select, textarea');
            if (input) {
                input.required = false;
                input.value = '';
            }
        }
    }
    
    setupFileUpload() {
        const fileInputs = this.form.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            const container = this.createFileUploadContainer(input);
            input.parentNode.replaceChild(container, input);
        });
    }
    
    createFileUploadContainer(input) {
        const container = document.createElement('div');
        container.className = 'file-upload-container';
        
        container.innerHTML = `
            <div class="file-upload-area" data-input-name="${input.name}">
                <div class="file-upload-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="file-upload-text">
                    <p class="upload-main">Drop files here or click to browse</p>
                    <p class="upload-sub">Supported formats: PDF, DOC, JPG, PNG (Max: 5MB each)</p>
                </div>
                <input type="file" ${input.multiple ? 'multiple' : ''} 
                       accept="${input.accept || '.pdf,.doc,.docx,.jpg,.jpeg,.png'}"
                       name="${input.name}" class="file-input" style="display: none;">
            </div>
            <div class="file-upload-list"></div>
        `;
        
        this.bindFileUploadEvents(container);
        return container;
    }
    
    bindFileUploadEvents(container) {
        const uploadArea = container.querySelector('.file-upload-area');
        const fileInput = container.querySelector('.file-input');
        const fileList = container.querySelector('.file-upload-list');
        
        // Click to browse
        uploadArea.addEventListener('click', () => fileInput.click());
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            this.handleFiles(e.dataTransfer.files, fileList, fileInput);
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files, fileList, fileInput);
        });
    }
    
    handleFiles(files, fileList, fileInput) {
        Array.from(files).forEach((file, index) => {
            if (this.validateFile(file)) {
                this.addFileToList(file, fileList, fileInput);
            }
        });
    }
    
    validateFile(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'application/msword', 
                             'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                             'image/jpeg', 'image/jpg', 'image/png'];
        
        if (file.size > maxSize) {
            this.showError(`File "${file.name}" is too large. Maximum size is 5MB.`);
            return false;
        }
        
        if (!allowedTypes.includes(file.type)) {
            this.showError(`File type not supported for "${file.name}".`);
            return false;
        }
        
        return true;
    }
    
    addFileToList(file, fileList, fileInput) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    <i class="fas ${this.getFileIcon(file.type)}"></i>
                </div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
            <div class="file-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text">0%</div>
            </div>
            <button type="button" class="file-remove" title="Remove file">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        fileList.appendChild(fileItem);
        
        // Simulate upload progress
        this.simulateUploadProgress(fileItem);
        
        // Remove file functionality
        fileItem.querySelector('.file-remove').addEventListener('click', () => {
            fileItem.remove();
        });
    }
    
    getFileIcon(fileType) {
        if (fileType.includes('pdf')) return 'fa-file-pdf';
        if (fileType.includes('word')) return 'fa-file-word';
        if (fileType.includes('image')) return 'fa-file-image';
        return 'fa-file';
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    simulateUploadProgress(fileItem) {
        const progressFill = fileItem.querySelector('.progress-fill');
        const progressText = fileItem.querySelector('.progress-text');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                fileItem.classList.add('upload-complete');
            }
            
            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
        }, 100);
    }
    
    showStep(stepIndex) {
        const steps = this.form.querySelectorAll('.form-step');
        
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
                step.style.display = 'block';
            } else {
                step.classList.remove('active');
                step.style.display = 'none';
            }
        });
        
        this.currentStep = stepIndex;
        this.updateProgress();
        this.updateNavigation();
    }
    
    updateProgress() {
        const progressFill = this.form.querySelector('.progress-fill');
        const currentStepEl = this.form.querySelector('.current-step');
        const progressSteps = this.form.querySelectorAll('.progress-step');
        
        if (progressFill) {
            const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
            progressFill.style.width = progress + '%';
        }
        
        if (currentStepEl) {
            currentStepEl.textContent = this.currentStep + 1;
        }
        
        progressSteps.forEach((step, index) => {
            if (index <= this.currentStep) {
                step.classList.add('completed');
                if (index === this.currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            } else {
                step.classList.remove('completed', 'active');
            }
        });
    }
    
    updateNavigation() {
        const prevBtn = this.form.querySelector('.btn--prev');
        const nextBtn = this.form.querySelector('.btn--next');
        const submitBtn = this.form.querySelector('.btn--submit');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 0;
        }
        
        if (this.currentStep === this.totalSteps - 1) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'inline-flex';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }
    
    nextStep() {
        if (this.validateCurrentStep() && this.currentStep < this.totalSteps - 1) {
            this.saveCurrentStepData();
            this.showStep(this.currentStep + 1);
            
            // Track step completion
            ConversionTracker.track('form_step_completed', {
                form_id: this.form.id,
                step: this.currentStep,
                total_steps: this.totalSteps
            });
        }
    }
    
    previousStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }
    
    validateCurrentStep() {
        const currentStepEl = this.form.querySelectorAll('.form-step')[this.currentStep];
        const requiredFields = currentStepEl.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove previous error
        this.removeFieldError(field);
        
        // Required validation
        if (field.required && !value) {
            this.showFieldError(field, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\-\(\)\s]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                this.showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Custom validation
        if (field.dataset.validation) {
            const validation = JSON.parse(field.dataset.validation);
            if (validation.minLength && value.length < validation.minLength) {
                this.showFieldError(field, `Minimum ${validation.minLength} characters required`);
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('field-error');
        
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error-message';
        errorEl.textContent = message;
        
        field.parentNode.appendChild(errorEl);
    }
    
    removeFieldError(field) {
        field.classList.remove('field-error');
        const errorEl = field.parentNode.querySelector('.field-error-message');
        if (errorEl) {
            errorEl.remove();
        }
    }
    
    saveCurrentStepData() {
        const currentStepEl = this.form.querySelectorAll('.form-step')[this.currentStep];
        const inputs = currentStepEl.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            this.formData[input.name] = input.value;
        });
        
        // Save to localStorage for recovery
        localStorage.setItem(`form_data_${this.form.id}`, JSON.stringify(this.formData));
    }
    
    loadSavedData() {
        const savedData = localStorage.getItem(`form_data_${this.form.id}`);
        if (savedData) {
            this.formData = JSON.parse(savedData);
            
            // Restore form values
            Object.keys(this.formData).forEach(name => {
                const field = this.form.querySelector(`[name="${name}"]`);
                if (field) {
                    field.value = this.formData[name];
                }
            });
        }
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.form.addEventListener('blur', (e) => {
            if (e.target.matches('input, select, textarea')) {
                this.validateField(e.target);
            }
        }, true);
        
        // Auto-save on input
        this.form.addEventListener('input', (e) => {
            if (e.target.matches('input, select, textarea')) {
                clearTimeout(this.saveTimeout);
                this.saveTimeout = setTimeout(() => {
                    this.saveCurrentStepData();
                }, 1000);
            }
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        if (!this.validateCurrentStep()) {
            return;
        }
        
        this.isSubmitting = true;
        this.showSubmitAnimation();
        
        try {
            const formData = new FormData(this.form);
            
            // Add any additional data
            Object.keys(this.formData).forEach(key => {
                if (!formData.has(key)) {
                    formData.append(key, this.formData[key]);
                }
            });
            
            // Simulate API call
            await this.submitForm(formData);
            
            // Show success animation
            this.showSuccessAnimation();
            
            // Track conversion
            ConversionTracker.track('form_submitted', {
                form_id: this.form.id,
                form_type: this.form.dataset.formType || 'contact'
            });
            
            // Clear saved data
            localStorage.removeItem(`form_data_${this.form.id}`);
            
        } catch (error) {
            this.showError('Something went wrong. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            this.isSubmitting = false;
        }
    }
    
    async submitForm(formData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }
    
    showSubmitAnimation() {
        const submitBtn = this.form.querySelector('.btn--submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <div class="btn-loader">
                    <div class="loader-spinner"></div>
                </div>
                Submitting...
            `;
        }
    }
    
    showSuccessAnimation() {
        const formContainer = this.form.parentNode;
        
        const successOverlay = document.createElement('div');
        successOverlay.className = 'form-success-overlay';
        successOverlay.innerHTML = `
            <div class="success-animation">
                <div class="success-checkmark">
                    <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                    </div>
                </div>
                <h3 class="success-title">Thank You!</h3>
                <p class="success-message">Your inquiry has been submitted successfully. We'll get back to you within 24 hours.</p>
                <div class="success-actions">
                    <button class="btn btn--primary" onclick="this.closest('.form-success-overlay').remove()">
                        Continue Browsing
                    </button>
                    <a href="https://wa.me/2348173611767?text=Hi! I just submitted an inquiry form. Can we discuss the property details?" 
                       class="btn btn--outline" target="_blank">
                        <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                    </a>
                </div>
            </div>
        `;
        
        formContainer.appendChild(successOverlay);
        
        // Trigger animation
        setTimeout(() => {
            successOverlay.classList.add('show');
        }, 100);
    }
    
    showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'form-error-notification';
        errorEl.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="error-close">&times;</button>
            </div>
        `;
        
        this.form.appendChild(errorEl);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorEl.parentNode) {
                errorEl.remove();
            }
        }, 5000);
        
        // Manual close
        errorEl.querySelector('.error-close').addEventListener('click', () => {
            errorEl.remove();
        });
    }
}

/*===== WHATSAPP & PHONE INTEGRATION =====*/
class ContactIntegration {
    constructor() {
        this.whatsappNumber = '2348173611767';
        this.phoneNumber = '2347072172680';
        this.init();
    }
    
    init() {
        this.createFloatingButtons();
        this.enhanceExistingButtons();
        this.trackInteractions();
    }
    
    createFloatingButtons() {
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-contact-buttons';
        floatingContainer.innerHTML = `
            <div class="floating-whatsapp" data-tooltip="Chat with us on WhatsApp">
                <a href="https://wa.me/${this.whatsappNumber}?text=Hi! I'm interested in Casa de Casablanca properties. Can you provide more information?" 
                   target="_blank" rel="noopener noreferrer" class="whatsapp-button">
                    <i class="fab fa-whatsapp"></i>
                    <span class="button-pulse"></span>
                </a>
            </div>
            <div class="floating-phone" data-tooltip="Call us now">
                <a href="tel:+${this.phoneNumber}" class="phone-button">
                    <i class="fas fa-phone"></i>
                    <span class="button-pulse"></span>
                </a>
            </div>
        `;
        
        document.body.appendChild(floatingContainer);
        
        // Show after page load
        setTimeout(() => {
            floatingContainer.classList.add('visible');
        }, 2000);
    }
    
    enhanceExistingButtons() {
        // Update existing WhatsApp links
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const currentHref = link.getAttribute('href');
            if (!currentHref.includes(this.whatsappNumber)) {
                link.setAttribute('href', `https://wa.me/${this.whatsappNumber}?text=Hi! I'm interested in Casa de Casablanca properties. Can you provide more information?`);
            }
        });
        
        // Update existing phone links
        document.querySelectorAll('a[href*="tel:"]').forEach(link => {
            const currentHref = link.getAttribute('href');
            if (!currentHref.includes(this.phoneNumber)) {
                link.setAttribute('href', `tel:+${this.phoneNumber}`);
            }
        });
    }
    
    trackInteractions() {
        // Track WhatsApp clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('a[href*="wa.me"]')) {
                ConversionTracker.track('whatsapp_click', {
                    source: e.target.closest('a').dataset.source || 'unknown',
                    page: window.location.pathname
                });
            }
            
            if (e.target.closest('a[href*="tel:"]')) {
                ConversionTracker.track('phone_click', {
                    source: e.target.closest('a').dataset.source || 'unknown',
                    page: window.location.pathname
                });
            }
        });
    }
    
    createContextualWhatsApp(message, buttonText = "Chat on WhatsApp") {
        return `
            <a href="https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}" 
               target="_blank" rel="noopener noreferrer" 
               class="btn btn--whatsapp"
               data-source="contextual">
                <i class="fab fa-whatsapp"></i>
                ${buttonText}
            </a>
        `;
    }
    
    createContextualPhone(buttonText = "Call Now") {
        return `
            <a href="tel:+${this.phoneNumber}" 
               class="btn btn--phone"
               data-source="contextual">
                <i class="fas fa-phone"></i>
                ${buttonText}
            </a>
        `;
    }
}

// Initialize contact integration
document.addEventListener('DOMContentLoaded', () => {
    window.contactIntegration = new ContactIntegration();
});

/*===== PROPERTY INQUIRY FORMS =====*/
class PropertyInquiryForm extends SmartContactForm {
    constructor(formElement) {
        super(formElement);
        this.propertyData = this.extractPropertyData();
        this.setupPropertySpecificFeatures();
    }
    
    extractPropertyData() {
        const propertySection = this.form.closest('.property-card, .property-section');
        return {
            propertyName: propertySection?.dataset.propertyName || 'Casa de Casablanca',
            propertyPrice: propertySection?.dataset.propertyPrice || '',
            propertyType: propertySection?.dataset.propertyType || 'Land',
            propertyId: propertySection?.dataset.propertyId || 'CASA001'
        };
    }
    
    setupPropertySpecificFeatures() {
        this.prefillPropertyData();
        this.addPropertyCalculator();
        this.addFinancingOptions();
    }
    
    prefillPropertyData() {
        const propertyNameField = this.form.querySelector('[name="property_name"]');
        const propertyIdField = this.form.querySelector('[name="property_id"]');
        
        if (propertyNameField) propertyNameField.value = this.propertyData.propertyName;
        if (propertyIdField) propertyIdField.value = this.propertyData.propertyId;
    }
    
    addPropertyCalculator() {
        const calculatorContainer = this.form.querySelector('.property-calculator');
        if (!calculatorContainer) return;
        
        calculatorContainer.innerHTML = `
            <h4>Quick Investment Calculator</h4>
            <div class="calculator-inputs">
                <div class="input-group">
                    <label>Investment Amount (₦)</label>
                    <input type="number" name="investment_amount" min="1000000" step="100000" 
                           placeholder="e.g., 10,000,000" class="calc-input">
                </div>
                <div class="input-group">
                    <label>Investment Period</label>
                    <select name="investment_period" class="calc-input">
                        <option value="12">1 Year</option>
                        <option value="24">2 Years</option>
                        <option value="36" selected>3 Years</option>
                        <option value="60">5 Years</option>
                    </select>
                </div>
            </div>
            <div class="calculator-results">
                <div class="result-item">
                    <span class="result-label">Projected Value:</span>
                    <span class="result-value" id="projected-value">₦0</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Expected Returns:</span>
                    <span class="result-value" id="expected-returns">₦0</span>
                </div>
                <div class="result-item">
                    <span class="result-label">ROI:</span>
                    <span class="result-value" id="roi-percentage">0%</span>
                </div>
            </div>
        `;
        
        // Bind calculator events
        calculatorContainer.addEventListener('input', this.calculateReturns.bind(this));
        calculatorContainer.addEventListener('change', this.calculateReturns.bind(this));
    }
    
    calculateReturns() {
        const investmentAmount = parseFloat(this.form.querySelector('[name="investment_amount"]').value) || 0;
        const investmentPeriod = parseInt(this.form.querySelector('[name="investment_period"]').value) || 36;
        
        // Projected annual appreciation rate (15-25% for prime Lekki locations)
        const annualRate = 0.20; // 20% annual appreciation
        const monthlyRate = annualRate / 12;
        
        const projectedValue = investmentAmount * Math.pow(1 + monthlyRate, investmentPeriod);
        const expectedReturns = projectedValue - investmentAmount;
        const roiPercentage = ((projectedValue - investmentAmount) / investmentAmount) * 100;
        
        // Update display
        document.getElementById('projected-value').textContent = this.formatCurrency(projectedValue);
        document.getElementById('expected-returns').textContent = this.formatCurrency(expectedReturns);
        document.getElementById('roi-percentage').textContent = roiPercentage.toFixed(1) + '%';
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    addFinancingOptions() {
        const financingContainer = this.form.querySelector('.financing-options');
        if (!financingContainer) return;
        
        financingContainer.innerHTML = `
            <h4>Financing Options</h4>
            <div class="financing-grid">
                <label class="financing-option">
                    <input type="radio" name="financing_option" value="outright">
                    <div class="option-content">
                        <div class="option-title">Outright Payment</div>
                        <div class="option-desc">Full payment with 5% discount</div>
                        <div class="option-benefit">Best Value</div>
                    </div>
                </label>
                <label class="financing-option">
                    <input type="radio" name="financing_option" value="6months" checked>
                    <div class="option-content">
                        <div class="option-title">6 Months Plan</div>
                        <div class="option-desc">50% down, balance in 6 months</div>
                        <div class="option-benefit">Popular Choice</div>
                    </div>
                </label>
                <label class="financing-option">
                    <input type="radio" name="financing_option" value="12months">
                    <div class="option-content">
                        <div class="option-title">12 Months Plan</div>
                        <div class="option-desc">30% down, monthly installments</div>
                        <div class="option-benefit">Flexible</div>
                    </div>
                </label>
                <label class="financing-option">
                    <input type="radio" name="financing_option" value="24months">
                    <div class="option-content">
                        <div class="option-title">24 Months Plan</div>
                        <div class="option-desc">25% down, extended payments</div>
                        <div class="option-benefit">Extended Terms</div>
                    </div>
                </label>
            </div>
        `;
    }
}

/*===== NEWSLETTER SIGNUP =====*/
class NewsletterSignup {
    constructor() {
        this.init();
    }
    
    init() {
        this.createNewsletterForms();
        this.setupInvestmentTips();
        this.bindEvents();
    }
    
    createNewsletterForms() {
        // Create floating newsletter signup
        const floatingNewsletter = document.createElement('div');
        floatingNewsletter.className = 'floating-newsletter';
        floatingNewsletter.innerHTML = `
            <div class="newsletter-content">
                <div class="newsletter-header">
                    <h4>📈 Weekly Investment Tips</h4>
                    <p>Get exclusive insights into Lagos real estate market</p>
                </div>
                <form class="newsletter-form" id="floating-newsletter-form">
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Your email address" required>
                        <button type="submit" class="btn btn--primary">
                            Subscribe <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                    <div class="newsletter-benefits">
                        <div class="benefit-item">
                            <i class="fas fa-chart-line"></i>
                            <span>Market Analysis</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Location Insights</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-percent"></i>
                            <span>Exclusive Offers</span>
                        </div>
                    </div>
                </form>
                <button class="newsletter-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(floatingNewsletter);
        
        // Show after 30 seconds or scroll to 50%
        setTimeout(() => this.maybeShowNewsletter(floatingNewsletter), 30000);
        
        let scrollShown = false;
        window.addEventListener('scroll', () => {
            if (!scrollShown && window.scrollY > document.body.offsetHeight * 0.5) {
                this.maybeShowNewsletter(floatingNewsletter);
                scrollShown = true;
            }
        });
    }
    
    maybeShowNewsletter(newsletter) {
        // Don't show if user already subscribed or dismissed recently
        if (localStorage.getItem('newsletter_dismissed') || localStorage.getItem('newsletter_subscribed')) {
            return;
        }
        
        newsletter.classList.add('visible');
        
        // Track impression
        ConversionTracker.track('newsletter_impression', {
            trigger: 'auto',
            page: window.location.pathname
        });
    }
    
    setupInvestmentTips() {
        const tips = [
            {
                title: "Location Intelligence",
                content: "Properties within 5km of major infrastructure projects appreciate 40% faster than average.",
                category: "market-insight"
            },
            {
                title: "Timing Strategy", 
                content: "Q1 typically offers the best prices as developers clear inventory for new projects.",
                category: "timing"
            },
            {
                title: "Due Diligence",
                content: "Always verify C of O and survey documents. Our legal team provides free verification.",
                category: "legal"
            },
            {
                title: "Financing Optimization",
                content: "6-month payment plans often provide better value than extended 24-month terms.",
                category: "financing"
            },
            {
                title: "Growth Corridors",
                content: "The Lekki-Epe axis is projected to see 300% population growth by 2030.",
                category: "growth"
            }
        ];
        
        this.investmentTips = tips;
        this.currentTipIndex = 0;
    }
    
    bindEvents() {
        // Handle newsletter form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('newsletter-form')) {
                e.preventDefault();
                this.handleNewsletterSubmit(e.target);
            }
        });
        
        // Handle newsletter close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('newsletter-close')) {
                this.dismissNewsletter(e.target.closest('.floating-newsletter'));
            }
        });
    }
    
    async handleNewsletterSubmit(form) {
        const email = form.querySelector('[name="email"]').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="btn-loader"></div> Subscribing...';
        
        try {
            // Simulate API call
            await this.subscribeToNewsletter(email);
            
            // Show success
            this.showNewsletterSuccess(form);
            
            // Track conversion
            ConversionTracker.track('newsletter_signup', {
                email: email,
                source: form.id,
                page: window.location.pathname
            });
            
            // Mark as subscribed
            localStorage.setItem('newsletter_subscribed', 'true');
            
        } catch (error) {
            this.showNewsletterError(form, 'Failed to subscribe. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>';
        }
    }
    
    async subscribeToNewsletter(email) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Subscription failed'));
                }
            }, 2000);
        });
    }
    
    showNewsletterSuccess(form) {
        const container = form.closest('.floating-newsletter, .newsletter-section');
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter-success';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h4>Welcome to our community!</h4>
                <p>You'll receive your first investment tip within 24 hours.</p>
                <div class="next-tip">
                    <h5>💡 Today's Tip:</h5>
                    <p>${this.investmentTips[this.currentTipIndex].content}</p>
                </div>
                <div class="success-actions">
                    ${window.contactIntegration.createContextualWhatsApp(
                        "Hi! I just subscribed to your newsletter. Can we discuss investment opportunities?",
                        "Chat with Expert"
                    )}
                </div>
            </div>
        `;
        
        form.style.display = 'none';
        container.appendChild(successMessage);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (container.closest('.floating-newsletter')) {
                container.classList.remove('visible');
            }
        }, 10000);
    }
    
    showNewsletterError(form, message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'newsletter-error';
        errorEl.textContent = message;
        
        form.appendChild(errorEl);
        
        setTimeout(() => errorEl.remove(), 5000);
    }
    
    dismissNewsletter(newsletter) {
        newsletter.classList.remove('visible');
        localStorage.setItem('newsletter_dismissed', Date.now().toString());
        
        ConversionTracker.track('newsletter_dismissed', {
            page: window.location.pathname
        });
    }
}

/*===== VIRTUAL CONSULTATION BOOKING =====*/
class VirtualConsultationBooking {
    constructor() {
        this.availableSlots = this.generateAvailableSlots();
        this.init();
    }
    
    init() {
        this.createBookingModal();
        this.bindBookingTriggers();
    }
    
    generateAvailableSlots() {
        const slots = [];
        const now = new Date();
        
        // Generate slots for next 14 days (excluding weekends)
        for (let i = 1; i <= 14; i++) {
            const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
            
            // Skip weekends
            if (date.getDay() === 0 || date.getDay() === 6) continue;
            
            // Add time slots: 9 AM to 6 PM (excluding 12-1 PM lunch)
            const timeSlots = [
                '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
            ];
            
            timeSlots.forEach(time => {
                slots.push({
                    date: date.toISOString().split('T')[0],
                    time: time,
                    available: Math.random() > 0.3 // 70% availability
                });
            });
        }
        
        return slots;
    }
    
    createBookingModal() {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.id = 'consultation-booking-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Book Virtual Consultation</h3>
                    <p>Schedule a 30-minute session with our property experts</p>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="consultation-form" id="consultation-booking-form">
                        <div class="booking-steps">
                            <!-- Step 1: Personal Information -->
                            <div class="booking-step active" data-step="1">
                                <h4>Your Information</h4>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Full Name *</label>
                                        <input type="text" name="full_name" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Email Address *</label>
                                        <input type="email" name="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Phone Number *</label>
                                        <input type="tel" name="phone" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Investment Budget</label>
                                        <select name="budget">
                                            <option value="">Select budget range</option>
                                            <option value="5-10m">₦5M - ₦10M</option>
                                            <option value="10-25m">₦10M - ₦25M</option>
                                            <option value="25-50m">₦25M - ₦50M</option>
                                            <option value="50m+">₦50M+</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>What would you like to discuss?</label>
                                    <div class="checkbox-group">
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="topics" value="investment-strategy">
                                            <span class="checkmark"></span>
                                            Investment Strategy
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="topics" value="property-selection">
                                            <span class="checkmark"></span>
                                            Property Selection
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="topics" value="financing-options">
                                            <span class="checkmark"></span>
                                            Financing Options
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="topics" value="legal-process">
                                            <span class="checkmark"></span>
                                            Legal Process
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="topics" value="market-analysis">
                                            <span class="checkmark"></span>
                                            Market Analysis
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Step 2: Date Selection -->
                            <div class="booking-step" data-step="2">
                                <h4>Select Date & Time</h4>
                                <div class="calendar-container">
                                    <div class="calendar-grid" id="calendar-grid">
                                        <!-- Generated by JavaScript -->
                                    </div>
                                </div>
                                <div class="time-slots-container">
                                    <h5>Available Times</h5>
                                    <div class="time-slots" id="time-slots">
                                        <!-- Generated by JavaScript -->
                                    </div>
                                </div>
                                <div class="selected-slot">
                                    <p>Selected: <span id="selected-slot-display">None</span></p>
                                </div>
                            </div>
                            
                            <!-- Step 3: Confirmation -->
                            <div class="booking-step" data-step="3">
                                <h4>Confirmation</h4>
                                <div class="booking-summary">
                                    <div class="summary-item">
                                        <strong>Consultation Type:</strong>
                                        <span>Virtual Meeting (Google Meet/Zoom)</span>
                                    </div>
                                    <div class="summary-item">
                                        <strong>Duration:</strong>
                                        <span>30 minutes</span>
                                    </div>
                                    <div class="summary-item">
                                        <strong>Date & Time:</strong>
                                        <span id="summary-datetime">-</span>
                                    </div>
                                    <div class="summary-item">
                                        <strong>Expert:</strong>
                                        <span>Senior Property Consultant</span>
                                    </div>
                                </div>
                                <div class="consultation-benefits">
                                    <h5>What You'll Get:</h5>
                                    <ul>
                                        <li><i class="fas fa-check"></i> Personalized investment strategy</li>
                                        <li><i class="fas fa-check"></i> Market analysis report</li>
                                        <li><i class="fas fa-check"></i> Property recommendations</li>
                                        <li><i class="fas fa-check"></i> Financing guidance</li>
                                        <li><i class="fas fa-check"></i> Legal documentation checklist</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="booking-navigation">
                            <button type="button" class="btn btn--secondary btn-prev" disabled>
                                <i class="fas fa-arrow-left"></i> Previous
                            </button>
                            <button type="button" class="btn btn--primary btn-next">
                                Next <i class="fas fa-arrow-right"></i>
                            </button>
                            <button type="submit" class="btn btn--success btn-book" style="display: none;">
                                Book Consultation <i class="fas fa-calendar-check"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.bindBookingEvents(modal);
        this.setupCalendar();
    }
    
    bindBookingTriggers() {
        // Add booking buttons throughout the site
        document.addEventListener('click', (e) => {
            if (e.target.matches('.book-consultation, [data-action="book-consultation"]')) {
                e.preventDefault();
                this.openBookingModal();
            }
        });
    }
    
    openBookingModal() {
        const modal = document.getElementById('consultation-booking-modal');
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        ConversionTracker.track('consultation_modal_opened', {
            page: window.location.pathname
        });
    }
    
    closeBookingModal() {
        const modal = document.getElementById('consultation-booking-modal');
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    bindBookingEvents(modal) {
        // Close modal events
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeBookingModal());
        modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeBookingModal());
        
        // Step navigation
        modal.querySelector('.btn-next').addEventListener('click', () => this.nextBookingStep());
        modal.querySelector('.btn-prev').addEventListener('click', () => this.prevBookingStep());
        
        // Form submission
        modal.querySelector('.consultation-form').addEventListener('submit', (e) => this.handleBookingSubmit(e));
    }
    
    setupCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const uniqueDates = [...new Set(this.availableSlots.map(slot => slot.date))];
        
        uniqueDates.forEach(date => {
            const dateObj = new Date(date);
            const daySlots = this.availableSlots.filter(slot => slot.date === date && slot.available);
            
            const dateElement = document.createElement('div');
            dateElement.className = `calendar-date ${daySlots.length > 0 ? 'available' : 'unavailable'}`;
            dateElement.dataset.date = date;
            dateElement.innerHTML = `
                <div class="date-number">${dateObj.getDate()}</div>
                <div class="date-month">${dateObj.toLocaleDateString('en-US', { month: 'short' })}</div>
                <div class="available-slots">${daySlots.length} slots</div>
            `;
            
            if (daySlots.length > 0) {
                dateElement.addEventListener('click', () => this.selectDate(date));
            }
            
            calendarGrid.appendChild(dateElement);
        });
    }
    
    selectDate(date) {
        // Update UI
        document.querySelectorAll('.calendar-date').forEach(el => el.classList.remove('selected'));
        document.querySelector(`[data-date="${date}"]`).classList.add('selected');
        
        // Show available time slots
        this.showTimeSlots(date);
    }
    
    showTimeSlots(date) {
        const timeSlotsContainer = document.getElementById('time-slots');
        const availableSlots = this.availableSlots.filter(slot => slot.date === date && slot.available);
        
        timeSlotsContainer.innerHTML = availableSlots.map(slot => `
            <button type="button" class="time-slot" data-date="${slot.date}" data-time="${slot.time}">
                ${slot.time}
            </button>
        `).join('');
        
        // Bind time slot selection
        timeSlotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('time-slot')) {
                this.selectTimeSlot(e.target);
            }
        });
    }
    
    selectTimeSlot(timeSlotElement) {
        // Update UI
        document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
        timeSlotElement.classList.add('selected');
        
        // Update display
        const date = timeSlotElement.dataset.date;
        const time = timeSlotElement.dataset.time;
        const dateObj = new Date(date);
        const displayText = `${dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })} at ${time}`;
        
        document.getElementById('selected-slot-display').textContent = displayText;
        document.getElementById('summary-datetime').textContent = displayText;
        
        // Store selection
        this.selectedSlot = { date, time };
    }
    
    nextBookingStep() {
        const currentStep = document.querySelector('.booking-step.active');
        const currentStepNum = parseInt(currentStep.dataset.step);
        const nextStep = document.querySelector(`[data-step="${currentStepNum + 1}"]`);
        
        if (nextStep) {
            currentStep.classList.remove('active');
            nextStep.classList.add('active');
            
            this.updateBookingNavigation(currentStepNum + 1);
        }
    }
    
    prevBookingStep() {
        const currentStep = document.querySelector('.booking-step.active');
        const currentStepNum = parseInt(currentStep.dataset.step);
        const prevStep = document.querySelector(`[data-step="${currentStepNum - 1}"]`);
        
        if (prevStep) {
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
            
            this.updateBookingNavigation(currentStepNum - 1);
        }
    }
    
    updateBookingNavigation(step) {
        const prevBtn = document.querySelector('.btn-prev');
        const nextBtn = document.querySelector('.btn-next');
        const bookBtn = document.querySelector('.btn-book');
        
        prevBtn.disabled = step === 1;
        
        if (step === 3) {
            nextBtn.style.display = 'none';
            bookBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            bookBtn.style.display = 'none';
        }
    }
    
    async handleBookingSubmit(e) {
        e.preventDefault();
        
        if (!this.selectedSlot) {
            alert('Please select a date and time for your consultation.');
            return;
        }
        
        const formData = new FormData(e.target);
        const bookingData = {
            ...Object.fromEntries(formData),
            date: this.selectedSlot.date,
            time: this.selectedSlot.time,
            topics: formData.getAll('topics')
        };
        
        try {
            await this.submitBooking(bookingData);
            this.showBookingSuccess(bookingData);
            
            ConversionTracker.track('consultation_booked', {
                date: this.selectedSlot.date,
                time: this.selectedSlot.time,
                budget: bookingData.budget,
                topics: bookingData.topics
            });
            
        } catch (error) {
            alert('Booking failed. Please try again or contact us directly.');
        }
    }
    
    async submitBooking(bookingData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({ success: true, meetingLink: 'https://meet.google.com/abc-defg-hij' });
                } else {
                    reject(new Error('Booking failed'));
                }
            }, 2000);
        });
    }
    
    showBookingSuccess(bookingData) {
        const modal = document.getElementById('consultation-booking-modal');
        const modalBody = modal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="booking-success">
                <div class="success-animation">
                    <div class="success-checkmark">
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                            <div class="icon-circle"></div>
                            <div class="icon-fix"></div>
                        </div>
                    </div>
                </div>
                <h3>Consultation Booked Successfully!</h3>
                <div class="booking-details">
                    <p><strong>Date:</strong> ${new Date(this.selectedSlot.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${this.selectedSlot.time}</p>
                    <p><strong>Duration:</strong> 30 minutes</p>
                </div>
                <div class="next-steps">
                    <h4>Next Steps:</h4>
                    <ol>
                        <li>Check your email for meeting details</li>
                        <li>Download our investment guide (link in email)</li>
                        <li>Prepare your questions about the properties</li>
                    </ol>
                </div>
                <div class="success-actions">
                    <button class="btn btn--primary" onclick="document.getElementById('consultation-booking-modal').classList.remove('active')">
                        Continue Browsing
                    </button>
                    ${window.contactIntegration.createContextualWhatsApp(
                        `Hi! I just booked a consultation for ${this.selectedSlot.date} at ${this.selectedSlot.time}. Looking forward to it!`,
                        "Message on WhatsApp"
                    )}
                </div>
            </div>
        `;
    }
}

// Initialize newsletter and booking systems
document.addEventListener('DOMContentLoaded', () => {
    window.newsletterSignup = new NewsletterSignup();
    window.virtualConsultation = new VirtualConsultationBooking();
});

/*===== DOWNLOAD BROCHURE WITH EMAIL CAPTURE =====*/
class BrochureDownload {
    constructor() {
        this.downloads = new Map(); // Track download attempts
        this.init();
    }
    
    init() {
        this.createDownloadModal();
        this.bindDownloadTriggers();
        this.setupDownloadTracking();
    }
    
    createDownloadModal() {
        const modal = document.createElement('div');
        modal.className = 'download-modal';
        modal.id = 'brochure-download-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Download Investment Brochure</h3>
                    <p>Get our comprehensive 24-page investment guide with exclusive insights</p>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="brochure-preview">
                        <div class="preview-image">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280'%3E%3Crect fill='%23f3f4f6' width='200' height='280'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23374151'%3EBrochure%3C/text%3E%3C/svg%3E" 
                                 alt="Investment Brochure Preview" class="brochure-thumb">
                            <div class="preview-badge">
                                <i class="fas fa-file-pdf"></i>
                                <span>PDF • 2.4 MB</span>
                            </div>
                        </div>
                        <div class="brochure-features">
                            <h4>What's Inside:</h4>
                            <ul class="features-list">
                                <li><i class="fas fa-map-marked-alt"></i> Detailed location analysis</li>
                                <li><i class="fas fa-chart-line"></i> 5-year ROI projections</li>
                                <li><i class="fas fa-building"></i> Infrastructure development timeline</li>
                                <li><i class="fas fa-calculator"></i> Investment calculator worksheet</li>
                                <li><i class="fas fa-file-contract"></i> Legal documentation checklist</li>
                                <li><i class="fas fa-phone"></i> Direct contact to senior consultants</li>
                            </ul>
                        </div>
                    </div>
                    
                    <form class="download-form" id="brochure-download-form">
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="full_name" required placeholder="Enter your full name">
                        </div>
                        <div class="form-group">
                            <label>Email Address *</label>
                            <input type="email" name="email" required placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" placeholder="Your phone number (optional)">
                        </div>
                        <div class="form-group">
                            <label>Investment Interest</label>
                            <select name="investment_interest">
                                <option value="">Select your interest</option>
                                <option value="residential">Residential Properties</option>
                                <option value="commercial">Commercial Properties</option>
                                <option value="land">Land Investment</option>
                                <option value="mixed">Mixed Portfolio</option>
                            </select>
                        </div>
                        
                        <div class="newsletter-optin">
                            <label class="checkbox-item">
                                <input type="checkbox" name="newsletter_signup" checked>
                                <span class="checkmark"></span>
                                Yes, send me weekly market insights and exclusive offers
                            </label>
                        </div>
                        
                        <div class="download-benefits">
                            <div class="benefit-grid">
                                <div class="benefit-item">
                                    <i class="fas fa-gift"></i>
                                    <span>Bonus: Free consultation call</span>
                                </div>
                                <div class="benefit-item">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Your data is 100% secure</span>
                                </div>
                                <div class="benefit-item">
                                    <i class="fas fa-clock"></i>
                                    <span>Instant download</span>
                                </div>
                                <div class="benefit-item">
                                    <i class="fas fa-envelope"></i>
                                    <span>No spam, unsubscribe anytime</span>
                                </div>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn--primary btn--large download-btn">
                            <i class="fas fa-download"></i>
                            Download Free Brochure
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.bindDownloadEvents(modal);
    }
    
    bindDownloadTriggers() {
        // Add download buttons throughout the site
        document.addEventListener('click', (e) => {
            if (e.target.matches('.download-brochure, [data-action="download-brochure"]')) {
                e.preventDefault();
                this.openDownloadModal();
            }
        });
    }
    
    openDownloadModal() {
        const modal = document.getElementById('brochure-download-modal');
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        ConversionTracker.track('brochure_modal_opened', {
            page: window.location.pathname
        });
    }
    
    closeDownloadModal() {
        const modal = document.getElementById('brochure-download-modal');
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    bindDownloadEvents(modal) {
        // Close modal events
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeDownloadModal());
        modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeDownloadModal());
        
        // Form submission
        modal.querySelector('.download-form').addEventListener('submit', (e) => this.handleDownloadSubmit(e));
    }
    
    async handleDownloadSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const downloadData = Object.fromEntries(formData);
        const downloadBtn = e.target.querySelector('.download-btn');
        
        // Show loading state
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<div class="btn-loader"></div> Preparing Download...';
        
        try {
            // Simulate API call and PDF generation
            const downloadResult = await this.processDownload(downloadData);
            
            // Show success and start download
            this.showDownloadSuccess(downloadData);
            this.startDownload(downloadResult.downloadUrl);
            
            // Track conversion
            ConversionTracker.track('brochure_downloaded', {
                email: downloadData.email,
                interest: downloadData.investment_interest,
                newsletter_signup: downloadData.newsletter_signup === 'on',
                page: window.location.pathname
            });
            
        } catch (error) {
            this.showDownloadError('Download failed. Please try again.');
        } finally {
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Free Brochure';
        }
    }
    
    async processDownload(downloadData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) { // 95% success rate
                    resolve({ 
                        downloadUrl: this.generateBrochurePDF(downloadData),
                        success: true 
                    });
                } else {
                    reject(new Error('Download failed'));
                }
            }, 2000);
        });
    }
    
    generateBrochurePDF(userData) {
        // In a real implementation, this would generate a personalized PDF
        // For demo purposes, we'll create a blob with sample content
        const pdfContent = this.createPersonalizedPDFContent(userData);
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    }
    
    createPersonalizedPDFContent(userData) {
        // Sample PDF content (in real implementation, use jsPDF or similar)
        return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 12 Tf
50 750 Td
(Casa de Casablanca Investment Guide) Tj
0 -20 Td
(Personalized for: ${userData.full_name}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000213 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
364
%%EOF`;
    }
    
    startDownload(downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Casa-de-Casablanca-Investment-Guide.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Cleanup URL after download
        setTimeout(() => {
            URL.revokeObjectURL(downloadUrl);
        }, 100);
    }
    
    showDownloadSuccess(downloadData) {
        const modal = document.getElementById('brochure-download-modal');
        const modalBody = modal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="download-success">
                <div class="success-animation">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <h3>Download Started!</h3>
                <p>Your personalized investment guide is downloading now.</p>
                
                <div class="next-steps">
                    <h4>What's Next?</h4>
                    <div class="steps-grid">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h5>Review the Guide</h5>
                                <p>Take your time to explore all sections</p>
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h5>Schedule a Call</h5>
                                <p>Book your free consultation</p>
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h5>Start Investing</h5>
                                <p>Choose your perfect property</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="success-actions">
                    <button class="btn btn--primary book-consultation">
                        <i class="fas fa-calendar"></i>
                        Book Free Consultation
                    </button>
                    ${window.contactIntegration.createContextualWhatsApp(
                        `Hi! I just downloaded your investment guide. Can we discuss the opportunities?`,
                        "Chat with Expert"
                    )}
                </div>
                
                <div class="bonus-offer">
                    <div class="bonus-content">
                        <i class="fas fa-gift"></i>
                        <div class="bonus-text">
                            <h5>Bonus: Free Site Visit</h5>
                            <p>Book a consultation and get a complimentary property tour</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Bind consultation booking
        modalBody.querySelector('.book-consultation').addEventListener('click', () => {
            this.closeDownloadModal();
            if (window.virtualConsultation) {
                window.virtualConsultation.openBookingModal();
            }
        });
    }
    
    showDownloadError(message) {
        const modal = document.getElementById('brochure-download-modal');
        const form = modal.querySelector('.download-form');
        
        const errorEl = document.createElement('div');
        errorEl.className = 'download-error';
        errorEl.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="error-close">&times;</button>
            </div>
        `;
        
        form.appendChild(errorEl);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorEl.parentNode) {
                errorEl.remove();
            }
        }, 5000);
        
        // Manual close
        errorEl.querySelector('.error-close').addEventListener('click', () => {
            errorEl.remove();
        });
    }
    
    setupDownloadTracking() {
        // Track download button views
        if ('IntersectionObserver' in window) {
            const downloadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        ConversionTracker.track('download_button_viewed', {
                            element: entry.target.className,
                            page: window.location.pathname
                        });
                        downloadObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            // Observe download buttons when they're added to the page
            setTimeout(() => {
                document.querySelectorAll('.download-brochure, [data-action="download-brochure"]').forEach(btn => {
                    downloadObserver.observe(btn);
                });
            }, 1000);
        }
    }
}

/*===== EXIT-INTENT POPUPS =====*/
class ExitIntentPopups {
    constructor() {
        this.hasShownExitIntent = false;
        this.exitIntentDelay = 1000; // Delay before showing popup
        this.mouseLeaveCount = 0;
        this.init();
    }
    
    init() {
        this.createExitIntentPopup();
        this.bindExitIntentEvents();
        this.setupTimeBasedPopups();
    }
    
    createExitIntentPopup() {
        const popup = document.createElement('div');
        popup.className = 'exit-intent-popup';
        popup.id = 'exit-intent-popup';
        popup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <div class="popup-header">
                    <h3>Wait! Don't Miss This Opportunity</h3>
                    <button class="popup-close">&times;</button>
                </div>
                <div class="popup-body">
                    <div class="offer-content">
                        <div class="offer-badge">
                            <span class="badge-text">Limited Time</span>
                            <span class="badge-offer">Special Offer</span>
                        </div>
                        
                        <div class="offer-details">
                            <h4>🎉 Exclusive Launch Bonus</h4>
                            <div class="offer-list">
                                <div class="offer-item">
                                    <i class="fas fa-percent"></i>
                                    <span><strong>5% Additional Discount</strong> on any property purchase</span>
                                </div>
                                <div class="offer-item">
                                    <i class="fas fa-calendar-check"></i>
                                    <span><strong>Free Legal Documentation</strong> (Worth ₦500,000)</span>
                                </div>
                                <div class="offer-item">
                                    <i class="fas fa-car"></i>
                                    <span><strong>Complimentary Site Visit</strong> with transportation</span>
                                </div>
                                <div class="offer-item">
                                    <i class="fas fa-chart-line"></i>
                                    <span><strong>Personalized Investment Strategy</strong> consultation</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="urgency-timer">
                            <div class="timer-content">
                                <i class="fas fa-clock"></i>
                                <span>This offer expires in: </span>
                                <div class="countdown-timer" id="exit-offer-countdown">
                                    <span class="time-unit">
                                        <span class="time-number" id="hours">23</span>
                                        <span class="time-label">Hours</span>
                                    </span>
                                    <span class="time-separator">:</span>
                                    <span class="time-unit">
                                        <span class="time-number" id="minutes">59</span>
                                        <span class="time-label">Minutes</span>
                                    </span>
                                    <span class="time-separator">:</span>
                                    <span class="time-unit">
                                        <span class="time-number" id="seconds">59</span>
                                        <span class="time-label">Seconds</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <form class="exit-offer-form" id="exit-offer-form">
                            <div class="form-group">
                                <input type="email" name="email" placeholder="Enter your email to claim this offer" required>
                            </div>
                            <div class="form-group">
                                <input type="tel" name="phone" placeholder="Phone number (optional)">
                            </div>
                            <button type="submit" class="btn btn--primary btn--large claim-btn">
                                <i class="fas fa-gift"></i>
                                Claim My Exclusive Offer
                            </button>
                        </form>
                        
                        <div class="social-proof">
                            <div class="proof-item">
                                <i class="fas fa-users"></i>
                                <span>847 investors joined this month</span>
                            </div>
                            <div class="proof-item">
                                <i class="fas fa-star"></i>
                                <span>4.9/5 average satisfaction rating</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup-footer">
                    <p class="disclaimer">*Offer valid for new customers only. Cannot be combined with other offers.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        this.bindPopupEvents(popup);
        this.startCountdownTimer();
    }
    
    bindExitIntentEvents() {
        let exitTimer;
        
        // Mouse leave detection (desktop)
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                this.mouseLeaveCount++;
                
                clearTimeout(exitTimer);
                exitTimer = setTimeout(() => {
                    this.maybeShowExitIntent('mouse_leave');
                }, this.exitIntentDelay);
            }
        });
        
        // Mobile scroll-up detection
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < lastScrollY && currentScrollY < 100) {
                // User scrolled up to top (mobile exit intent)
                this.maybeShowExitIntent('scroll_up');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
        
        // Tab visibility change (user switching tabs)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                setTimeout(() => {
                    if (document.hidden) {
                        this.maybeShowExitIntent('tab_hidden');
                    }
                }, 2000);
            }
        });
        
        // Back button detection
        window.addEventListener('beforeunload', (e) => {
            if (!this.hasShownExitIntent) {
                // This won't show our popup but we can track the intent
                ConversionTracker.track('exit_intent_beforeunload');
            }
        });
    }
    
    maybeShowExitIntent(trigger) {
        // Don't show if already shown or user is a returning visitor who dismissed
        if (this.hasShownExitIntent || 
            localStorage.getItem('exit_intent_dismissed') ||
            localStorage.getItem('exit_offer_claimed')) {
            return;
        }
        
        // Don't show on very short visits
        if (Date.now() - window.pageLoadTime < 30000) {
            return;
        }
        
        this.showExitIntentPopup(trigger);
    }
    
    showExitIntentPopup(trigger) {
        const popup = document.getElementById('exit-intent-popup');
        popup.classList.add('active');
        document.body.classList.add('popup-open');
        
        this.hasShownExitIntent = true;
        
        ConversionTracker.track('exit_intent_shown', {
            trigger: trigger,
            mouse_leaves: this.mouseLeaveCount,
            time_on_page: Date.now() - window.pageLoadTime,
            page: window.location.pathname
        });
    }
    
    closeExitIntentPopup() {
        const popup = document.getElementById('exit-intent-popup');
        popup.classList.remove('active');
        document.body.classList.remove('popup-open');
        
        // Mark as dismissed
        localStorage.setItem('exit_intent_dismissed', Date.now().toString());
        
        ConversionTracker.track('exit_intent_dismissed');
    }
    
    bindPopupEvents(popup) {
        // Close popup events
        popup.querySelector('.popup-close').addEventListener('click', () => this.closeExitIntentPopup());
        popup.querySelector('.popup-overlay').addEventListener('click', () => this.closeExitIntentPopup());
        
        // Form submission
        popup.querySelector('.exit-offer-form').addEventListener('submit', (e) => this.handleOfferClaim(e));
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                this.closeExitIntentPopup();
            }
        });
    }
    
    startCountdownTimer() {
        // Set expiry time (24 hours from now)
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = expiryTime - now;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.getElementById('exit-offer-countdown').innerHTML = '<span class="expired">Offer Expired</span>';
                return;
            }
            
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
    
    async handleOfferClaim(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const claimData = Object.fromEntries(formData);
        const claimBtn = e.target.querySelector('.claim-btn');
        
        // Show loading state
        claimBtn.disabled = true;
        claimBtn.innerHTML = '<div class="btn-loader"></div> Claiming Offer...';
        
        try {
            await this.processOfferClaim(claimData);
            this.showOfferSuccess(claimData);
            
            // Track conversion
            ConversionTracker.track('exit_offer_claimed', {
                email: claimData.email,
                phone: claimData.phone,
                page: window.location.pathname
            });
            
            // Mark as claimed
            localStorage.setItem('exit_offer_claimed', 'true');
            
        } catch (error) {
            this.showOfferError('Failed to claim offer. Please try again.');
        } finally {
            claimBtn.disabled = false;
            claimBtn.innerHTML = '<i class="fas fa-gift"></i> Claim My Exclusive Offer';
        }
    }
    
    async processOfferClaim(claimData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) {
                    resolve({ success: true, offerCode: 'SAVE5PLUS' });
                } else {
                    reject(new Error('Claim failed'));
                }
            }, 2000);
        });
    }
    
    showOfferSuccess(claimData) {
        const popup = document.getElementById('exit-intent-popup');
        const popupBody = popup.querySelector('.popup-body');
        
        popupBody.innerHTML = `
            <div class="offer-success">
                <div class="success-animation">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <h3>🎉 Offer Claimed Successfully!</h3>
                <div class="offer-code">
                    <h4>Your Exclusive Code:</h4>
                    <div class="code-display">
                        <span class="code">SAVE5PLUS</span>
                        <button class="copy-code" onclick="navigator.clipboard.writeText('SAVE5PLUS')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                
                <div class="offer-instructions">
                    <h4>How to Use Your Offer:</h4>
                    <ol>
                        <li>Contact our team via WhatsApp or phone</li>
                        <li>Mention your offer code: <strong>SAVE5PLUS</strong></li>
                        <li>Choose your property and payment plan</li>
                        <li>Enjoy your exclusive benefits!</li>
                    </ol>
                </div>
                
                <div class="success-actions">
                    ${window.contactIntegration.createContextualWhatsApp(
                        `Hi! I claimed the SAVE5PLUS offer. Can we discuss available properties?`,
                        "Use Offer on WhatsApp"
                    )}
                    <a href="tel:+2347072172680" class="btn btn--outline">
                        <i class="fas fa-phone"></i>
                        Call to Use Offer
                    </a>
                </div>
                
                <div class="offer-reminder">
                    <p><strong>Check your email</strong> - We've sent you the offer details and next steps!</p>
                </div>
            </div>
        `;
    }
    
    showOfferError(message) {
        const form = document.getElementById('exit-offer-form');
        
        const errorEl = document.createElement('div');
        errorEl.className = 'offer-error';
        errorEl.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="error-close">&times;</button>
            </div>
        `;
        
        form.appendChild(errorEl);
        
        setTimeout(() => {
            if (errorEl.parentNode) {
                errorEl.remove();
            }
        }, 5000);
        
        errorEl.querySelector('.error-close').addEventListener('click', () => {
            errorEl.remove();
        });
    }
    
    setupTimeBasedPopups() {
        // Show different popups based on time spent on site
        setTimeout(() => {
            if (!this.hasShownExitIntent && !localStorage.getItem('newsletter_subscribed')) {
                // Show newsletter signup after 2 minutes
                ConversionTracker.track('time_based_popup_eligible', {
                    type: 'newsletter',
                    time_on_site: 120
                });
            }
        }, 120000); // 2 minutes
        
        setTimeout(() => {
            if (!this.hasShownExitIntent && !localStorage.getItem('consultation_booked')) {
                // Show consultation booking after 5 minutes
                ConversionTracker.track('time_based_popup_eligible', {
                    type: 'consultation',
                    time_on_site: 300
                });
            }
        }, 300000); // 5 minutes
    }
}

// Store page load time for exit intent calculations
window.pageLoadTime = Date.now();

// Initialize all conversion features
document.addEventListener('DOMContentLoaded', () => {
    window.brochureDownload = new BrochureDownload();
    window.exitIntentPopups = new ExitIntentPopups();
    
    // Initialize smart contact forms
    document.querySelectorAll('.smart-contact-form').forEach(form => {
        new SmartContactForm(form);
    });
    
    // Initialize property inquiry forms
    document.querySelectorAll('.property-inquiry-form').forEach(form => {
        new PropertyInquiryForm(form);
    });
});

// Export classes
window.BrochureDownload = BrochureDownload;
window.ExitIntentPopups = ExitIntentPopups;
