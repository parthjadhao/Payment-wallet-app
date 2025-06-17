export default function Hero() {
    return (
      <section className="w-full min-h-screen bg-background to-blue-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left: Text Section */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Simplify Payments with <span className="text-blue-500">Your Wallet</span>
            </h1>
            <p className="text-lg text-white mb-8">
              Send money, track expenses, and stay in control—secure and fast. Your all-in-one digital wallet is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-indigo-700 transition">
                Get Started
              </button>
              <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-xl text-lg flex items-center gap-2 hover:bg-indigo-50 transition">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
  
          {/* Right: Illustration or App Preview */}
          <div className="w-full">
            <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-xl border border-gray-100">
              {/* Simulated App Mockup */}
              <div className="text-center">
                <div className="text-blue-500 text-3xl font-bold mb-2">₹12,450.00</div>
                <div className="text-sm text-white mb-6">Current Balance</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-white">
                  <span>Grocery Store</span>
                  <span>-₹1,200</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Electricity Bill</span>
                  <span>-₹850</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Received from Raj</span>
                  <span className="text-green-600">+₹2,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }