import React from 'react';
import { MOCK_MOH_CERTIFICATE } from '../data/mockData';
import { 
  X, 
  ShieldCheck, 
  Printer, 
  Download, 
  CheckCircle2, 
  Award, 
  QrCode,
  Building2,
  FileText
} from 'lucide-react';

interface MohCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  loupeSerial: string;
}

export const MohCertificateModal: React.FC<MohCertificateModalProps> = ({
  isOpen,
  onClose,
  loupeSerial,
}) => {
  if (!isOpen) return null;

  const cert = MOCK_MOH_CERTIFICATE;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[30px] sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0 print:hidden" />

        {/* Top Action Header (Non-printable) */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 sm:py-3.5 border-b border-slate-100 bg-slate-50/80 shrink-0 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
            <Award className="w-4 h-4 text-teal-600" />
            <span>Official Clinical Biosecurity Audit Pass · MOH Malaysia Standards</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-teal-600" />
              <span>Print / Download PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white" id="printable-certificate">
          
          {/* Certificate Border Frame */}
          <div className="p-6 border-2 border-teal-800/30 rounded-2xl bg-white relative">
            
            {/* Corner Decorative Medical Marks */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-teal-700" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-teal-700" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-teal-700" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-teal-700" />

            {/* Header Lockup */}
            <div className="text-center pb-5 border-b border-slate-200">
              <div className="flex items-center justify-center gap-2 mb-1">
                <ShieldCheck className="w-7 h-7 text-teal-700" />
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">LoupeCare</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-800">
                Clinical Optical Decontamination & Biosecurity Pass
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Conforms to Ministry of Health (MOH) Malaysia Infection Control Guidelines (CPG 2020) & MDA Act 737
              </p>
            </div>

            {/* Certificate Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
              <div className="space-y-1.5">
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Certificate Pass ID:</span>
                  <span className="font-mono font-bold text-slate-800">{cert.certificateId}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Asset Serial Number:</span>
                  <span className="font-mono font-bold text-teal-800">{loupeSerial || cert.loupeSerial}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Registered Clinician:</span>
                  <span className="font-semibold text-slate-800">{cert.ownerName}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-right">
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Service Execution Date:</span>
                  <span className="font-mono text-slate-800 font-semibold">{cert.serviceDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Clinical Validity Window:</span>
                  <span className="font-semibold text-emerald-700">{cert.validUntil}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Affiliated Faculty / Clinic:</span>
                  <span className="text-slate-700 font-medium truncate">{cert.ownerAffiliation}</span>
                </div>
              </div>
            </div>

            {/* Technical Verification Parameters */}
            <div className="py-4 border-b border-slate-200 text-xs space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Clean-Room Protocol & Calibration Records:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Enzymatic Decon Agent:</span>
                  <span className="font-medium text-slate-800">{cert.enzymaticSolution}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Cavitation Frequency:</span>
                  <span className="font-medium text-slate-800">{cert.cavitationFreq}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Silane Nano-Shield Formulation:</span>
                  <span className="font-medium text-slate-800">{cert.antiFogPolymerBatch}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Digital Hinge Torque Restored:</span>
                  <span className="font-medium text-teal-800 font-mono">{cert.torqueReading}</span>
                </div>
              </div>
            </div>

            {/* Verified Standards List */}
            <div className="py-4 border-b border-slate-200 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Regulatory Standards Certified:
              </div>
              <div className="space-y-1.5">
                {cert.standardsVerified.map((st, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signatures & Seal Lockup */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-slate-100 rounded-lg border border-slate-300 p-1 flex items-center justify-center">
                  {/* Verification QR */}
                  <div className="text-[9px] text-center font-mono text-slate-600">
                    <QrCode className="w-8 h-8 text-teal-800 mx-auto" />
                    <span>MOH SCAN</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500">
                  <div>Cryptographic Seal: <span className="font-mono text-slate-700">#SHA256-LC-4481</span></div>
                  <div>Audit Timestamp: <span className="font-mono text-slate-700">2026-10-12T09:42:00+08:00</span></div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-base text-teal-900 border-b border-slate-400 pb-1">
                  Tan Lee Jia
                </div>
                <div className="text-[11px] font-semibold text-slate-800 mt-1">Tan Lee Jia, Lead Optical Tech</div>
                <div className="text-[10px] text-slate-400">Founder & BDS Candidate, LoupeCare Malaysia</div>
              </div>
            </div>

          </div>

          <div className="text-[11px] text-center text-slate-400">
            This digital audit pass is tamper-evident and admissible for dental faculty clinical session clearance and private clinic MOH accreditation inspection files.
          </div>

        </div>

      </div>
    </div>
  );
};
