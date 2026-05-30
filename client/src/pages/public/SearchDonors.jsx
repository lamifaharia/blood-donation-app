import { useState } from 'react';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const districtsData = [
  { name: 'Dhaka', upazilas: ['Mirpur', 'Gulshan', 'Uttara', 'Dhanmondi'] },
  { name: 'Chittagong', upazilas: ['Pahartali', 'Kotwali', 'Hathazari'] },
  { name: 'Sylhet', upazilas: ['South Surma', 'Beanibazar'] }
];

const SearchDonors = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    district: '',
    upazila: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);

    const mockDonors = [
      { id: 1, name: "Asif Rahman", bloodGroup: formData.bloodGroup || "O+", district: formData.district || "Dhaka", upazila: formData.upazila || "Mirpur", avatar: "https://i.pravatar.cc/150?u=1", phone: "017XXXXXXXX" },
      { id: 2, name: "Nusrat Jahan", bloodGroup: formData.bloodGroup || "A-", district: formData.district || "Dhaka", upazila: formData.upazila || "Gulshan", avatar: "https://i.pravatar.cc/150?u=2", phone: "018XXXXXXXX" },
      { id: 3, name: "Asif Rahman", bloodGroup: formData.bloodGroup || "O+", district: formData.district || "Dhaka", upazila: formData.upazila || "Mirpur", avatar: "https://i.pravatar.cc/150?u=1", phone: "017XXXXXXXX" },
      { id: 4, name: "Nusrat Jahan", bloodGroup: formData.bloodGroup || "A-", district: formData.district || "Dhaka", upazila: formData.upazila || "Gulshan", avatar: "https://i.pravatar.cc/150?u=2", phone: "018XXXXXXXX" },
      { id: 5, name: "Asif Rahman", bloodGroup: formData.bloodGroup || "O+", district: formData.district || "Dhaka", upazila: formData.upazila || "Mirpur", avatar: "https://i.pravatar.cc/150?u=1", phone: "017XXXXXXXX" },
      { id: 6, name: "Nusrat Jahan", bloodGroup: formData.bloodGroup || "A-", district: formData.district || "Dhaka", upazila: formData.upazila || "Gulshan", avatar: "https://i.pravatar.cc/150?u=2", phone: "018XXXXXXXX" }
    
    ];

    setSearchResults(mockDonors);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-base-content mb-4">Find Blood Donors</h1>
        <p className="text-base-content/70 text-lg">Search for available donors in your area to save lives.</p>
      </div>

      <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl border border-base-200 mb-12">
        <div className="card-body">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Blood Group</span></label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="select select-bordered w-full">
                <option value="">Any Group</option>
                {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">District</span></label>
              <input 
                list="district-options"
                autoComplete="off"
                type="text" 
                name="district" 
                value={formData.district} 
                onChange={handleChange} 
                placeholder="e.g. Dhaka" 
                className="input input-bordered w-full" 
              />
              <datalist id="district-options">
                {districtsData.map(d => <option key={d.name} value={d.name} />)}
              </datalist>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Upazila</span></label>
              <input 
                list="upazila-options"
                autoComplete="off"
                type="text" 
                name="upazila" 
                value={formData.upazila} 
                onChange={handleChange} 
                placeholder="e.g. Mirpur" 
                className="input input-bordered w-full" 
              />
              <datalist id="upazila-options">
                {districtsData.flatMap(d => d.upazilas).map(u => <option key={u} value={u} />)}
              </datalist>
            </div>

            <div className="md:col-span-3 mt-2">
              <button type="submit" className="btn btn-error btn-block text-white text-lg">Search Donors</button>
            </div>
          </form>
        </div>
      </div>

      {searched && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Donors</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(donor => (
                <div key={donor.id} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition">
                  <div className="card-body p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full ring ring-error ring-offset-2">
                          <img src={donor.avatar} alt={donor.name} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{donor.name}</h3>
                        <div className="badge badge-error text-white font-bold">{donor.bloodGroup}</div>
                      </div>
                    </div>
                    <p className="text-base-content/70 font-medium">📍 {donor.district}, {donor.upazila}</p>
                    <p className="text-sm text-base-content/50 mt-2 font-mono">📞 {donor.phone}</p>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-sm btn-outline btn-error">Contact</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card bg-base-100 shadow-sm p-12 text-center border border-base-200">
              <p className="text-base-content/60">No donors found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDonors;