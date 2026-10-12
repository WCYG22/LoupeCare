# LoupeCare - Clinical Optical Maintenance & Practice Management

<div align="center">
  <img src="./public/pwa-512x512.png" alt="LoupeCare Logo" width="120" />
  
  <h3>Professional Surgical Loupe Maintenance Service</h3>
  <p>Subscription-based cleaning, anti-fog coating, decontamination and maintenance for dental loupes</p>
  
  [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
</div>

---

## 🎯 About LoupeCare

LoupeCare is a subscription-based service providing professional cleaning, anti-fog coating, decontamination, and minor maintenance for dental surgical loupes, targeting dental students and young dentists in Malaysia.

### 🎓 Academic Context
- **Institution**: International Medical University (IMU) Dentistry
- **Programme**: Track A - Healthcare Practice Innovation & Clinical Support Services
- **Module**: Personal and Professional Development (PPD) – CHW Entrepreneurship
- **Cohort**: Semesters 8–10 BDS Programme

---

## ✨ Key Features

### 📱 **Mobile-First Progressive Web App**
- Full iOS and Android PWA support
- Installable on home screen
- Offline functionality
- Push notifications
- Native app feel with iOS design patterns

### 🔬 **4-Stage Service Tracking**
1. **Stage 1**: Contactless Drop & 10-Point Pre-Inspection
2. **Stage 2**: Isolated Cavitation Decontamination (MOH compliant)
3. **Stage 3**: Hydrophobic Nano-Shield Bonding
4. **Stage 4**: Micro-Torque Calibration & Locker Return

### 🏥 **MOH Compliance**
- Ministry of Health infection control guidelines
- Medical Device Authority (MDA) Malaysia compliance
- ISO 6789 micro-fastener calibration standards
- Audit-ready documentation

### ⚡ **Zero-Downtime Service**
- Emergency backup loaner fleet
- Smart IoT locker integration at 4 campus locations:
  - IMU Bukit Jalil
  - UM Faculty of Dentistry
  - UKM Kampus KL
  - UiTM Sungai Buloh

---

## 💰 Subscription Plans

| Plan | Target Audience | Price | Services/Year |
|------|----------------|-------|---------------|
| **Student Semester Pass** | BDS Students | RM 79/semester | 2 services |
| **Clinician Pro Annual** | Young Dentists | RM 249/year | 6 services + courier |
| **Enterprise Retainer** | Dental Clinics | RM 180/doctor/year | 6 services + dedicated support |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or bun package manager

### Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access the App
- **Desktop**: http://localhost:3000 (with iPhone frame simulation)
- **Mobile**: http://YOUR_IP:3000 (full edge-to-edge experience)

---

## 🌐 Deployment

### Deploy to Render.com (Free)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Render**
   - Go to [Render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect settings from `render.yaml`
   - Click "Create Web Service"

3. **Done!** Your app will be live at `https://loupecare.onrender.com`

### Manual Render Setup
If auto-detection doesn't work:
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Start Command**: `npm run preview`
- **Environment**: Node
- **Plan**: Free

---

## 📱 Install as PWA

### iOS (Safari)
1. Open the app in Safari
2. Tap Share button (📤)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)
1. Open the app in Chrome
2. Tap menu (⋮)
3. Tap "Add to Home Screen"
4. Tap "Add"

---

## 🛠 Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 8** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### PWA
- **Vite Plugin PWA** - Service worker & manifest
- **Workbox** - Offline caching
- **Web Push API** - Notifications

### Features
- iOS safe area support
- Touch-optimized UI
- Haptic feedback
- Dynamic Island integration
- Responsive design

---

## 📂 Project Structure

```
loupecare/
├── public/              # Static assets
│   ├── index.html
│   ├── pwa-*.png       # PWA icons
│   └── vite.config.ts
├── src/
│   ├── components/     # React components
│   ├── data/          # Mock data
│   ├── hooks/         # Custom hooks
│   ├── types/         # TypeScript types
│   ├── utils/         # Utilities
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── scripts/           # Build scripts
├── package.json
├── render.yaml        # Render deployment config
└── README.md
```

---

## 🎨 Design Philosophy

### Mobile-First
- Auto-detects mobile devices
- Edge-to-edge experience on phones
- Beautiful iPhone frame on desktop
- Touch-optimized interactions

### iOS Design Patterns
- Native iOS navigation
- Bottom tab bar
- Segmented controls
- Dynamic Island integration
- Haptic feedback
- Safe area support

### Accessibility
- Minimum 44px touch targets
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

---

## 🧪 Testing

### Mobile Testing Checklist
- [ ] iPhone SE (small screen)
- [ ] iPhone 14 Pro (Dynamic Island)
- [ ] iPhone 14 Pro Max (large screen)
- [ ] Android small device
- [ ] Android large device
- [ ] PWA installation
- [ ] Offline mode
- [ ] Push notifications

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Lighthouse PWA Score: 90+
- Lighthouse Performance: 90+

---

## 📊 Business Model

### Value Proposition
- **Asset Longevity**: Doubles lifespan of RM 3,500–12,000 equipment
- **Zero Downtime**: Eliminates fogging during procedures
- **MOH Compliance**: Standardized decontamination protocols

### Unit Economics
- COGS per service: RM 4.80
- Gross margin: 82-85%
- Breakeven: Month 4 (165 users)

### Seed Capital
- Total: RM 25,000
- Equipment: RM 11,000 (44%)
- IoT Lockers: RM 5,000 (20%)
- Consumables: RM 5,000 (20%)
- Tech & Insurance: RM 4,000 (16%)

---

## 📄 License

This project is part of an academic entrepreneurship module at IMU Dentistry.

---

## 👥 Contact

**Founder**: Tan Lee Jia (5th-Year BDS Candidate)  
**Institution**: International Medical University, Kuala Lumpur  
**Email**: ops@loupecare.my

---

## 🙏 Acknowledgments

- **Academic Coordinator**: Prof Muneer Gohar Babar
- **Programme**: PPD – CHW Entrepreneurship Module
- **Institution**: IMU Faculty of Dentistry

---

<div align="center">
  <p><strong>LoupeCare</strong> - Professional Optical Maintenance for Clinical Excellence</p>
  <p>Built with ❤️ for Malaysian dental professionals</p>
</div>
