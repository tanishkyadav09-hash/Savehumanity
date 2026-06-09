# SaveHumanity - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Razorpay account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/tanishkyadav09-hash/savehumanity.git
cd savehumanity
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Frontend Setup**
```bash
cd frontend
cp .env.example .env.local
# Update .env.local with your credentials
npm run dev
```

4. **Backend Setup**
```bash
cd backend
cp .env.example .env
# Update .env with your credentials
npm run dev
```

## 📋 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/savehumanity
JWT_SECRET=your_super_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🏗️ Project Structure

```
savehumanity/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # React components
│   │   ├── styles/           # Global styles
│   │   └── lib/              # Utilities
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/           # MongoDB schemas
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   └── index.js          # Server entry
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `POST /api/volunteers/register` - Register volunteer
- `GET /api/volunteers/:id` - Get volunteer details
- `PATCH /api/volunteers/:id/approve` - Approve volunteer (admin)
- `PATCH /api/volunteers/:id/reject` - Reject volunteer (admin)

### Donations
- `POST /api/donations` - Create donation
- `GET /api/donations/stats` - Get donation statistics
- `POST /api/donations/razorpay/init` - Initialize Razorpay payment
- `POST /api/donations/razorpay/verify` - Verify Razorpay payment

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin)
- `GET /api/events/:id` - Get event details
- `POST /api/events/:id/register` - Register for event

### Gallery
- `GET /api/gallery` - Get all media
- `POST /api/gallery/upload` - Upload media
- `GET /api/gallery/:id` - Get media details
- `POST /api/gallery/:id/like` - Like media

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get messages (admin)
- `POST /api/contact/:id/respond` - Respond to message (admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data
- `GET /api/admin/settings` - Get settings
- `POST /api/admin/settings` - Update settings
- `PUT /api/admin/counters` - Update impact counters

## 🎨 Features

### Frontend
- ✅ Premium dark theme with neon green accents
- ✅ Smooth animations with Framer Motion & GSAP
- ✅ Responsive mobile-first design
- ✅ Real-time impact counters
- ✅ Volunteer registration form
- ✅ Donation system UI
- ✅ Gallery with lightbox
- ✅ Contact form
- ✅ SEO optimized

### Backend
- ✅ JWT authentication
- ✅ MongoDB integration
- ✅ Razorpay payment processing
- ✅ Email notifications
- ✅ Admin dashboard
- ✅ Volunteer management
- ✅ Donation tracking
- ✅ Event management
- ✅ Gallery management
- ✅ Analytics & statistics

## 🔐 Security

- JWT token authentication
- Password hashing with bcrypt
- Input sanitization
- CORS protection
- Rate limiting
- MongoDB injection prevention

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Railway/Render)
```bash
cd backend
# Railway
railway up

# OR Render
git push
```

## 📞 Contact & Support

- **Email**: savehumanity999@gmail.com
- **Phone**: 9520568769
- **Location**: India

## 👨‍💼 Founder

**Tanishk Yadav**

---

**"Plant Today, Protect Tomorrow"** 🌱

Made with 💚 for Nature
