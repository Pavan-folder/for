# CuraLink Design Guidelines

## Design Approach

**Selected System: Material Design 3 with Healthcare Optimization**

Rationale: CuraLink requires a design system that handles information density while maintaining accessibility and trust. Material Design 3 provides excellent patterns for data-heavy interfaces, clear hierarchy, and professional aesthetics suitable for healthcare contexts. The system's emphasis on usability aligns with the dual-audience nature (patients and researchers) while maintaining a modern, approachable feel inspired by Duolingo's clarity.

## Core Design Principles

1. **Dual Identity**: Maintain visual consistency while subtly differentiating patient and researcher experiences
2. **Information Clarity**: Prioritize readability and comprehension of complex medical/research data
3. **Trust & Professionalism**: Healthcare context demands credible, reliable visual design
4. **Guided Simplicity**: Complex functionality presented through intuitive, step-by-step flows

## Typography System

**Font Families:**
- Primary: Inter (headings, UI elements) - Clean, highly readable, professional
- Secondary: Source Sans Pro (body text, data) - Excellent for dense information
- Accent: DM Sans (CTAs, highlights) - Friendly, approachable for patient-facing elements

**Type Scale:**
- Hero Headlines: 48px/56px (font-bold)
- Section Headers: 32px/40px (font-semibold)
- Card Titles: 20px/28px (font-semibold)
- Body Text: 16px/24px (font-normal)
- Metadata/Captions: 14px/20px (font-normal)
- Small Text: 12px/16px (font-medium)

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, and 16 consistently
- Micro spacing: p-2, gap-2 (8px)
- Standard spacing: p-4, gap-4 (16px)
- Section padding: p-6, p-8 (24px, 32px)
- Large sections: p-12, p-16 (48px, 64px)

**Container Strategy:**
- Full-width sections: max-w-7xl mx-auto
- Content sections: max-w-6xl mx-auto
- Reading content: max-w-4xl mx-auto
- Forms/inputs: max-w-2xl mx-auto

**Grid Systems:**
- Desktop: 12-column grid with gap-6
- Tablet: 8-column grid with gap-4
- Mobile: 4-column grid with gap-4

## Component Library

### Landing Page Components

**Hero Section (Duolingo-Inspired):**
- Clean, centered layout with minimal distractions
- Hero height: 85vh for impact, allowing glimpse of content below
- Large, friendly headline with supporting subtext
- Two prominent CTA buttons (Patient/Researcher paths) with generous spacing
- Soft, abstract medical/connection illustration (not literal medical imagery)
- Background: Subtle gradient or solid with decorative geometric elements

**Value Proposition Sections:**
- 3-column feature cards (2-column on tablet, 1-column mobile)
- Icon + Title + Description pattern
- Use Heroicons for consistent iconography
- Card styling: Soft shadows, rounded-2xl borders, p-6 padding

**How It Works:**
- Step-by-step visual flow (3-4 steps)
- Numbered circles with connecting lines
- Each step: Icon + Title + Brief description
- Horizontal layout on desktop, vertical stack on mobile

### Dashboard Components

**Navigation:**
- Persistent sidebar (desktop): w-64, fixed positioning
- Collapsible hamburger menu (mobile/tablet)
- Clear section icons with labels
- Active state highlighting with subtle background

**Dashboard Grid:**
- Modular card-based layout
- Primary cards: Larger 2-column spans for key content
- Secondary cards: 1-column for supporting information
- Stats/metrics: 4-column grid (responsive down to 2, then 1)

**Information Cards:**
- Clean white cards with rounded-xl borders
- Subtle shadow (shadow-sm to shadow-md)
- Padding: p-6 for content cards
- Header area with title + action buttons
- Content area with appropriate spacing
- Footer with metadata/timestamps

### Search & Discovery Components

**Search Interface:**
- Prominent search bar: Large input (h-12), full-width on mobile
- Filter sidebar: Fixed position on desktop (w-72), drawer on mobile
- Results grid: 2-column cards on desktop, 1-column mobile
- Empty states: Centered illustration + helpful text

**Clinical Trials Cards:**
- Prominent trial title (text-xl, font-semibold)
- Status badge (recruiting/completed) with pill styling
- Key details in scannable format (list with icons)
- Location, phase, dates clearly visible
- Primary action button (Apply/Learn More)
- AI summary expandable section

**Publication Cards:**
- Article title (text-lg, font-semibold, line-clamp-2)
- Authors list (text-sm, truncated)
- Journal name + publication date
- Abstract preview (line-clamp-3 with "Read more")
- Link to external source button
- Save to favorites icon button

**Expert/Collaborator Profiles:**
- Avatar image (circular, w-16 h-16)
- Name + credentials (text-lg, font-semibold)
- Specialties as pill badges
- Brief bio (line-clamp-2)
- Research interests as tags
- Action buttons: Follow, Request Meeting, View Profile

### Forum Components

**Category Cards:**
- Grid layout: 3-column desktop, 2-column tablet, 1-column mobile
- Icon + category name + post count
- Recent activity indicator
- Subtle hover elevation

**Discussion Threads:**
- Avatar + username + timestamp header
- Post content with proper formatting
- Reply count + last activity metadata
- Researcher badge for verified researchers
- Upvote/save functionality with icons

### Forms & Onboarding

**Multi-Step Forms:**
- Progress indicator at top (step 1 of 3)
- Large, clear input fields (h-12)
- Labels above inputs (font-medium, text-sm)
- Helpful placeholder text
- Inline validation with icons
- Generous spacing between fields (space-y-6)
- Primary action button: Full-width on mobile, auto on desktop

**Condition Input (Patient):**
- Natural language textarea (min-h-32)
- AI processing indicator
- Suggested conditions as clickable pills
- "Add more conditions" button

**Profile Builder (Researcher):**
- Structured form with clear sections
- Optional ORCID/ResearchGate integration cards
- Specialty multi-select with search
- Research interests tag input
- Availability toggle switch

### Interactive Elements

**Buttons:**
- Primary: Filled, rounded-lg, px-6 py-3, font-medium
- Secondary: Outlined, rounded-lg, px-6 py-3
- Ghost: Text-only with hover background
- Icon buttons: Circular, p-2, with subtle hover states
- Blurred backgrounds when overlaying images

**Badges & Pills:**
- Status indicators: Small rounded-full pills
- Tags: rounded-md with light backgrounds
- Notification badges: Circular with count

**Modals & Overlays:**
- Center-aligned with backdrop blur
- Max-width constraints (max-w-2xl)
- Close button in top-right
- Padding: p-6 to p-8
- Actions aligned to bottom-right

## Images Strategy

**Hero Image:**
- Abstract illustration showing connection/networking concept
- Professional but approachable style
- Placed on right side of hero text (50/50 split on desktop)
- Collapses below text on mobile

**Supporting Images:**
- Expert profile photos: Real, professional headshots
- Publication thumbnails: Journal covers or abstract graphics
- Empty states: Friendly illustrations with helpful messaging
- Forum avatars: User-generated or default circular avatars

**Image Treatment:**
- Rounded corners (rounded-lg to rounded-2xl)
- Consistent aspect ratios (16:9 for cards, 1:1 for avatars)
- Subtle shadows for depth
- Lazy loading for performance

## Visual Hierarchy & Patterns

**Information Density Management:**
- Use collapsible sections for detailed content
- "Show more" patterns for long lists
- Tabs for organizing related content
- Clear visual grouping with subtle backgrounds

**Scannable Data:**
- Icon + label patterns for metadata
- Consistent spacing between data points
- Use of visual separators (subtle borders)
- Highlight critical information with weight/size

**Trust Indicators:**
- Verified badges for researchers on platform
- Source attribution for external data
- Clear timestamps for all content
- Security icons for sensitive actions

**Responsive Breakpoints:**
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grids, drawer navigation)
- Desktop: > 1024px (full multi-column, sidebar navigation)

## Accessibility & Usability

- Minimum touch target: 44x44px
- WCAG AA contrast ratios throughout
- Clear focus states for keyboard navigation
- Loading states for all async operations
- Error messages with clear remediation steps
- Consistent icon usage across platform

This design system balances medical professionalism with approachable usability, ensuring both patients and researchers can efficiently navigate complex information while feeling supported and confident in the platform.