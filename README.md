# HourDrive 🏎️⚡

> **India's Premier 3D Interactive Hourly Car Rental & Peer-to-Peer Car Sharing Platform**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r187-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

HourDrive is a state-of-the-art automotive mobility platform engineered for self-drive enthusiasts and car owners across India. Experience vehicles before you book with real-time **interactive 3D exploded engineering views**, **multi-angle on-road real-world photography**, and **Web Audio synthesized engine sound profiles** (V10, V8, V12, Turbo-Diesel, and EV).

---

## ✨ Key Features

### 🎮 Interactive 3D Exploded View & Studio
- **3D Exploded Engineering Model**: Disassemble and inspect powertrain, chassis, aerodynamic aero kit, wheels, and cabin systems in smooth 3D with interactive orbit controls.
- **Procedural 3D Fleet Visualizer**: Dynamically renders distinct vehicle architectures (**Sports Supercars**, **Off-Road 4x4 SUVs**, **Ultra-Luxury Limousines**, and **Pure Electric Vehicles**).
- **Web Audio Engine Synthesizer**: Realistic in-browser synthesized acoustic rev profiles:
  - 🏎️ Naturally Aspirated V10 Supercar scream
  - 🚙 2.2L mHawk / 2.8L Turbo-Diesel thrum with turbo blow-off valve hiss
  - ⚡ Futuristic EV dual-harmonic warp drive whine
  - 👑 Whisper-silent 6.75L V12 luxury purr
  - 🔊 Guttural AMG Bi-Turbo V8 crossplane burble
- **Bespoke Finishes & Studio Lighting**: Instant custom paint finishes (Cyan Pulse, Electric Cobalt, Stealth Onyx, Racing Crimson, Hyper Gold, Liquid Silver), functional LED headlights, neon underglow, and 360° auto-rotation.

### 📸 Real-World Multi-Angle Photography
- Integrated on-road photography gallery with 3 distinct camera angles per vehicle (**Dynamic Action Run**, **Alcantara/Leather Cockpit**, and **Rear Aero/Lighting Details**).
- Real Indian shoot locations: *Buddh International Circuit*, *Bandra-Worli Sea Link*, *Western Ghats & Nandi Hills*, *Marine Drive Mumbai*, *Delhi NCR VIP Boulevard*, and *Udaipur Heritage Palaces*.

### 🇮🇳 Curated Indian & Global Fleet (20+ Vehicles)
- **Indian Icons & SUVs**: Mahindra Thar 4x4, Tata Safari Dark Edition, Toyota Fortuner Legender, Mahindra Scorpio-N, Tata Nexon EV, Hyundai Creta.
- **Luxury & Exotic Supercars**: Porsche 911 GT3 RS, Lamborghini Huracán EVO, Rolls-Royce Ghost Series II, Mercedes-Benz G63 AMG, BMW M4 Competition.
- **Hourly Rental Tariffs**: Clear, transparent pricing denominated in Indian Rupees (`₹/hr`).

### 📱 Full End-to-End Rental Ecosystem
- **Instant Booking Engine**: City selection (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, Goa), date/time pickers, refundable security deposits, and Aadhaar/Driving License verification.
- **Host / Owner Dashboard**: Real-time vehicle telematics, booking requests, fleet analytics, earnings tracking, and vehicle listing management.
- **Customer Portal**: Active reservations, live digital trip logs, trip extensions, and invoice downloads.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, JavaScript (ESNext)
- **Build Tool**: Vite 8 with HMR
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System with dark luxury glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shrikant1a/HourDrive.git
   cd HourDrive
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
HourDrive/
├── public/                 # Static assets and icons
├── src/
│   ├── components/
│   │   ├── cars/           # 3D Vehicle visualizers & controls
│   │   ├── explodedView/   # 3D Exploded engineering view components
│   │   ├── home/           # Homepage sections & Experience Showcase
│   │   ├── layout/         # Navigation, Header, Footer
│   │   ├── ui/             # Reusable buttons, badges, modals
│   ├── data/
│   │   ├── mockData.js     # 20+ Fleet vehicles, reviews, locations
│   │   └── showcaseCars.js # Showcase vehicles, real-world images, audio specs
│   ├── pages/              # Explore, Booking, Customer/Owner Dashboards
│   ├── App.jsx             # Main router and layout orchestrator
│   └── main.jsx            # React root mount
├── index.html              # HTML5 entry with custom typography
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies and scripts
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Designed with ❤️ for automotive enthusiasts in India.
