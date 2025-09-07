# Tom Casa Properties - Real Estate Website

A modern, responsive real estate website showcasing premium properties in Casablanca, Morocco. Built with vanilla HTML, CSS, and JavaScript with a mobile-first approach.

## 🏗️ Project Structure

```
Tom real estate/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Comprehensive CSS with responsive design
├── js/
│   └── main.js             # Interactive JavaScript functionality
├── assets/
│   ├── README.md           # Asset guidelines and requirements
│   └── [images]            # Project images and media files
└── README.md              # This file
```

## ✨ Features

### 🎯 Core Sections
- **Header with Sticky Navigation** - Smooth scrolling, mobile-responsive menu
- **Hero Section** - Compelling value proposition with animated statistics
- **Featured Project** - Interactive Casa de Casablanca showcase
- **Investment Tools** - Real-time ROI calculator and market insights
- **About Company** - Trust indicators and company values
- **Testimonials** - Client success stories with ratings
- **Location Advantages** - Why Casablanca for investment
- **Contact Form** - Professional contact with validation
- **Footer** - Comprehensive site links and information

### 🚀 Interactive Features
- **Property Showcase Gallery** - Image carousel with thumbnails
- **ROI Calculator** - Real-time investment calculations
- **Smooth Scrolling Navigation** - Enhanced user experience
- **Breadcrumb Navigation** - Dynamic breadcrumbs for better UX
- **Contact Form Validation** - Client-side form validation
- **Responsive Design** - Mobile-first approach
- **Accessibility Features** - WCAG compliant
- **Loading States** - Enhanced user feedback
- **Notification System** - User-friendly alerts

## 🎨 Design Features

### Mobile-First Responsive Design
- **Breakpoints**: 576px, 768px, 1024px, 1200px
- **Grid System**: CSS Grid and Flexbox
- **Typography**: Responsive font scaling
- **Touch-Friendly**: Optimized for mobile interactions

### Modern UI/UX
- **Color Scheme**: Professional green and gold palette
- **Typography**: Playfair Display + Inter font combination
- **Animations**: Smooth transitions and hover effects
- **Cards**: Modern card-based layout
- **Buttons**: Interactive button states
- **Forms**: Floating labels and modern inputs

## 🛠️ Technical Implementation

### Performance Optimizations
- **Throttled Scroll Events** - Optimized scroll performance
- **Lazy Loading** - Images load as needed
- **CSS Grid/Flexbox** - Modern layout techniques
- **Minimal Dependencies** - Vanilla JavaScript approach
- **Optimized Images** - Compressed and properly sized

### Accessibility
- **Semantic HTML** - Proper document structure
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus handling
- **High Contrast Support** - Enhanced visibility options

### Browser Compatibility
- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Progressive Enhancement** - Graceful degradation
- **CSS Custom Properties** - Modern CSS features
- **ES6+ JavaScript** - Modern JavaScript features

## 📱 Responsive Breakpoints

```css
/* Mobile First (default) */
/* Small devices: 576px and up */
/* Medium devices: 768px and up */
/* Large devices: 1024px and up */
/* Extra large: 1200px and up */
```

## 🎯 Key Sections Explained

### Hero Section
- Compelling value proposition
- Animated statistics (150+ properties, 98% satisfaction, 15+ years)
- Call-to-action buttons
- Hero image with price overlay

### Featured Project - Casa de Casablanca
- Interactive image gallery with thumbnails
- Property details and features
- Amenities showcase
- Action buttons (schedule viewing, download brochure)

### Investment Calculator
- Real-time ROI calculations
- Property value, down payment, rental income inputs
- Monthly cash flow and annual ROI display
- 10-year projected value

### Trust Indicators
- Industry certifications
- Client satisfaction metrics
- Awards and recognition
- Security and support features

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Web server (for local development)
- Image assets (see assets/README.md)

### Installation
1. Clone or download the project files
2. Add required images to the `assets/` folder
3. Serve the files using a local web server
4. Open `index.html` in your browser

### Local Development
```bash
# Using Python (if available)
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Using PHP (if available)
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📋 Required Assets

See `assets/README.md` for detailed asset requirements including:
- Logo files (PNG format)
- Property images (high-resolution)
- Team photos
- Client testimonials photos
- Location/map images

## 🔧 Customization

### Colors
Update CSS custom properties in `:root`:
```css
:root {
  --primary-color: #2c5530;
  --accent-color: #d4af37;
  /* ... other colors */
}
```

### Typography
Fonts are loaded from Google Fonts:
- **Headings**: Playfair Display
- **Body**: Inter

### Content
Update the HTML content in `index.html`:
- Company information
- Property details
- Contact information
- Testimonials

## 📊 Analytics & Tracking

The website includes placeholder functions for analytics tracking:
- Event tracking for user interactions
- Contact form submissions
- Property viewing requests
- Calculator usage

Integrate with your preferred analytics service (Google Analytics, etc.).

## 🔒 Security Considerations

### Form Security
- Client-side validation (implement server-side as well)
- Sanitize all user inputs
- CSRF protection for forms
- Rate limiting for submissions

### General Security
- Use HTTPS in production
- Validate all external resources
- Implement Content Security Policy
- Regular security updates

## 🌐 SEO Features

- **Semantic HTML** - Proper heading hierarchy
- **Meta Tags** - Title, description, keywords
- **Open Graph** - Social media sharing
- **Schema Markup** - Structured data (implement as needed)
- **Fast Loading** - Optimized performance
- **Mobile-Friendly** - Responsive design

## 📈 Performance Metrics

Target performance goals:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.0s

## 🐛 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 📞 Support

For questions or support regarding this website:
- Email: info@tomcasaproperties.com
- Phone: +212 522 123 456

## 📄 License

This project is created for Tom Casa Properties. All rights reserved.

## 🚀 Deployment

### Production Checklist
- [ ] Add real images to assets folder
- [ ] Update contact information
- [ ] Configure analytics tracking
- [ ] Set up form handling backend
- [ ] Optimize images for web
- [ ] Test on multiple devices
- [ ] Validate HTML/CSS
- [ ] Test accessibility
- [ ] Set up HTTPS
- [ ] Configure CDN (if needed)

### Hosting Recommendations
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Traditional Hosting**: Any web hosting provider
- **CDN**: Cloudflare for global performance

---

**Built with ❤️ for Tom Casa Properties**
*Creating exceptional real estate experiences in Morocco*
