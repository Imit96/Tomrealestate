# Modern Design System Documentation
## Premium Real Estate Website Design System

---

## 🎨 **Color Palette**

### Primary Colors - Deep Forest Green (Trust & Growth)
- **Primary 50:** `#f0f9f0` - Lightest tint
- **Primary 500:** `#1e5631` - Main primary color
- **Primary 900:** `#0f2818` - Darkest shade

*Psychological Impact:* Conveys growth, stability, prosperity, and trust.

### Secondary Colors - Warm Navy (Professionalism)
- **Secondary 50:** `#f1f5f9` - Lightest tint
- **Secondary 500:** `#2c4866` - Main secondary color
- **Secondary 900:** `#152530` - Darkest shade

*Psychological Impact:* Professional, trustworthy, sophisticated, and dependable.

### Accent Colors - Refined Gold (Luxury & Opportunity)
- **Accent 50:** `#fffdf7` - Lightest tint
- **Accent 500:** `#c49a00` - Main accent color
- **Accent 900:** `#5c3f00` - Darkest shade

*Psychological Impact:* Luxury, opportunity, success, and premium quality.

### Neutral Colors - Modern Grays
- **Neutral 50:** `#fafafa` - Background
- **Neutral 500:** `#737373` - Mid-tone
- **Neutral 900:** `#171717` - Text

### Semantic Colors
- **Success:** `#16a34a` - Confirmations, success states
- **Warning:** `#eab308` - Cautions, warnings
- **Error:** `#dc2626` - Errors, destructive actions
- **Info:** `#0ea5e9` - Information, helpful tips

---

## 📝 **Typography System**

### Font Families
- **Display Font:** `Inter` - Modern, clean, professional
- **Body Font:** `Inter` - Excellent readability, versatile
- **Monospace:** `SF Mono` - Numbers, code, technical data

### Font Scale (Fluid Typography)
```css
--text-xs: clamp(0.75rem, 0.8vw, 0.875rem)    /* 12-14px */
--text-sm: clamp(0.875rem, 1vw, 1rem)         /* 14-16px */
--text-base: clamp(1rem, 1.2vw, 1.125rem)     /* 16-18px */
--text-lg: clamp(1.125rem, 1.4vw, 1.25rem)    /* 18-20px */
--text-xl: clamp(1.25rem, 1.6vw, 1.5rem)      /* 20-24px */
--text-2xl: clamp(1.5rem, 2vw, 1.875rem)      /* 24-30px */
--text-3xl: clamp(1.875rem, 2.5vw, 2.25rem)   /* 30-36px */
--text-4xl: clamp(2.25rem, 3vw, 3rem)         /* 36-48px */
--text-5xl: clamp(3rem, 4vw, 4rem)            /* 48-64px */
--text-6xl: clamp(4rem, 5vw, 6rem)            /* 64-96px */
```

### Font Weights
- **Light:** 300 - Elegant, minimalist text
- **Normal:** 400 - Standard body text
- **Medium:** 500 - Emphasis, subtle boldness
- **Semibold:** 600 - Headings, important text
- **Bold:** 700 - Strong emphasis, primary headings
- **Extrabold:** 800 - Display headings
- **Black:** 900 - Hero text, major impact

### Line Heights
- **Tight:** 1.25 - Large headings
- **Snug:** 1.375 - Subheadings
- **Normal:** 1.5 - Body text
- **Relaxed:** 1.625 - Long-form content

---

## 🎯 **Component Library**

### Button System

#### Primary Buttons
```css
.btn-primary     /* Main call-to-action */
.btn-secondary   /* Secondary actions */
.btn-accent      /* Luxury/premium actions */
```

#### Button Variants
```css
.btn-outline-primary    /* Outline style */
.btn-ghost             /* Minimal style */
.btn-urgent            /* Time-sensitive CTA */
.btn-luxury            /* Premium/exclusive */
```

#### Button Sizes
```css
.btn-xs    /* Compact buttons */
.btn-sm    /* Small buttons */
.btn       /* Default size */
.btn-lg    /* Large buttons */
.btn-xl    /* Extra large buttons */
```

#### Interactive States
- **Hover:** Lift effect (-2px to -4px translateY)
- **Focus:** Outlined focus ring
- **Active:** Pressed state
- **Disabled:** Reduced opacity, no interaction

### Card System

#### Card Types
```css
.card           /* Base card */
.card-elevated  /* Floating appearance */
.card-luxury    /* Premium gold accent */
.property-card  /* Real estate specific */
```

#### Card Components
```css
.card-header    /* Top section */
.card-body      /* Main content */
.card-footer    /* Bottom actions */
.card-image     /* Hero image */
```

### Form System

#### Form Layout
```css
.form           /* Base form container */
.form-row       /* Horizontal grouping */
.form-group     /* Field grouping */
```

#### Input Types
```css
.form-input     /* Text inputs */
.form-select    /* Dropdown selects */
.form-textarea  /* Multi-line text */
.form-checkbox  /* Checkbox inputs */
.form-radio     /* Radio buttons */
```

#### Form States
```css
.error          /* Error state */
.success        /* Success state */
.disabled       /* Disabled state */
```

---

## 🎬 **Animation Guidelines**

### Duration Scale
- **Fast:** 75-150ms - Micro-interactions
- **Medium:** 200-300ms - Standard transitions
- **Slow:** 500-700ms - Complex animations
- **Extra Slow:** 1000ms+ - Dramatic effects

### Easing Functions
```css
--ease-linear     /* Constant speed */
--ease-in         /* Starts slow */
--ease-out        /* Ends slow */
--ease-in-out     /* Slow start and end */
--ease-bounce     /* Playful bounce */
--ease-smooth     /* Natural feeling */
```

### Animation Types

#### Hover Effects
```css
.hover-lift      /* Lift on hover */
.hover-scale     /* Scale on hover */
.hover-glow      /* Glow effect */
```

#### Entrance Animations
```css
.animate-fade-in     /* Fade in */
.animate-slide-up    /* Slide up */
.animate-scale-in    /* Scale in */
```

#### Continuous Animations
```css
.animate-bounce      /* Bouncing */
.animate-float       /* Floating */
.animate-pulse       /* Pulsing */
```

#### Stagger Animations
```css
.stagger-children    /* Sequential animation */
```

---

## 📐 **Layout Grid System**

### Container Sizes
```css
--container-xs: 20rem     /* 320px */
--container-sm: 24rem     /* 384px */
--container-md: 28rem     /* 448px */
--container-lg: 32rem     /* 512px */
--container-xl: 36rem     /* 576px */
--container-2xl: 42rem    /* 672px */
--container-3xl: 48rem    /* 768px */
--container-4xl: 56rem    /* 896px */
--container-5xl: 64rem    /* 1024px */
--container-6xl: 72rem    /* 1152px */
--container-7xl: 80rem    /* 1280px */
```

### Grid System
```css
.grid-cols-1     /* Single column */
.grid-cols-2     /* Two columns */
.grid-cols-3     /* Three columns */
.grid-cols-4     /* Four columns */
.grid-cols-6     /* Six columns */
.grid-cols-12    /* Twelve columns */
```

### Spacing Scale
Based on 4px increments for perfect pixel alignment:
```css
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-3: 0.75rem    /* 12px */
--space-4: 1rem       /* 16px */
--space-5: 1.25rem    /* 20px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
--space-24: 6rem      /* 96px */
--space-32: 8rem      /* 128px */
```

---

## 📱 **Responsive Breakpoints**

### Mobile-First Approach
```css
/* Mobile Default: 0px+ */
/* Small: 640px+ */
/* Medium: 768px+ */
/* Large: 1024px+ */
/* XL: 1280px+ */
/* 2XL: 1536px+ */
```

### Responsive Utilities
```css
.grid-cols-sm-2     /* 2 cols on small+ */
.grid-cols-md-3     /* 3 cols on medium+ */
.grid-cols-lg-4     /* 4 cols on large+ */
```

---

## 🎨 **Design Principles**

### Trust
- Clean, uncluttered layouts
- Consistent spacing and alignment
- Professional color palette
- Subtle, purposeful animations

### Luxury
- Premium color combinations
- Refined typography
- Elegant hover effects
- Sophisticated gradients

### Growth
- Dynamic upward animations
- Progress indicators
- Success state feedback
- Forward-looking messaging

### Opportunity
- Attention-grabbing accents
- Urgent call-to-actions
- Time-sensitive indicators
- Exclusive availability messaging

### Professionalism
- Corporate color scheme
- Structured layouts
- Business-appropriate interactions
- Industry-standard patterns

---

## 🔧 **Implementation Guidelines**

### CSS Architecture
1. **Design Tokens:** All values defined as CSS custom properties
2. **Component-Based:** Modular, reusable components
3. **Utility-First:** Utility classes for rapid development
4. **Mobile-First:** Responsive design from smallest screen up

### Performance Considerations
- Fluid typography reduces layout shifts
- Hardware-accelerated animations (transform, opacity)
- Efficient CSS selectors
- Minimal DOM manipulation

### Accessibility Features
- Focus indicators on all interactive elements
- High contrast mode support
- Semantic HTML structure
- Screen reader friendly animations

### Browser Support
- Modern browsers (Chrome 90+, Firefox 90+, Safari 14+)
- CSS Grid and Flexbox support required
- CSS Custom Properties support required
- Progressive enhancement for older browsers

---

## 🎯 **Usage Examples**

### Creating a Premium Property Card
```html
<div class="card card-luxury property-card hover-lift">
    <img src="property.jpg" class="card-image" alt="Property">
    <div class="property-badge">Exclusive</div>
    <div class="property-price">
        <span class="text-2xl font-bold">₦50M</span>
        <span class="text-sm">Premium Plot</span>
    </div>
    <div class="card-body">
        <h3 class="card-title">Casa de Casablanca</h3>
        <p class="card-text">Prime location in Ibeju-Lekki</p>
        <button class="btn btn-luxury btn-full mt-4">
            Reserve Now
        </button>
    </div>
</div>
```

### Creating an Urgent CTA Section
```html
<section class="section bg-gradient-luxury text-inverse">
    <div class="container">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-3xl font-bold mb-2">
                    Only 24 Plots Remaining
                </h3>
                <p class="text-lg opacity-90">
                    Secure your investment before public release
                </p>
            </div>
            <button class="btn btn-urgent btn-lg animate-bounce">
                <i class="fas fa-lock"></i>
                Reserve Now
            </button>
        </div>
    </div>
</section>
```

This design system creates a cohesive, professional, and luxurious experience that builds trust while highlighting opportunities for high-net-worth investors in premium real estate.
