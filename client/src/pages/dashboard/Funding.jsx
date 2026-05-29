import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Funding = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [fundings, setFundings] = useState([
    { id: 1, name: "Rahim Khan", amount: 500, date: "2026-05-20" },
    { id: 2, name: "Fatima Begum", amount: 1000, date: "2026-05-22" },
  ]);

  const handleDonate = () => {
    if (!amount || amount <= 0) {
      Swal.fire('Error', 'Please enter a valid amount', 'error');
      return;
    }

    // Mock funding 
    const newFunding = {
      id: Date.now(),
      name: user?.name || user?.email?.split('@')[0],
      amount: parseInt(amount),
      date: new Date().toISOString().split('T')[0]
    };

    setFundings([newFunding, ...fundings]);
    setAmount('');

    Swal.fire({
      title: 'Thank You!',
      text: `Thank you for donating ৳${amount}`,
      icon: 'success'
    });
  };

  const totalFunds = fundings.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-8">
        <h1 className="text-4xl font-bold">Support Our Mission</h1>
        <p className="text-emerald-100 mt-3 text-lg">Every taka helps us save more lives</p>
      </div>

      {/* Donate Form */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-6">Make a Donation</h2>
        
        <div className="max-w-md">
          <label className="block text-sm font-medium mb-2">Donation Amount (৳)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-4 border border-gray-300 rounded-xl text-2xl focus:border-green-500"
            placeholder="500"
          />

          <button
            onClick={handleDonate}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Recent Fundings */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recent Contributions</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Donor</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {fundings.map(f => (
                <tr key={f.id}>
                  <td className="px-6 py-4 font-medium">{f.name}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">৳{f.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Funds */}
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-600">Total Funds Raised</p>
        <p className="text-5xl font-bold text-green-600 mt-2">৳{totalFunds}</p>
      </div>
    </div>
  );
};

export default Funding;