# LoupeCare - Malaysia's First Loupe Maintenance Built for Dental Students

<div align="center">
  <img src="./public/pwa-512x512.png" alt="LoupeCare Logo" width="120" />
  
  <h3>🎓 Student Loupe Maintenance at Campus Smart Lockers</h3>
  <p>24hr Turnaround • Backup Loupes During Service • From RM 19/Service</p>
  
  [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
</div>

---

## 🎯 About LoupeCare

**LoupeCare is the first loupe maintenance service designed specifically for Malaysian dental students.** We solve the #1 problem BDS students face: their RM 3,500–12,000 surgical loupes fog up during clinicals, hinges loosen mid-procedure, and traditional servicing costs RM 150–300 with 5–7 day turnaround that conflicts with exam schedules.

### 🚨 The Student Problem We Solve

**Before LoupeCare:**
- ❌ Traditional opticians charge RM 150–300 per service (unaffordable for students)
- ❌ 5–7 day turnaround = missed clinical sessions during exams
- ❌ Alcohol wipes damage anti-fog coatings (students don't know better)
- ❌ No backup loupes = forced to skip procedures worth 20% of BDS grades

**After LoupeCare:**
- ✅ Student pricing: RM 19 trial, RM 79/semester, RM 149/year (saves RM 200–400 annually)
- ✅ Campus smart locker drop-off + 24hr turnaround = zero downtime
- ✅ Free backup loupe during service = never miss a clinical session
- ✅ Proper nano-coating + ultrasonic cleaning = loupes last 2x longer

### 🎓 Academic Context
- **Institution**: International Medical University (IMU) Dentistry
- **Programme**: Track A - Healthcare Practice Innovation & Clinical Support Services
- **Module**: Personal and Professional Development (PPD) – CHW Entrepreneurship
- **Cohort**: Semesters 8–10 BDS Programme
- **Target Market**: Year 3-5 BDS students at IMU, UM, UKM, UiTM (1,200 students total)

---

## ✨ Key Features

### 📱 **Mobile-First Progressive Web App**
- Full iOS and Android PWA support
- Installable on home screen (no App Store needed)
- Offline functionality for clinical areas with poor WiFi
- Push notifications for "Your loupe is ready!"
- Native iOS design (built by students, for students)

### 🎓 **Student-Focused Service Model**
- **Campus Smart Lockers**: Drop-off at IMU, UM, UKM, UiTM dental lounges 24/7
- **24hr Express Turnaround**: Submit Monday 9am → Pickup Tuesday 9am
- **Exam Week Priority**: Guaranteed same-day service during midterms/finals
- **Free Backup Loupes**: Emergency loaners while yours is being serviced
- **Student ID Verification**: Exclusive pricing for matriculated BDS students

### 🔬 **4-Stage Clean-Room Service**
1. **Stage 1**: Campus Locker Drop-off & 10-Point Digital Inspection
2. **Stage 2**: Ultrasonic Enzymatic Decon (MOH compliant, prism-safe)
3. **Stage 3**: Hydrophobic Nano-Coating (45–60 days fog-free)
4. **Stage 4**: Hinge Micro-Torque Calibration & Sterile Packaging

### 🏥 **MOH Compliance for Clinical Portfolios**
- Digital certificate for every service (required for clinic audits)
- Medical Device Authority (MDA) Malaysia compliance
- ISO 6789 calibration standards
- Perfect for BDS portfolio submissions

---

## 💰 Student Pricing Plans

| Plan | Best For | Price | Services | Key Benefits |
|------|----------|-------|----------|--------------|
| **🔥 First-Timer Trial** | Year 3-4 students trying us out | **RM 19** | 1 service | Try once, free backup loupe, student ID required |
| **🎓 Semester Pass** | Most popular for BDS students | **RM 79/sem** | 2 services | Before midterms & finals, 24hr express, unlimited backup reserves |
| **💎 Annual All-Access** | Year 4-5 heavy clinical load | **RM 149/year** | 4 services | Quarterly servicing, exam week priority, refer-a-friend RM 20 credit |
| **👨‍⚕️ Graduate Plan** | New grads, house officers | **RM 249/year** | 6 services | Clinic courier pickup, professional MOH logs |

### Why Students Choose Us Over Traditional Opticians

| Traditional Optician | LoupeCare Student Plan |
|---------------------|------------------------|
| RM 150-300 per service | RM 19-79 (save RM 200+ annually) |
| 5-7 day turnaround | 24hr express (48hr during exams) |
| Must courier or drive to shop | Campus smart locker 24/7 |
| No backup = miss clinical sessions | Free backup loupe included |
| Alcohol wipes damage coating | Proper ultrasonic + nano-coating |
| No MOH certificate | Digital certificate for portfolio |

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

## 📊 Business Model (Student-Focused)

### Target Market
- **Primary**: Year 3-5 BDS students at IMU Bukit Jalil, UM, UKM, UiTM
- **Total Addressable Market**: ~1,200 BDS students across 4 major dental schools
- **Year 1 Goal**: 350 student subscribers (29% penetration at IMU pilot)
- **Year 2 Expansion**: 850 students across all 4 campuses

### Why This Niche Works
1. **Students are price-sensitive but must have loupes** (required for clinicals worth 20% of grades)
2. **Concentrated on 4 campuses** = low customer acquisition cost via WhatsApp groups
3. **High switching cost once subscribed** = loupes are registered in our system
4. **Natural upgrade path** = students become clinicians who pay 3x more

### Go-to-Market Strategy
- **Phase 1 (Month 1-3)**: Pilot with 50 Year 4-5 students at IMU Bukit Jalil
- **Phase 2 (Month 4-6)**: Expand to all IMU BDS cohorts via campus ambassadors
- **Phase 3 (Month 7-12)**: Launch at UM, UKM, UiTM via student society partnerships
- **Channels**: WhatsApp groups, Instagram reels, clinical orientation week demos

### Unit Economics
- **COGS per service**: RM 4.80 (reagents + nano-polymer + screws + packaging)
- **Average revenue per service**: RM 39.50
- **Gross margin**: 88% (student-focused efficiency)
- **Breakeven**: Month 4 at 120 paying students
- **Year 1 Projection**: 350 students × RM 138 avg = **RM 48,500 ARR**, **RM 18,500 net profit**

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
  <p><strong>LoupeCare</strong> - Malaysia's First Loupe Maintenance Built for Dental Students</p>
  <p>🎓 Built by a BDS student, for BDS students</p>
  <p>📍 IMU Bukit Jalil • UM • UKM • UiTM</p>
</div>
