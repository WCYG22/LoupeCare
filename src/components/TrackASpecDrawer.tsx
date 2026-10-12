import React, { useState } from 'react';
import { TRACK_A_SPEC_DATA } from '../data/mockData';
import { 
  X, 
  BookOpen, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Cpu, 
  TrendingUp, 
  ShieldAlert, 
  Printer, 
  Layers, 
  Smartphone, 
  DollarSign
} from 'lucide-react';

interface TrackASpecDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackASpecDrawer: React.FC<TrackASpecDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'sec1' | 'sec2' | 'sec3' | 'sec4' | 'sec5' | 'sec6' | 'sec7'>('sec1');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">LoupeCare Master Technical Specification & PRD</h3>
                <span className="text-[11px] font-mono bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
                  PPD Track A Official Blueprint
                </span>
              </div>
              <p className="text-xs text-slate-500">
                IMU Dentistry · PPD CHW Entrepreneurship Module · Coordinator: Prof Muneer Gohar Babar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200"
              title="Print Specification"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-slate-100/80 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 shrink-0 text-xs">
          {[
            { id: 'sec1', label: '1. Track A Value Prop' },
            { id: 'sec2', label: '2. User Journeys' },
            { id: 'sec3', label: '3. Core Modules' },
            { id: 'sec4', label: '4. ASCII Wireframes' },
            { id: 'sec5', label: '5. Architecture & IoT' },
            { id: 'sec6', label: '6. 7-D Roadmap & Capex' },
            { id: 'sec7', label: "7. Dragons' Den Pitch" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
          
          {/* SECTION 1 */}
          {activeTab === 'sec1' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-lg font-bold text-slate-900">
                  SECTION 1: Track A Practice Innovation & App Value Proposition
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Positioning within Track A: Healthcare Practice Innovation & Clinical Support Services
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-2">
                <span className="font-bold text-teal-900">Venture Positioning:</span>
                <p className="text-teal-950">
                  LoupeCare is engineered not as a transient consumer software app, but as the primary <strong>Digital Clinical Practice Support Infrastructure</strong> operationalizing physical B2B optical servicing across Malaysian dental faculties and private operatories. It eliminates practice overhead, automates physical sterilization audit logging, and safeguards surgical loupe assets valued between RM 3,500 and RM 12,000.
                </p>
              </div>

              <h5 className="font-bold text-slate-900 text-sm">Clinical Practice Friction vs. App Digital Solutions:</h5>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50/50">
                  <div>
                    <strong className="text-rose-700 block mb-1">Clinical Friction 1: Lost Chairside Billings (RM 400/hr)</strong>
                    <p className="text-slate-600">
                      When a loupe hinge slips or optics misalign, clinician posture collapses and procedures are delayed. Traditional international factory recalibration takes 4–8 weeks.
                    </p>
                  </div>
                  <div>
                    <strong className="text-teal-700 block mb-1">LoupeCare App Solution:</strong>
                    <p className="text-slate-600">
                      Automated loaner fleet reservation guarantees instant backup dispatch. Campus express locker turnarounds return personal optics in 24–48 hours with zero student quota stoppage.
                    </p>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <strong className="text-rose-700 block mb-1">Clinical Friction 2: Mask-Induced Procedural Lens Fogging</strong>
                    <p className="text-slate-600">
                      High-aerosol ultrasonic scaling and surgical crown preps create severe humidity inside N95 respirators, causing optical blind spots and compromised margins.
                    </p>
                  </div>
                  <div>
                    <strong className="text-teal-700 block mb-1">LoupeCare App Solution:</strong>
                    <p className="text-slate-600">
                      Scheduled reminders for heat-cured fluoro-silane hydrophobic nano-coating. Covalently bonded silane matrix delivers contact angles &gt;112°, maintaining absolute fog resistance.
                    </p>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50/50">
                  <div>
                    <strong className="text-rose-700 block mb-1">Clinical Friction 3: MOH Accreditation Audit Stress</strong>
                    <p className="text-slate-600">
                      Private clinics and university dental hospitals struggle to verify that optical frames and ocular assemblies meet Ministry of Health infection control requirements without solvent damage.
                    </p>
                  </div>
                  <div>
                    <strong className="text-teal-700 block mb-1">LoupeCare App Solution:</strong>
                    <p className="text-slate-600">
                      Cryptographically signed, tamper-evident MOH Biosecurity Audit Passes generated automatically. Conforms directly to MOH Oral Health Division CPG 2020 and MDA Act 737.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2 */}
          {activeTab === 'sec2' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-lg font-bold text-slate-900">
                  SECTION 2: End-to-End Clinical User Journeys & Personas
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Multi-tier role architecture for dental students, private associates, and practice managers
                </p>
              </div>

              <div className="space-y-4">
                {/* Persona 1 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">User Tier 1: Dental Student (&quot;TAN LEE JIA&quot;, Year 5 BDS IMU)</span>
                    <span className="text-[11px] font-mono bg-teal-50 text-teal-800 px-2 py-0.5 rounded">Semester Pass (RM 79)</span>
                  </div>
                  <div className="text-slate-600 space-y-1 text-xs">
                    <p><strong>Step 1:</strong> Matriculation verification via IMU student email unlocks subsidized semester pass.</p>
                    <p><strong>Step 2:</strong> Deposits loupe in Oral Health Centre Level 3 Smart Locker via dynamic OTP/QR.</p>
                    <p><strong>Step 3:</strong> Reviews 10-point intake macro photo report and electronically signs off.</p>
                    <p><strong>Step 4:</strong> Retrieves serviced and nano-coated loupe before afternoon clinical session.</p>
                  </div>
                </div>

                {/* Persona 2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">User Tier 2: Private Practice Associate ("Dr. Ryan", Bangsar Dental)</span>
                    <span className="text-[11px] font-mono bg-teal-50 text-teal-800 px-2 py-0.5 rounded">Clinician Pro (RM 249/yr)</span>
                  </div>
                  <div className="text-slate-600 space-y-1 text-xs">
                    <p><strong>Step 1:</strong> Books door-to-door express courier intake via the app.</p>
                    <p><strong>Step 2:</strong> Reserves a matched 3.5x Prismatic backup loaner loupe to cover crown preparations.</p>
                    <p><strong>Step 3:</strong> Monitors live 4-stage servicing telemetry (cavitation and 0.18 Nm torque calibration).</p>
                    <p><strong>Step 4:</strong> Receives sealed optics package at clinic reception within 24 hours.</p>
                  </div>
                </div>

                {/* Persona 3 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">User Tier 3: Dental Practice Owner / DSO Clinic Manager</span>
                    <span className="text-[11px] font-mono bg-teal-50 text-teal-800 px-2 py-0.5 rounded">Enterprise Retainer (RM 180/dr)</span>
                  </div>
                  <div className="text-slate-600 space-y-1 text-xs">
                    <p><strong>Step 1:</strong> Registers multi-chair clinician team (5+ associates) under centralized billing.</p>
                    <p><strong>Step 2:</strong> Staggered monthly service route prevents multiple doctors from being down simultaneously.</p>
                    <p><strong>Step 3:</strong> One-tap bulk export of verified biosecurity certificates for MOH annual clinic licensing audits.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3 */}
          {activeTab === 'sec3' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-lg font-bold text-slate-900">
                  SECTION 3: Core Application Modules & Technical Specifications
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  6 Core system engines powering the LoupeCare ecosystem
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <strong className="text-slate-900 block font-bold">1. Contactless Smart Locker Terminal API</strong>
                  <p className="text-slate-600">
                    ESP32 microcontroller link via MQTT over TLS. Dynamic rotating QR payload refreshes every 45s. Fallback 6-digit offline pseudo-random PIN synced with server seeds.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <strong className="text-slate-900 block font-bold">2. 4-Stage Live Servicing Engine Tracker</strong>
                  <p className="text-slate-600">
                    Standardized clean-room progression: (1) Intake & 10-point scan, (2) 40 kHz isolated sweep cavitation, (3) 55°C heat-cured fluoro-silane bonding, (4) 0.18 Nm micro-torque calibration.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <strong className="text-slate-900 block font-bold">3. 10-Point Condition Inspection & Waiver</strong>
                  <p className="text-slate-600">
                    High-magnification macro photographic capture logs pre-existing ocular scratches and hinge fatigue before servicing, paired with in-app biometric/electronic sign-off.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <strong className="text-slate-900 block font-bold">4. Loaner Fleet Inventory Reservation</strong>
                  <p className="text-slate-600">
                    Real-time inventory lookup matching magnification (2.5x, 3.0x, 3.5x), working distance (350mm/420mm/480mm), and pupillary spacing. Guarantees zero missed clinical quotas.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <strong className="text-slate-900 block font-bold">5. Practice MOH Compliance & Audit Pass</strong>
                  <p className="text-slate-600">
                    Automated PDF engine generating audit-ready certificates verifying adherence to MOH CPG 2020 and MDA Act 737. Embedded QR verification links to cloud compliance ledger.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <strong className="text-slate-900 block font-bold">6. Subscription & Malaysian Billing Gateway</strong>
                  <p className="text-slate-600">
                    Native integration with PayNet DuitNow QR, FPX multi-bank online checkout, and corporate payment cards. Automatic semester roll-overs with semester matriculation re-check.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4 */}
          {activeTab === 'sec4' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-lg font-bold text-slate-900">
                  SECTION 4: Complete UI/UX Wireframe ASCII Blueprint
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Text-based architectural layout boxes for the 6 core mobile & portal interfaces
                </p>
              </div>

              <div className="space-y-4 font-mono text-[11px] bg-slate-900 text-teal-300 p-4 rounded-xl overflow-x-auto">
                <pre>{`
+-------------------------------------------------------------+
| SCREEN 1: CLINICIAN HOME / ASSET HEALTH DASHBOARD           |
+-------------------------------------------------------------+
| [Logo] LoupeCare | Track A   [User: TAN LEE JIA (Yr 5 BDS)] |
| +---------------------------------------------------------+ |
| | ExamVision Galilean HD 2.8x (LC-4091)   [STATUS: OPTIMAL]| |
| | Health Score: [========== 94%]                          | |
| | Anti-Fog Active: 42 Days Left | Torque: 0.18 Nm Nominal | |
| +---------------------------------------------------------+ |
| [ Drop-off Smart Locker ] [ Emergency Loaner ] [ MOH Pass ] |
+-------------------------------------------------------------+

+-------------------------------------------------------------+
| SCREEN 2: SMART LOCKER TERMINAL SCREEN                      |
+-------------------------------------------------------------+
| Location: [ IMU Bukit Jalil - Level 3 Dental Lounge v ]     |
| Assigned: Locker #04 (IoT Solenoid Engaged)                 |
| +-------------------------+   Backup PIN: [ 849-201 ]       |
| |   [ DYNAMIC QR CODE ]   |   Refreshes in: 45s             |
| +-------------------------+                                 |
| [ Tap to Simulate Locker Door Open & Close ]                |
+-------------------------------------------------------------+

+-------------------------------------------------------------+
| SCREEN 3: 10-POINT PRE-INSPECTION REPORT & WAIVER           |
+-------------------------------------------------------------+
| [ MACRO LOUPE SCHEMATIC: Frame | Seals | Hinges | Optics ]  |
| 1. Objective Lens Surface ....................... [ PASS ]  |
| 2. Prism Hermetic Seal .......................... [ PASS ]  |
| 4. Bilateral Hinge Tension ................... [ WARNING ]  |
| 6. Medical Silicone Nose Pads ................ [ WARNING ]  |
| Digitally Signed: [ TAN LEE JIA (YEAR 5 BDS) ] [ AUTHORIZE ]|
+-------------------------------------------------------------+

+-------------------------------------------------------------+
| SCREEN 4: LIVE 4-STAGE SERVICING PROGRESS TIMELINE          |
+-------------------------------------------------------------+
| [Stage 1: Intake Scan] -> [Stage 2: 40kHz Decon] ->         |
| [Stage 3: Silane Nano-Bonding (CURRENT)] -> [Stage 4: Torque] |
| Telemetry: 55°C IR Cure | Contact Angle >114° | Tech: Tan LJ|
+-------------------------------------------------------------+

+-------------------------------------------------------------+
| SCREEN 5: EMERGENCY CLINICAL LOANER BOOKING                 |
+-------------------------------------------------------------+
| Filters: [Mag: 2.5x | 3.0x | 3.5x] [WD: 350 | 420 | 480mm] |
| Unit #1: ExamVision Ergonomic 2.5x (48g) .... [ RESERVE ]   |
| Staged: Locker #02 IMU Lounge | Zero Quota Downtime Pass    |
+-------------------------------------------------------------+

+-------------------------------------------------------------+
| SCREEN 6: AUDIT-READY MOH BIOSECURITY CERTIFICATE           |
+-------------------------------------------------------------+
| MOH CPG 2020 Compliance Pass #MOH-LC-2026-0892              |
| Serial: EV-MY-4091 | Valid: 12 Jan 2027 (90-Day Cycle)      |
| CaviCide Enzymatic: PASS | Torque: 0.182 Nm | [ PRINT PDF ] |
+-------------------------------------------------------------+
`}</pre>
              </div>
            </div>
          )}

          {/* SECTION 5 */}
          {activeTab === 'sec5' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-lg font-bold text-slate-900">
                  SECTION 5: Technical Architecture & IoT Hardware Integration
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Full-stack engineering stack, IoT locker protocol, and security compliance
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 block">Mobile Client Stack:</span>
                  <p className="text-slate-600">Flutter (iOS & Android) with local SQLite caching for offline locker PIN authentication and camera macro capture.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 block">Backend & Real-time:</span>
                  <p className="text-slate-600">Node.js (NestJS) microservices + WebSockets for live servicing tracker feeds and locker status updates.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 block">Databases:</span>
                  <p className="text-slate-600">PostgreSQL (Relational Asset, User, Service & Compliance Records) + Redis (Ephemeral dynamic QR OTP tokens).</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 block">IoT Hardware Architecture:</span>
                  <p className="text-slate-600">ESP32 microcontroller with 12V electromagnetic solenoid latches, optical beam door break sensors, MQTT over TLS broker.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block">Regulatory Compliance & Data Protection:</span>
                <p className="text-slate-600 leading-relaxed">
                  Fully compliant with the <strong>Malaysian Personal Data Protection Act 2010 (PDPA)</strong>. Dental clinician matriculation records and clinic identifiers are encrypted at rest with AES-256 and transmitted using TLS 1.3. Macro condition photos are stored in private AWS S3 buckets with time-limited pre-signed URLs.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 6 */}
          {activeTab === 'sec6' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-lg font-bold text-slate-900">
                  SECTION 6: Implementation Roadmap & 7-Dimension Resource Checklist
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Phased execution plan and complete RM 25,000 seed deployment model
                </p>
              </div>

              {/* 3 Phases */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <strong className="text-slate-900 block">Phase 1 (Months 1–3): MVP App Build & IMU Smart Locker Pilot</strong>
                  <p className="text-slate-600 mt-1">Deploy Locker L-01 at IMU Bukit Jalil Oral Health Centre. Onboard 80 BDS student beta testers; validate 10-point intake macro protocol and 82% unit gross margin.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <strong className="text-slate-900 block">Phase 2 (Months 4–6): Klang Valley Dental Faculty Expansion</strong>
                  <p className="text-slate-600 mt-1">Deploy Lockers L-02, L-03, L-04 at UM, UKM, and UiTM. Reach capital breakeven at Month 4 with 165 active paying users. Enable DuitNow auto-renewals.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <strong className="text-slate-900 block">Phase 3 (Months 7–12): B2B Practice Portal & Clinic Retainers</strong>
                  <p className="text-slate-600 mt-1">Launch Enterprise Clinic Retainer (RM 180/dr/yr) for private dental clinics across Klang Valley. Finish Year 1 with 350 active clinicians, RM 48,500 Gross ARR, RM 18,500 Net Profit.</p>
                </div>
              </div>

              {/* RM 25,000 Seed Budget Allocation Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="p-3 bg-slate-50 font-bold text-slate-800 border-b border-slate-200">
                  RM 25,000 Seed Capital Capex Deployment Schedule
                </div>
                <table className="w-full text-left divide-y divide-slate-100">
                  <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-mono">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Allocation</th>
                      <th className="p-3">Amount (RM)</th>
                      <th className="p-3">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Clean-Room Equipment</td>
                      <td className="p-3 font-mono">44%</td>
                      <td className="p-3 font-mono font-bold text-slate-900">RM 11,000</td>
                      <td className="p-3 text-slate-600">Sweep ultrasonic baths & optical macro inspection microscopes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Campus IoT Smart Lockers</td>
                      <td className="p-3 font-mono">20%</td>
                      <td className="p-3 font-mono font-bold text-slate-900">RM 5,000</td>
                      <td className="p-3 text-slate-600">4 Locker banks (IMU, UM, UKM, UiTM) with ESP32 & solenoids</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Consumables & Spares</td>
                      <td className="p-3 font-mono">20%</td>
                      <td className="p-3 font-mono font-bold text-slate-900">RM 5,000</td>
                      <td className="p-3 text-slate-600">Fluoro-silane polymer, enzymatic detergents, M1.2 micro-screws & nose pads</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">App, Cloud & Insurance</td>
                      <td className="p-3 font-mono">16%</td>
                      <td className="p-3 font-mono font-bold text-slate-900">RM 4,000</td>
                      <td className="p-3 text-slate-600">NestJS/AWS hosting, DuitNow bridge, and RM 50,000 liability insurance policy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 7 */}
          {activeTab === 'sec7' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-lg font-bold text-slate-900">
                  SECTION 7: Dragons' Den Pitch Alignment & Deficit Control
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Executive investment thesis, operational moats, and financial defensibility
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                  <span className="text-xs text-teal-700 font-semibold block">Capital Breakeven</span>
                  <span className="text-xl font-extrabold text-teal-900 font-mono">Month 4</span>
                  <span className="text-[11px] text-teal-700 block mt-1">165 Paying Users</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold block">Unit Gross Margin</span>
                  <span className="text-xl font-extrabold text-slate-900 font-mono">82% – 85%</span>
                  <span className="text-[11px] text-slate-500 block mt-1">RM 4.80 Unit COGS</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold block">Year 1 Net Profit</span>
                  <span className="text-xl font-extrabold text-emerald-700 font-mono">RM 18,500</span>
                  <span className="text-[11px] text-slate-500 block mt-1">On RM 48,500 Gross ARR</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <h5 className="font-bold text-slate-900 text-sm">Key Investment Pillars & Operational Moats:</h5>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <strong className="text-slate-900 block">1. Operational Scalability: 1 Technician manages 350+ Clinicians</strong>
                  <p className="text-slate-600">The contactless smart locker terminals batch physical drop-offs and pickups asynchronously, eliminating customer service counter staffing. Batch ultrasonic cavitation and multi-carrier IR tunnel curing allow 1 technician to service up to 24 loupes in a single 4-hour processing run.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <strong className="text-slate-900 block">2. High Defensibility & Zero-Liability Trap</strong>
                  <p className="text-slate-600">The 10-point macro inspection scan with in-app digital signature legally documents pre-existing optical damage before any servicing begins. Optical assembly isolation eliminates glue seal blowout risk, protected by RM 50,000 professional liability coverage.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <strong className="text-slate-900 block">3. Track A Module Excellence (IMU Dentistry)</strong>
                  <p className="text-slate-600">Founded by 5th-Year BDS candidate Tan Lee Jia under academic coordinator Prof Muneer Gohar Babar. Directly answers the PPD Entrepreneurship rubric by solving an acute clinical dental headache with demonstrable cash-flow viability.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>LoupeCare PRD Revision: 2.4-FINAL · IMU Dentistry PPD Track A</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};
