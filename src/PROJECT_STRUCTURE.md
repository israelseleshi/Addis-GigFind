# Addis GigFind - Project Structure

## Overview
A professional gig marketplace platform for Addis Ababa, Ethiopia. Built with React, TypeScript, Tailwind CSS, and Shadcn UI components.

## Directory Structure

```
/
├── App.tsx                 # Main application router
├── pages/                  # All page components
│   ├── HomePage.tsx        # Landing page with hero, features, testimonials
│   ├── AuthPage.tsx        # Sign in / Sign up page
│   ├── FreelancerDashboardPage.tsx  # Freelancer dashboard with gig browsing
│   ├── ClientDashboardPage.tsx      # Client dashboard with gig posting
│   ├── GigDetailsPage.tsx  # Detailed gig view with application form
│   ├── MessagingPage.tsx   # Chat interface
│   ├── ProfilePage.tsx     # User profile page
│   └── RatingPage.tsx      # Rating and review submission
├── components/             # Reusable components
│   ├── Navbar.tsx          # Top navigation bar
│   ├── Footer.tsx          # Footer component
│   ├── GigCard.tsx         # Reusable gig card component
│   └── ui/                 # Shadcn UI components
├── lib/
│   └── data.ts             # Mock data and types
└── styles/
    └── globals.css         # Global styles with DM Sans font
```

## Pages

### 1. HomePage (`/pages/HomePage.tsx`)
- **Hero section** with search bar
- **How It Works** section
- **Popular Categories** grid
- **Why Choose Us** features
- **Testimonials** carousel
- **CTA section** with sign-up buttons
- **Footer**

### 2. AuthPage (`/pages/AuthPage.tsx`)
- **Sign In / Sign Up** tabs
- **Role selection** (Freelancer vs Client)
- **Split-screen** layout with brand messaging
- **Form validation** ready

### 3. FreelancerDashboardPage (`/pages/FreelancerDashboardPage.tsx`)
- **Browse gigs** with filters (category, location, budget)
- **Quick stats** sidebar
- **My Applications** tab
- **Active Gigs** tab
- **Search** functionality

### 4. ClientDashboardPage (`/pages/ClientDashboardPage.tsx`)
- **Post a gig** modal form
- **Active gigs** management
- **View applications** per gig
- **Quick stats** sidebar
- **Completed & Draft** tabs

### 5. GigDetailsPage (`/pages/GigDetailsPage.tsx`)
- **Full gig description**
- **Skills required**
- **Application form** with cover letter
- **Client information** card
- **Budget** display
- **Reviews** section

### 6. MessagingPage (`/pages/MessagingPage.tsx`)
- **Conversation list** sidebar
- **Real-time chat** interface
- **Message input** with file attachment
- **WhatsApp-style** design

### 7. ProfilePage (`/pages/ProfilePage.tsx`)
- **Profile card** with avatar, rating, stats
- **About Me** section
- **Skills** badges (for freelancers)
- **Past Work / Posted Gigs** tabs
- **Reviews** from clients

### 8. RatingPage (`/pages/RatingPage.tsx`)
- **Star rating** selector (1-5)
- **Written review** textarea
- **Review guidelines**
- **Submit** confirmation

## Components

### Reusable Components
- **Navbar** - Responsive navigation with auth state
- **Footer** - Footer with links and branding
- **GigCard** - Displays gig summary with CTA buttons

## Design System

### Colors
- **Primary**: `#FFB300` (Warm Amber)
- **Secondary**: `#0A2239` (Deep Navy)
- **Success**: `#2ECC71` (Green)
- **Destructive**: `#E74C3C` (Red)
- **Muted**: `#F5F5F5` (Light Gray)

### Typography
- **Font Family**: DM Sans (Google Fonts)
- **Default sizes** set in `globals.css`

### Spacing
- **Container**: Responsive with `px-4 sm:px-6 lg:px-8`
- **Sections**: Consistent `py-20` padding
- **Cards**: Rounded corners with `shadow-md` or `shadow-lg`

## Navigation Flow

```
HomePage
  ├─> AuthPage
  │     ├─> FreelancerDashboardPage
  │     └─> ClientDashboardPage
  │
  ├─> FreelancerDashboardPage
  │     ├─> GigDetailsPage
  │     ├─> MessagingPage
  │     ├─> ProfilePage
  │     └─> RatingPage
  │
  └─> ClientDashboardPage
        ├─> GigDetailsPage
        ├─> MessagingPage
        ├─> ProfilePage
        └─> RatingPage
```

## Key Features

✅ Multi-page structure with clean separation of concerns  
✅ Fully responsive design (mobile-first)  
✅ Ethiopian cultural branding  
✅ Advanced filtering system  
✅ Real-time messaging UI  
✅ Rating and review system  
✅ Mock data for development  
✅ TypeScript for type safety  
✅ Shadcn UI components  
✅ DM Sans typography  

## Next Steps

1. **Connect to backend** API (Supabase recommended)
2. **Add authentication** (email/password, phone)
3. **Implement real-time** messaging (WebSocket)
4. **Payment integration** (local Ethiopian payment gateways)
5. **Image uploads** for profiles and portfolios
6. **Search optimization** with debouncing
7. **Notification system**
8. **Email templates** for confirmations
9. **Analytics tracking**
10. **Localization** (Amharic support)

---

**Project documentation completed.**
