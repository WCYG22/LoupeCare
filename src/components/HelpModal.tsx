import React from 'react';
import { 
  X, 
  HelpCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Glasses, 
  Sparkles, 
  Lock, 
  FileText,
  CheckCircle2
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickAction: (action: string) => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onQuickAction,
}) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Where are the campus smart lockers located?',
      a: 'We operate 4 autonomous smart locker banks across Klang Valley: IMU Bukit Jalil (Oral Health Centre Level 3 Lounge), UM Faculty of Dentistry (Clinical Student Lounge), UKM Kampus KL (Dental Library Annex), and UiTM Sungai Buloh (Specialist Polyclinic Floor 2).',
      icon: MapPin,
    },
    {
      q: 'What is the turnaround time for optical servicing?',
      a: 'Campus express drop-offs deposited before 09:00 AM are serviced and returned by 15:30 PM same-day. Standard turnaround is 24 hours. For private clinics, our door-to-door courier service takes 24–48 hours.',
      icon: Clock,
    },
    {
      q: 'What if I have patient clinics while my loupe is in service?',
      a: 'Zero chairside downtime is guaranteed! You can reserve a standardized loaner loupe (2.5x, 3.0x, 3.5x Galilean or Prismatic with your exact working distance) instantly via the Emergency Loaner Fleet tab.',
      icon: Glasses,
    },
    {
      q: 'How does LoupeCare protect against optical damage or liability disputes?',
      a: 'Every intake undergoes an automated 10-point macro optical camera inspection. Baseline micro-scratches, prism seals, and hinge tension are recorded and digitally signed off before any servicing. LoupeCare is backed by a RM 50,000 professional optical asset indemnity insurance policy.',
      icon: ShieldCheck,
    },
    {
      q: 'How does the anti-fog nano-bonding work?',
      a: 'We apply a medical-grade fluorinated silane sol-gel cured in a 55°C infrared thermal tunnel. This creates a covalent chemical bond with the glass lens that repels moisture condensation and chairside blood/saliva splatter with a contact angle >114° for 60–90 clinical days.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[30px] sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Clinician Guide & FAQ</h3>
              <p className="text-xs text-slate-500">Everything you need to know about LoupeCare services</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Quick Start Card */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2 text-xs">
            <div className="font-bold text-teal-900 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>How to Use LoupeCare in 3 Steps:</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-teal-950">
              <li><strong>Drop-off:</strong> Place loupes in the campus locker via the app's dynamic QR code.</li>
              <li><strong>Track & Sign:</strong> Review your 10-point intake inspection photos and authorize the 4-stage service.</li>
              <li><strong>Pick up:</strong> Collect your sterilized, re-torqued, and anti-fog coated loupes same-day!</li>
            </ol>
          </div>

          {/* FAQs List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Frequently Asked Questions
            </h4>
            {faqs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors space-y-1.5 text-xs">
                  <div className="font-bold text-slate-900 flex items-start gap-2">
                    <Icon className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </div>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick shortcuts */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Quick Shortcuts
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => { onClose(); onQuickAction('locker'); }}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white text-slate-700 font-medium text-left flex items-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-teal-600" />
                <span>Drop-off Loupe</span>
              </button>
              <button
                onClick={() => { onClose(); onQuickAction('loaner'); }}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white text-slate-700 font-medium text-left flex items-center gap-2 transition-all cursor-pointer"
              >
                <Glasses className="w-3.5 h-3.5 text-teal-600" />
                <span>Backup Loupe</span>
              </button>
              <button
                onClick={() => { onClose(); onQuickAction('cert'); }}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white text-slate-700 font-medium text-left flex items-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                <span>MOH Certificate</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Need live assistance? WhatsApp LoupeCare Support: +60 12-345 6789</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
