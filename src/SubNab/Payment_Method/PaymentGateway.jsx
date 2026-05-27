import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentGateway = () => {
  const navigate = useNavigate();
  
  const [amount] = useState(3500);           // Fixed - এখন পরিবর্তন করা যাবে না
  const [runningMonth] = useState("মে");

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  const mobileOptions = [
    { name: 'bKash', logo: '/src/assets/bKash.png' },
    { name: 'Nagad', logo: '/src/assets/nogod.png' },
    { name: 'Rocket', logo: '/src/assets/rocket.png' },
  ];

  const cardOptions = [
    { name: 'Visa', logo: '/src/assets/visa.png' },
    { name: 'Mastercard', logo: '/src/assets/master.png' },
  ];

  const formatBengaliDate = (date) => {
    const banglaMonths = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
    const day = date.getDate();
    const month = banglaMonths[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${day} ${month} ${year} সময় ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const resetAll = () => {
    setSelectedMethod(null);
    setPaymentDetails({});
    setIsSuccess(false);
    setTransactionId('');
    setLoading(false);
  };

  const handleSelectMobile = (option) => {
    setSelectedMethod('mobile');
    setPaymentDetails({
      type: 'mobile',
      provider: option.name,
      number: '01683493858',
    });
    setTransactionId('');
  };

  const handleSelectCard = (option) => {
    setSelectedMethod('card');
    setPaymentDetails({ type: 'card', provider: option.name });
    setTransactionId('');
  };

  const handleCash = () => {
    setSelectedMethod('cash');
    setPaymentDetails({ type: 'cash', provider: 'Cash on Delivery' });
    setTransactionId('');
  };

  const handlePaymentConfirm = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    let finalTxId = transactionId.trim();
    if (!finalTxId) {
      finalTxId = 'TX' + Date.now().toString().slice(-8);
    }

    setTransactionId(finalTxId);
    setIsSuccess(true);
    setLoading(false);
  };

  const handlePrintReceipt = () => {
    const printContent = document.getElementById('receipt');
    const original = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden h-[95vh] flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white p-5 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">Secure Payment Gateway</h1>
          <p className="text-center text-indigo-100 mt-1 text-sm sm:text-base">পেমেন্ট সম্পন্ন করুন</p>

          <div className="mt-6 bg-white/10 backdrop-blur rounded-2xl p-5 text-center">
            <p className="text-sm tracking-wider">{runningMonth} মাসের পেমেন্ট</p>
            <div className="flex items-baseline justify-center gap-2 mt-1">
              <span className="text-4xl sm:text-5xl">৳</span>
              <span className="text-4xl sm:text-5xl font-bold select-none">
                {amount}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="flex-1 overflow-auto p-5 sm:p-8 space-y-8">
          
          <div>
            <h3 className="font-semibold text-gray-700 text-xl sm:text-2xl mb-4">মোবাইল ব্যাংকিং</h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {mobileOptions.map((opt) => (
                <button 
                  key={opt.name} 
                  onClick={() => handleSelectMobile(opt)}
                  className="cursor-pointer bg-white border border-gray-200 hover:border-pink-400 hover:shadow-xl transition-all rounded-2xl p-4 sm:p-6 flex flex-col items-center active:scale-95"
                >
                  <img src={opt.logo} alt={opt.name} className="h-16 sm:h-20 mb-3 object-contain" />
                  <span className="font-semibold text-sm sm:text-base text-gray-800">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 text-xl sm:text-2xl mb-4">ক্রেডিট / ডেবিট কার্ড</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {cardOptions.map((opt) => (
                <button 
                  key={opt.name} 
                  onClick={() => handleSelectCard(opt)}
                  className="cursor-pointer bg-white border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-4 sm:p-6 flex flex-col items-center active:scale-95"
                >
                  <img src={opt.logo} alt={opt.name} className="h-12 sm:h-16 mb-3 object-contain" />
                  <span className="font-semibold text-sm sm:text-base text-gray-800">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 text-xl sm:text-2xl mb-4">নগদ পেমেন্ট</h3>
            <button 
              onClick={handleCash}
              className="cursor-pointer w-full bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all rounded-2xl p-5 sm:p-6 flex items-center gap-5 active:scale-95"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                💵
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-lg sm:text-xl text-gray-800">Cash on Delivery</p>
                <p className="text-gray-500 text-sm sm:text-base leading-tight mt-1">
                  অফিসে / ডেলিভারির সময় নগদে পেমেন্ট করুন
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 border-t bg-gray-50">
          <button
            className="bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-700 w-full shadow-lg cursor-pointer text-sm sm:text-base"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedMethod && !isSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold">পেমেন্ট সম্পন্ন করুন</h2>
                <button 
                  onClick={resetAll}
                  className="bg-red-500 hover:bg-red-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-2xl text-2xl flex items-center justify-center cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 text-center mb-8">
                <p className="text-gray-600 text-sm">{runningMonth} মাসের পেমেন্ট</p>
                <p className="text-4xl font-bold text-gray-900">৳ {amount}</p>
              </div>

              {paymentDetails.type === 'mobile' && (
                <div className="space-y-6">
                  <div className="bg-pink-50 border-2 border-dashed border-pink-300 rounded-2xl p-6 text-center">
                    <p className="font-medium text-pink-700">{paymentDetails.provider}</p>
                    <p className="text-3xl font-bold text-pink-800 mt-3">{paymentDetails.number}</p>
                    <p className="text-xs text-pink-600 mt-1">এই নাম্বারে টাকা পাঠান</p>
                  </div>

                  <input
                    type="text"
                    placeholder="Transaction ID দিন"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-5 py-4 border rounded-2xl focus:outline-none focus:border-pink-400 text-center text-lg"
                  />

                  <button
                    onClick={handlePaymentConfirm}
                    disabled={loading}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 rounded-2xl text-lg transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? "প্রসেসিং..." : "Confirm Payment"}
                  </button>
                </div>
              )}

              {paymentDetails.type === 'card' && (
                <div className="space-y-4">
                  <input type="text" placeholder="Card Number" className="w-full px-5 py-4 border rounded-2xl focus:outline-none focus:border-blue-500" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="px-5 py-4 border rounded-2xl focus:outline-none focus:border-blue-500" />
                    <input type="text" placeholder="CVV" className="px-5 py-4 border rounded-2xl focus:outline-none focus:border-blue-500" />
                  </div>
                  <button
                    onClick={handlePaymentConfirm}
                    disabled={loading}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-2xl text-lg transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? "প্রসেসিং..." : `Pay ৳${amount}`}
                  </button>
                </div>
              )}

              {paymentDetails.type === 'cash' && (
                <button
                  onClick={handlePaymentConfirm}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl text-lg transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? "প্রসেসিং..." : "Confirm Cash Payment"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4">
          <div id="receipt" className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black p-8 text-center">
              <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold">পেমেন্ট সফল হয়েছে!</h2>
              <p className="text-blue-700 mt-1">TX ID: <span className="font-mono text-xl font-bold">{transactionId}</span></p>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex justify-between text-lg">
                <span className="text-gray-500">মোট টাকা</span>
                <span className="font-bold">৳ {amount}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-500">মেথডঃ</span>
                <span className="font-semibold">{paymentDetails.provider}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-500">তারিখঃ</span>
                <span className="font-medium">{formatBengaliDate(new Date())}</span>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button 
                onClick={handlePrintReceipt} 
                className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-semibold cursor-pointer hover:bg-emerald-700 transition-colors"
              >
                🖨️ Print Receipt
              </button>
              <button 
                onClick={resetAll} 
                className="flex-1 border bg-gray-900 text-white py-4 rounded-2xl font-semibold cursor-pointer hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;