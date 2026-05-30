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
      {/* Hero Header */}
      <div className="hero bg-success rounded-3xl p-8 text-white shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Support Our Mission</h1>
          <p className="mt-2 text-lg opacity-90">Every taka helps us save more lives.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 border border-base-200 shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Make a Donation</h2>
            <div className="form-control w-full">
              <label className="label"><span className="label-text">Donation Amount (৳)</span></label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input input-bordered w-full text-2xl focus:input-success"
                placeholder="500"
              />
              <button
                onClick={handleDonate}
                className="btn btn-success text-white mt-6 w-full text-lg"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>

        {/* Contributions & Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Total Funds Stat */}
          <div className="stats shadow w-full bg-base-100 border border-base-200">
            <div className="stat">
              <div className="stat-title font-semibold">Total Funds Raised</div>
              <div className="stat-value text-success">৳{totalFunds}</div>
              <div className="stat-desc">Combined donor contributions</div>
            </div>
          </div>

          {/* Recent Contributions */}
          <div className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-0">
              <h2 className="p-6 pb-0 font-bold text-xl">Recent Contributions</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Donor</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundings.map(f => (
                      <tr key={f.id}>
                        <td className="font-semibold">{f.name}</td>
                        <td className="text-success font-bold">৳{f.amount}</td>
                        <td className="text-base-content/70">{f.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;