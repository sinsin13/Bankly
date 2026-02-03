import { X, Mail, Phone, Clock, MessageCircle, FileText, CreditCard, Shield, HelpCircle } from 'lucide-react';

function HelpSupportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close help and support"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Help & Support</h2>
                <p className="text-blue-100 text-sm">We're here to assist you 24/7</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Phone Support */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
                <p className="text-sm text-gray-600 mb-2">Speak with our team</p>
                <p className="text-blue-600 font-semibold">1800-123-4567</p>
                <p className="text-xs text-gray-500 mt-1">Toll-free</p>
              </div>

              {/* Email Support */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                <p className="text-sm text-gray-600 mb-2">Get help via email</p>
                <p className="text-purple-600 font-semibold text-sm">support@bankly.com</p>
                <p className="text-xs text-gray-500 mt-1">24-48 hour response</p>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gray-50 rounded-xl p-5 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="text-blue-600" size={24} />
                <h3 className="font-semibold text-gray-900 text-lg">Support Hours</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-semibold text-gray-900">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday - Sunday:</span>
                  <span className="font-semibold text-gray-900">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Holidays:</span>
                  <span className="font-semibold text-gray-900">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Emergency Line:</span>
                  <span className="font-semibold text-blue-600">Always Available</span>
                </div>
              </div>
            </div>

            {/* Quick Help Topics */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Quick Help Topics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <CreditCard className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Account & KYC</p>
                      <p className="text-xs text-gray-500 mt-1">Open accounts, KYC verification, document upload</p>
                    </div>
                  </div>
                </button>

                <button className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <Shield className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Security & Privacy</p>
                      <p className="text-xs text-gray-500 mt-1">Password reset, fraud protection, data security</p>
                    </div>
                  </div>
                </button>

                <button className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <CreditCard className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Cards & Payments</p>
                      <p className="text-xs text-gray-500 mt-1">Debit cards, transactions, payment issues</p>
                    </div>
                  </div>
                </button>

                <button className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">General Inquiries</p>
                      <p className="text-xs text-gray-500 mt-1">Fees, services, account features</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* FAQs Preview */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <details className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    How long does KYC verification take?
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 pl-2">
                    KYC verification typically takes 24-48 hours. You'll receive an email notification once your documents are verified. During peak times, it may take up to 72 hours.
                  </p>
                </details>

                <details className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What documents do I need for account opening?
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 pl-2">
                    You'll need a valid Aadhaar Card and PAN Card. Make sure the details on both documents match and are clearly readable.
                  </p>
                </details>

                <details className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Is there a minimum balance requirement?
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 pl-2">
                    Savings accounts have zero minimum balance. Current accounts may require a minimum balance depending on the plan you choose.
                  </p>
                </details>

                <details className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    How do I reset my password?
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 pl-2">
                    Click on "Forgot Password" on the login page. You'll receive a password reset link via email. Follow the instructions to create a new password.
                  </p>
                </details>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-start gap-3">
                <Shield className="text-red-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-800">Emergency Support</p>
                  <p className="text-sm text-red-700 mt-1">
                    If you suspect unauthorized access to your account or fraudulent activity, call our emergency hotline immediately at <span className="font-bold">1800-911-BANK</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
            <p className="text-sm text-gray-600">Need more help? Visit our <a href="#" className="text-blue-600 hover:underline">Help Center</a></p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

export default HelpSupportModal;
