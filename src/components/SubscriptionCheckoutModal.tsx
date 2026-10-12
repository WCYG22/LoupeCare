import React, { useState } from 'react';
import { SUBSCRIPTION_TIERS } from '../data/mockData';
import { SubscriptionTier } from '../types';
import { 
  X, 
  Check, 
  Sparkles, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Building, 
  CheckCircle2,
  RefreshCw,
  Wallet
} from 'lucide-react';

interface SubscriptionCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscriptionSuccess: (tier: SubscriptionTier) => void;
}

export const SubscriptionCheckoutModal: React.FC<SubscriptionCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSubscriptionSuccess,
}) => {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(SUBSCRIPTION_TIERS[0]);
  const [paymentStep, setPaymentStep] = useState<'plans' | 'gateway' | 'confirmed'>('plans');
  const [paymentMethod, setPaymentMethod] = useState<'duitnow' | 'fpx' | 'card'>('duitnow');
  const [selectedBank, setSelectedBank] = useState('Maybank2u');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSelectPlan = (tier: SubscriptionTier) => {
    setSelectedTier(tier);
    setPaymentStep('gateway');
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('confirmed');
      onSubscriptionSuccess(selectedTier);
    }, 1500);
  };

  const handleFinish = () => {
    setPaymentStep('plans');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[30px] sm:rounded-2xl max-w-3xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">LoupeCare Clinical Subscription</h3>
              <p className="text-xs text-slate-500">Malaysian Dental Practice Maintenance Plans</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* STEP 1: Plan Comparison Cards */}
          {paymentStep === 'plans' && (
            <div className="space-y-4">
              <div className="text-center max-w-lg mx-auto">
                <h4 className="text-lg font-bold text-slate-900">Choose Your Optical Maintenance Tier</h4>
                <p className="text-xs text-slate-500 mt-1">
                  82–85% gross margin unit economics engineered for Malaysian dental students & practices
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {SUBSCRIPTION_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all relative ${
                      selectedTier.id === tier.id
                        ? 'border-teal-600 bg-teal-50/20 shadow-md ring-1 ring-teal-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-2.5 right-4 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-teal-700 text-white shadow-xs">
                        {tier.badge}
                      </span>
                    )}

                    <div>
                      <h5 className="font-bold text-slate-900 text-base">{tier.name}</h5>
                      <p className="text-[11px] text-slate-500 min-h-[32px] mt-1">{tier.targetAudience}</p>
                      
                      <div className="mt-4 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-semibold text-slate-500">RM</span>
                          <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">{tier.priceRM}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">/ {tier.period}</span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs text-slate-600">
                        {tier.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(tier)}
                      className="mt-6 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Subscribe via DuitNow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Malaysian Payment Gateway (DuitNow QR / FPX / Cards) */}
          {paymentStep === 'gateway' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Select Malaysian Payment Rail</h4>
                  <p className="text-xs text-slate-500">
                    Subscribing to: <strong className="text-teal-800">{selectedTier.name}</strong> (RM {selectedTier.priceRM} / {selectedTier.period})
                  </p>
                </div>
                <button
                  onClick={() => setPaymentStep('plans')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Change Plan
                </button>
              </div>

              {/* Payment Rail Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('duitnow')}
                  className={`p-3 rounded-xl border text-center font-semibold text-xs transition-all ${
                    paymentMethod === 'duitnow'
                      ? 'border-rose-500 bg-rose-50/50 text-rose-900 ring-1 ring-rose-500'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-rose-600" />
                  <span>DuitNow QR</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('fpx')}
                  className={`p-3 rounded-xl border text-center font-semibold text-xs transition-all ${
                    paymentMethod === 'fpx'
                      ? 'border-teal-600 bg-teal-50/50 text-teal-900 ring-1 ring-teal-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-teal-700" />
                  <span>FPX Banking</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center font-semibold text-xs transition-all ${
                    paymentMethod === 'card'
                      ? 'border-teal-600 bg-teal-50/50 text-teal-900 ring-1 ring-teal-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-teal-700" />
                  <span>Credit / Debit</span>
                </button>
              </div>

              {/* DuitNow QR View */}
              {paymentMethod === 'duitnow' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                  <div className="inline-block bg-rose-600 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider">
                    DuitNow National QR
                  </div>
                  <div className="w-48 h-48 mx-auto bg-white p-3 rounded-xl border border-slate-300 shadow-sm flex flex-col items-center justify-center relative">
                    <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="6" y="6" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="12" y="12" width="12" height="12" fill="currentColor"/>
                      <rect x="70" y="6" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="76" y="12" width="12" height="12" fill="currentColor"/>
                      <rect x="6" y="70" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="12" y="76" width="12" height="12" fill="currentColor"/>
                      {/* DuitNow Pink Center Logo */}
                      <circle cx="50" cy="50" r="14" fill="#E11D48"/>
                      <path d="M46 45 L54 50 L46 55 Z" fill="#FFFFFF"/>
                      {/* Random data cells */}
                      <rect x="36" y="12" width="6" height="6"/>
                      <rect x="46" y="8" width="8" height="6"/>
                      <rect x="36" y="24" width="8" height="8"/>
                      <rect x="52" y="22" width="8" height="6"/>
                      <rect x="8" y="42" width="8" height="8"/>
                      <rect x="22" y="46" width="8" height="6"/>
                      <rect x="72" y="42" width="8" height="8"/>
                      <rect x="84" y="46" width="6" height="12"/>
                      <rect x="42" y="72" width="12" height="6"/>
                      <rect x="66" y="72" width="8" height="8"/>
                      <rect x="78" y="78" width="12" height="10"/>
                    </svg>
                  </div>
                  <div className="text-xs text-slate-600 font-mono">
                    Scan with Maybank MAE, CIMB OCTO, TnG eWallet, or GrabPay
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Payee: LoupeCare Technologies Sdn Bhd · Ref: #LC-SUB-9812
                  </div>
                </div>
              )}

              {/* FPX View */}
              {paymentMethod === 'fpx' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">Select Financial Process Exchange (FPX) Bank:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Maybank2u', 'CIMB Clicks', 'Public Bank PBe', 'Hong Leong Connect', 'RHB Now', 'AmOnline'].map(b => (
                      <button
                        key={b}
                        onClick={() => setSelectedBank(b)}
                        className={`p-2.5 text-xs rounded-xl border text-center font-semibold transition-all ${
                          selectedBank === b 
                            ? 'bg-teal-600 text-white border-teal-700' 
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card View */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1">Cardholder Name:</label>
                    <input type="text" defaultValue="TAN LEE JIA (YEAR 5 BDS)" className="w-full p-2 bg-white border border-slate-300 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">Card Number:</label>
                      <input type="text" placeholder="•••• •••• •••• 4242" className="w-full p-2 bg-white border border-slate-300 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-600 mb-1">MM/YY:</label>
                        <input type="text" placeholder="12/28" className="w-full p-2 bg-white border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1">CVV:</label>
                        <input type="text" placeholder="•••" className="w-full p-2 bg-white border border-slate-300 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Payment Trigger */}
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authorizing Payment via Bank Gateway...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Payment of RM {selectedTier.priceRM}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: Confirmed Success State */}
          {paymentStep === 'confirmed' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Subscription Activated!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Thank you for subscribing to <strong className="text-slate-800">{selectedTier.name}</strong>. Your clinical optical maintenance quota has been credited.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan:</span>
                  <span className="font-semibold text-slate-800">{selectedTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-semibold text-teal-800">RM {selectedTier.priceRM}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-semibold text-emerald-700">Active (Auto-Renew Off)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Available Services:</span>
                  <span className="font-semibold text-slate-800">{selectedTier.servicesPerYear} Servicings Credited</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Return to Dashboard
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span>PCI-DSS Level 1 & PayNet Malaysia Certified</span>
          <span>Zero Long-Term Lock-in</span>
        </div>

      </div>
    </div>
  );
};
