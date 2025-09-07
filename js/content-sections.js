/*===== CONTENT SECTIONS JAVASCRIPT =====*/

// Content Sections Controller
class ContentSectionsController {
    constructor() {
        this.initializeAll();
    }

    initializeAll() {
        this.initializeWhyIbejuLekki();
        this.initializeInvestmentGuide();
        this.initializePaymentPlans();
        this.initializeLegalCompliance();
        this.initializeDevelopmentTimeline();
        this.initializeFAQ();
        this.initializeVirtualTour();
        this.initializeBlogInsights();
        
        console.log('📋 Content sections initialized successfully');
    }

    // Why Ibeju-Lekki Section
    initializeWhyIbejuLekki() {
        // Animated counter for statistics
        this.initializeCounters();
        
        // Market comparison chart
        this.renderMarketComparisonChart();
        
        // Progress circles animation
        this.animateProgressCircles();
        
        // Download market report button
        const downloadBtn = document.getElementById('download-market-report');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadMarketReport();
            });
        }
    }

    initializeCounters() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(0) + 'K';
            } else {
                element.textContent = Math.floor(current);
            }
            
            element.classList.add('counting');
        }, 16);
    }

    renderMarketComparisonChart() {
        const chartContainer = document.getElementById('market-comparison-chart');
        if (!chartContainer) return;

        const chartData = [
            { area: 'Ibeju-Lekki', growth: 450, investment: 85, demand: 95 },
            { area: 'Victoria Island', growth: 120, investment: 60, demand: 80 },
            { area: 'Lekki Phase 1', growth: 280, investment: 70, demand: 85 },
            { area: 'Ajah', growth: 200, investment: 45, demand: 70 },
            { area: 'Ikeja', growth: 150, investment: 55, demand: 75 }
        ];

        chartContainer.innerHTML = `
            <div class="chart-header">
                <h4>5-Year Growth Comparison (%)</h4>
            </div>
            <div class="chart-bars-container">
                ${chartData.map(item => `
                    <div class="chart-bar-group">
                        <div class="chart-bar" style="height: ${(item.growth / 450) * 100}%">
                            <span class="bar-value">${item.growth}%</span>
                        </div>
                        <div class="bar-label">${item.area}</div>
                    </div>
                `).join('')}
            </div>
            <div class="chart-legend">
                <span class="legend-item">Land Value Appreciation</span>
            </div>
        `;

        // Add chart styles
        this.addChartStyles(chartContainer);
    }

    addChartStyles(container) {
        container.style.cssText = `
            .chart-header { text-align: center; margin-bottom: 2rem; }
            .chart-header h4 { color: var(--primary-600); }
            .chart-bars-container { 
                display: flex; 
                align-items: end; 
                justify-content: space-around; 
                height: 200px; 
                margin-bottom: 1rem; 
                padding: 0 1rem;
            }
            .chart-bar-group { 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                flex: 1;
                max-width: 60px;
            }
            .chart-bar { 
                width: 40px; 
                background: linear-gradient(to top, var(--primary-500), var(--accent-500)); 
                border-radius: 4px 4px 0 0; 
                position: relative;
                transition: all 0.6s ease;
                animation: growBar 1.5s ease-out forwards;
                transform-origin: bottom;
            }
            .bar-value { 
                position: absolute; 
                top: -25px; 
                left: 50%; 
                transform: translateX(-50%); 
                font-size: 0.75rem; 
                font-weight: 600; 
                color: var(--primary-600);
            }
            .bar-label { 
                margin-top: 0.5rem; 
                font-size: 0.75rem; 
                color: var(--neutral-600); 
                text-align: center;
                transform: rotate(-45deg);
                transform-origin: center;
            }
            .chart-legend { 
                text-align: center; 
                color: var(--neutral-600); 
                font-size: 0.875rem; 
            }
            @keyframes growBar {
                from { transform: scaleY(0); }
                to { transform: scaleY(1); }
            }
        `;
    }

    animateProgressCircles() {
        const circles = document.querySelectorAll('.progress-circle[data-progress]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.setProperty('--progress', progress);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        circles.forEach(circle => observer.observe(circle));
    }

    downloadMarketReport() {
        // Track conversion
        if (window.ConversionTracker) {
            window.ConversionTracker.track('market_report_download_clicked');
        }

        // Trigger brochure download modal
        if (window.brochureDownload) {
            window.brochureDownload.openModal({
                title: 'Download Market Analysis Report',
                description: 'Get comprehensive market insights and investment projections for Ibeju-Lekki'
            });
        }
    }

    // Investment Guide Section
    initializeInvestmentGuide() {
        this.initializeGuideTabs();
        this.initializeResourceDownloads();
    }

    initializeGuideTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Update button states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update panel states
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === `${targetTab}-panel`) {
                        panel.classList.add('active');
                    }
                });

                // Special handling for returns panel chart
                if (targetTab === 'returns') {
                    this.renderReturnsChart();
                }
            });
        });
    }

    renderReturnsChart() {
        const chartContainer = document.getElementById('returns-projection-chart');
        if (!chartContainer) return;

        const months = ['Month 0', 'Month 6', 'Month 12', 'Month 18', 'Month 24'];
        const scenarios = {
            conservative: [100, 140, 200, 280, 350],
            moderate: [100, 160, 250, 350, 500],
            optimistic: [100, 180, 300, 500, 750]
        };

        chartContainer.innerHTML = `
            <div class="returns-chart-container">
                <canvas id="returns-canvas" width="600" height="300"></canvas>
            </div>
        `;

        this.drawReturnsChart('returns-canvas', months, scenarios);
    }

    drawReturnsChart(canvasId, months, scenarios) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        // Calculate scales
        const maxValue = Math.max(...Object.values(scenarios).flat());
        const xStep = (width - padding * 2) / (months.length - 1);
        const yScale = (height - padding * 2) / maxValue;

        // Draw grid lines
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = height - padding - (i * (height - padding * 2) / 5);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
            
            // Y-axis labels
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(`${Math.round(i * maxValue / 5)}%`, padding - 10, y + 4);
        }

        // Draw scenario lines
        const colors = {
            conservative: '#10b981',
            moderate: '#3b82f6',
            optimistic: '#f59e0b'
        };

        Object.entries(scenarios).forEach(([scenario, values]) => {
            ctx.strokeStyle = colors[scenario];
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            values.forEach((value, index) => {
                const x = padding + index * xStep;
                const y = height - padding - value * yScale;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                // Draw data points
                ctx.fillStyle = colors[scenario];
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
            });
            
            ctx.stroke();
        });

        // Draw x-axis labels
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        months.forEach((month, index) => {
            const x = padding + index * xStep;
            ctx.fillText(month, x, height - padding + 20);
        });

        // Draw legend
        const legendY = 20;
        Object.entries(colors).forEach(([scenario, color], index) => {
            const x = padding + index * 120;
            
            ctx.fillStyle = color;
            ctx.fillRect(x, legendY, 15, 3);
            
            ctx.fillStyle = '#374151';
            ctx.font = '12px Inter';
            ctx.textAlign = 'left';
            ctx.fillText(scenario.charAt(0).toUpperCase() + scenario.slice(1), x + 20, legendY + 8);
        });
    }

    initializeResourceDownloads() {
        const resourceItems = document.querySelectorAll('.resource-item');
        
        resourceItems.forEach(item => {
            const downloadBtn = item.querySelector('.resource-download');
            const resourceType = item.dataset.resource;
            
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => {
                    this.downloadResource(resourceType, item);
                });
            }
        });
    }

    downloadResource(resourceType, itemElement) {
        // Track conversion
        if (window.ConversionTracker) {
            window.ConversionTracker.track('resource_download_clicked', { resource: resourceType });
        }

        // Get resource details
        const title = itemElement.querySelector('h4').textContent;
        const description = itemElement.querySelector('p').textContent;

        // Trigger brochure download modal with resource-specific content
        if (window.brochureDownload) {
            window.brochureDownload.openModal({
                title: `Download ${title}`,
                description: description
            });
        }

        // Animate download button
        const downloadBtn = itemElement.querySelector('.resource-download');
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            downloadBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            }, 2000);
        }, 1000);
    }

    // Payment Plans Section
    initializePaymentPlans() {
        this.initializePaymentCalculator();
        this.initializePlanCards();
    }

    initializePaymentCalculator() {
        const plotPriceSelect = document.getElementById('plot-price');
        const initialPaymentSlider = document.getElementById('initial-payment');
        const paymentDurationSelect = document.getElementById('payment-duration');

        if (!plotPriceSelect || !initialPaymentSlider || !paymentDurationSelect) return;

        const updateCalculation = () => {
            const plotPrice = parseInt(plotPriceSelect.value);
            const initialPercentage = parseInt(initialPaymentSlider.value);
            const duration = parseInt(paymentDurationSelect.value);

            const initialAmount = plotPrice * (initialPercentage / 100);
            const remainingAmount = plotPrice - initialAmount;
            const monthlyAmount = remainingAmount / duration;

            // Update display values
            document.getElementById('initial-amount').textContent = this.formatCurrency(initialAmount);
            document.getElementById('monthly-amount').textContent = this.formatCurrency(monthlyAmount);
            document.getElementById('total-amount').textContent = this.formatCurrency(plotPrice);

            // Update slider display
            document.querySelector('.slider-value').textContent = `${initialPercentage}%`;

            // Update payment timeline
            this.generatePaymentTimeline(initialAmount, monthlyAmount, duration);
        };

        // Event listeners
        plotPriceSelect.addEventListener('change', updateCalculation);
        initialPaymentSlider.addEventListener('input', updateCalculation);
        paymentDurationSelect.addEventListener('change', updateCalculation);

        // Initial calculation
        updateCalculation();
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    generatePaymentTimeline(initialAmount, monthlyAmount, duration) {
        const timelineContainer = document.getElementById('payment-timeline');
        if (!timelineContainer) return;

        let timeline = `
            <div class="timeline-header">
                <h4>Payment Schedule</h4>
            </div>
            <div class="timeline-payments">
        `;

        // Initial payment
        timeline += `
            <div class="payment-item initial">
                <div class="payment-date">Initial Payment</div>
                <div class="payment-amount">${this.formatCurrency(initialAmount)}</div>
                <div class="payment-status">Due on signing</div>
            </div>
        `;

        // Monthly payments
        for (let i = 1; i <= duration; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() + i);
            
            timeline += `
                <div class="payment-item">
                    <div class="payment-date">Month ${i}</div>
                    <div class="payment-amount">${this.formatCurrency(monthlyAmount)}</div>
                    <div class="payment-status">${date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</div>
                </div>
            `;
        }

        timeline += '</div>';
        timelineContainer.innerHTML = timeline;

        // Add timeline styles
        this.addTimelineStyles(timelineContainer);
    }

    addTimelineStyles(container) {
        const style = document.createElement('style');
        style.textContent = `
            .timeline-header { text-align: center; margin-bottom: 1.5rem; }
            .timeline-header h4 { color: var(--primary-600); }
            .timeline-payments { max-height: 300px; overflow-y: auto; }
            .payment-item { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 1rem; 
                border: 1px solid var(--neutral-200); 
                border-radius: 8px; 
                margin-bottom: 0.5rem;
                background: white;
            }
            .payment-item.initial { 
                background: var(--primary-50); 
                border-color: var(--primary-300); 
            }
            .payment-date { font-weight: 500; color: var(--neutral-700); }
            .payment-amount { font-weight: 600; color: var(--primary-600); }
            .payment-status { font-size: 0.875rem; color: var(--neutral-500); }
        `;
        
        if (!document.querySelector('#timeline-styles')) {
            style.id = 'timeline-styles';
            document.head.appendChild(style);
        }
    }

    initializePlanCards() {
        const planCards = document.querySelectorAll('.plan-card');
        
        planCards.forEach(card => {
            const ctaButton = card.querySelector('.plan-cta');
            if (ctaButton) {
                ctaButton.addEventListener('click', () => {
                    const planName = card.querySelector('h3').textContent;
                    this.selectPaymentPlan(planName);
                });
            }
        });
    }

    selectPaymentPlan(planName) {
        // Track conversion
        if (window.ConversionTracker) {
            window.ConversionTracker.track('payment_plan_selected', { plan: planName });
        }

        // Trigger property inquiry form with pre-selected plan
        if (window.propertyInquiry) {
            window.propertyInquiry.openModal({ selectedPlan: planName });
        }
    }

    // Legal Compliance Section
    initializeLegalCompliance() {
        const legalConsultationBtn = document.getElementById('legal-consultation');
        const downloadLegalGuideBtn = document.getElementById('download-legal-guide');

        if (legalConsultationBtn) {
            legalConsultationBtn.addEventListener('click', () => {
                if (window.consultationBooking) {
                    window.consultationBooking.openModal({
                        consultationType: 'legal',
                        title: 'Legal Consultation Booking'
                    });
                }
            });
        }

        if (downloadLegalGuideBtn) {
            downloadLegalGuideBtn.addEventListener('click', () => {
                if (window.brochureDownload) {
                    window.brochureDownload.openModal({
                        title: 'Download Legal Documentation Guide',
                        description: 'Complete guide to property documentation in Nigeria'
                    });
                }
            });
        }

        // Animate document verification icons
        this.animateDocumentVerification();
    }

    animateDocumentVerification() {
        const documentItems = document.querySelectorAll('.document-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        documentItems.forEach(item => observer.observe(item));
    }

    // Development Timeline Section
    initializeDevelopmentTimeline() {
        this.initializeTimelineTabs();
        this.animateTimeline();
    }

    initializeTimelineTabs() {
        const tabs = document.querySelectorAll('.timeline-tab');
        const panels = document.querySelectorAll('.timeline-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTimeline = tab.dataset.timeline;
                
                // Update tab states
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update panel states
                panels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === `${targetTimeline}-timeline`) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    animateTimeline() {
        const milestones = document.querySelectorAll('.milestone');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        milestones.forEach(milestone => observer.observe(milestone));
    }

    // FAQ Section
    initializeFAQ() {
        this.initializeFAQCategories();
        this.initializeFAQItems();
        this.initializeFAQActions();
    }

    initializeFAQCategories() {
        const categories = document.querySelectorAll('.faq-category');
        const panels = document.querySelectorAll('.faq-panel');

        categories.forEach(category => {
            category.addEventListener('click', () => {
                const targetCategory = category.dataset.category;
                
                // Update category states
                categories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');
                
                // Update panel states
                panels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === `${targetCategory}-faq`) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    initializeFAQItems() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
                
                // Track FAQ interaction
                if (window.ConversionTracker && !isActive) {
                    const questionText = question.querySelector('h4').textContent;
                    window.ConversionTracker.track('faq_question_opened', { question: questionText });
                }
            });
        });
    }

    initializeFAQActions() {
        const scheduleCallBtn = document.getElementById('schedule-expert-call');
        const submitQuestionBtn = document.getElementById('submit-question');

        if (scheduleCallBtn) {
            scheduleCallBtn.addEventListener('click', () => {
                if (window.consultationBooking) {
                    window.consultationBooking.openModal({
                        consultationType: 'expert-call',
                        title: 'Schedule Expert Call'
                    });
                }
            });
        }

        if (submitQuestionBtn) {
            submitQuestionBtn.addEventListener('click', () => {
                this.openQuestionSubmissionForm();
            });
        }
    }

    openQuestionSubmissionForm() {
        // Create a custom question submission modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Submit Your Question</h3>
                    <p>Our experts will respond within 24 hours</p>
                    <button class="modal-close" aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="question-form">
                        <div class="form-group">
                            <label>Your Name</label>
                            <input type="text" name="name" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone">
                        </div>
                        <div class="form-group">
                            <label>Your Question</label>
                            <textarea name="question" rows="4" required placeholder="Ask anything about Casa de Casablanca, investment process, legal requirements, etc."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select name="category">
                                <option value="general">General Information</option>
                                <option value="investment">Investment Details</option>
                                <option value="legal">Legal & Documentation</option>
                                <option value="payment">Payment Plans</option>
                                <option value="development">Development Timeline</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn--primary">
                            <i class="fas fa-paper-plane"></i>
                            Submit Question
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.classList.add('modal-open');

        // Handle form submission
        const form = modal.querySelector('#question-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitQuestion(new FormData(form), modal);
        });

        // Handle modal close
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        [closeBtn, overlay].forEach(element => {
            element.addEventListener('click', () => {
                modal.remove();
                document.body.classList.remove('modal-open');
            });
        });
    }

    async submitQuestion(formData, modal) {
        const submitBtn = modal.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            // Track conversion
            if (window.ConversionTracker) {
                window.ConversionTracker.track('question_submitted', { 
                    category: formData.get('category') 
                });
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            modal.querySelector('.modal-body').innerHTML = `
                <div class="success-message" style="text-align: center; padding: 2rem;">
                    <div class="success-icon" style="color: var(--accent-500); font-size: 4rem; margin-bottom: 1rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: var(--primary-600); margin-bottom: 1rem;">Question Submitted Successfully!</h3>
                    <p style="color: var(--neutral-600); margin-bottom: 2rem;">
                        Thank you for your question. Our investment experts will review it and respond within 24 hours via email.
                    </p>
                    <div class="success-actions">
                        <button class="btn btn--primary" onclick="this.closest('.modal').remove(); document.body.classList.remove('modal-open');">
                            Close
                        </button>
                    </div>
                </div>
            `;

        } catch (error) {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            alert('There was an error submitting your question. Please try again.');
        }
    }

    // Virtual Tour Section
    initializeVirtualTour() {
        this.initializeTourButtons();
        this.initializeSiteVisitBooking();
    }

    initializeTourButtons() {
        const startVRBtn = document.getElementById('start-vr-tour');
        const bookLiveBtn = document.getElementById('book-live-tour');
        const watchDroneBtn = document.getElementById('watch-drone-footage');

        if (startVRBtn) {
            startVRBtn.addEventListener('click', () => {
                this.startVRTour();
            });
        }

        if (bookLiveBtn) {
            bookLiveBtn.addEventListener('click', () => {
                this.bookLiveTour();
            });
        }

        if (watchDroneBtn) {
            watchDroneBtn.addEventListener('click', () => {
                this.watchDroneFootage();
            });
        }
    }

    startVRTour() {
        // Track conversion
        if (window.ConversionTracker) {
            window.ConversionTracker.track('vr_tour_started');
        }

        // Create VR tour modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content" style="max-width: 90vw; max-height: 90vh;">
                <div class="modal-header">
                    <h3>360° Virtual Reality Tour</h3>
                    <p>Immersive experience of Casa de Casablanca</p>
                    <button class="modal-close" aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <div class="modal-body" style="padding: 0; height: 70vh;">
                    <div class="vr-tour-container" style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary-600), var(--accent-600)); display: flex; align-items: center; justify-content: center; color: white; text-align: center;">
                        <div>
                            <div style="font-size: 4rem; margin-bottom: 1rem;">
                                <i class="fas fa-vr-cardboard"></i>
                            </div>
                            <h3>VR Tour Loading...</h3>
                            <p>Please wait while we prepare your immersive experience</p>
                            <div style="margin-top: 2rem;">
                                <div class="spinner" style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.classList.add('modal-open');

        // Simulate VR tour loading
        setTimeout(() => {
            const container = modal.querySelector('.vr-tour-container');
            container.innerHTML = `
                <div style="width: 100%; height: 100%; position: relative;">
                    <iframe 
                        src="https://example.com/vr-tour" 
                        style="width: 100%; height: 100%; border: none;"
                        allowfullscreen>
                    </iframe>
                    <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); padding: 1rem; border-radius: 8px;">
                        <p style="margin: 0; color: white; font-size: 0.875rem;">Use mouse to navigate • Click hotspots for more info</p>
                    </div>
                </div>
            `;
        }, 3000);

        // Handle modal close
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        [closeBtn, overlay].forEach(element => {
            element.addEventListener('click', () => {
                modal.remove();
                document.body.classList.remove('modal-open');
            });
        });
    }

    bookLiveTour() {
        if (window.consultationBooking) {
            window.consultationBooking.openModal({
                consultationType: 'live-tour',
                title: 'Book Live Video Tour'
            });
        }
    }

    watchDroneFootage() {
        // Track conversion
        if (window.ConversionTracker) {
            window.ConversionTracker.track('drone_footage_viewed');
        }

        // Create video modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content" style="max-width: 90vw;">
                <div class="modal-header">
                    <h3>Aerial Drone Footage</h3>
                    <p>4K aerial view of Casa de Casablanca and surroundings</p>
                    <button class="modal-close" aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <div class="modal-body" style="padding: 0;">
                    <div style="width: 100%; height: 400px; background: #000; position: relative;">
                        <video 
                            controls 
                            autoplay 
                            style="width: 100%; height: 100%; object-fit: cover;"
                            poster="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80">
                            <source src="drone-footage.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.classList.add('modal-open');

        // Handle modal close
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        [closeBtn, overlay].forEach(element => {
            element.addEventListener('click', () => {
                modal.remove();
                document.body.classList.remove('modal-open');
            });
        });
    }

    initializeSiteVisitBooking() {
        const bookSiteVisitBtn = document.getElementById('book-site-visit');
        
        if (bookSiteVisitBtn) {
            bookSiteVisitBtn.addEventListener('click', () => {
                if (window.consultationBooking) {
                    window.consultationBooking.openModal({
                        consultationType: 'site-visit',
                        title: 'Book Site Visit'
                    });
                }
            });
        }
    }

    // Blog/Insights Section (SEO focused)
    initializeBlogInsights() {
        // This would typically load blog content dynamically
        // For now, we'll add some SEO-focused content structure
        this.createSEOContent();
    }

    createSEOContent() {
        // Add structured data for blog content
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Casa de Casablanca Investment Insights",
            "description": "Expert insights on real estate investment in Ibeju-Lekki and Nigeria",
            "url": "https://casadecasablanca.com/insights",
            "blogPost": [
                {
                    "@type": "BlogPosting",
                    "headline": "Why Ibeju-Lekki is Nigeria's Smartest Investment Right Now",
                    "description": "Data-driven analysis of Ibeju-Lekki's investment potential",
                    "datePublished": "2024-01-15",
                    "author": {
                        "@type": "Organization",
                        "name": "Casa de Casablanca"
                    }
                }
            ]
        };

        // Add to page
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentSectionsController();
});

// Safety guard: ensure no modal is accidentally open on initial load
document.addEventListener('DOMContentLoaded', () => {
    // Detect any modals that are present and active at load
    const openedModals = document.querySelectorAll('.modal.active, .download-modal.active, .booking-modal.active, .popup.active');
    if (openedModals.length) {
        console.warn('[safety-guard] Found', openedModals.length, 'active modal(s) at DOMContentLoaded:');
        openedModals.forEach((m, i) => {
            const info = {
                index: i,
                tag: m.tagName.toLowerCase(),
                id: m.id || null,
                classes: Array.from(m.classList || []),
                snippet: (m.innerHTML || '').trim().slice(0, 120).replace(/\s+/g, ' ') + (m.innerHTML.length > 120 ? '...' : '')
            };
            console.groupCollapsed(`[safety-guard] modal #${i} (${info.tag}${info.id ? `#${info.id}` : ''})`);
            console.log('classes:', info.classes);
            console.log('content snippet:', info.snippet);
            console.groupEnd();

            try {
                // Remove modal element from DOM to avoid accidental overlay
                m.remove();
            } catch (e) {
                // fallback: hide it
                m.classList.remove('active');
                m.style.display = 'none';
            }
        });
    }

    // Clear modal-related body classes
    document.body.classList.remove('modal-open', 'popup-open', 'menu-open');
});

// Export for global access
window.ContentSections = ContentSectionsController;
