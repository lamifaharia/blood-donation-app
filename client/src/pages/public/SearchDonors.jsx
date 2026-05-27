import { useState } from 'react';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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

    // Mock search results (later connect to backend)
    const mockDonors = [
      {
        id: 1,
        name: "Asif Rahman",
        bloodGroup: formData.bloodGroup || "O+",
        district: formData.district || "Dhaka",
        upazila: formData.upazila || "Mirpur",
        avatar: "https://i.ibb.co.com/xyz123/avatar1.jpg",
        phone: "017XXXXXXXX"
      },
      {
        id: 2,
        name: "Nusrat Jahan",
        bloodGroup: formData.bloodGroup || "A-",
        district: formData.district || "Dhaka",
        upazila: formData.upazila || "Gulshan",
        avatar: "https://i.ibb.co.com/xyz123/avatar2.jpg",
        phone: "018XXXXXXXX"
      }
    ];

    setSearchResults(mockDonors);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Find Blood Donors</h1>
        <p className="text-gray-600">Search available donors near you</p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm mb-12">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="">Any Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g. Dhaka"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upazila</label>
            <input
              type="text"
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              placeholder="e.g. Mirpur"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Search Donors
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {searched && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Donors</h2>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(donor => (
                <div key={donor.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={donor.avatar} 
                      alt={donor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-100"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{donor.name}</h3>
                      <p className="text-red-600 font-bold text-xl">{donor.bloodGroup}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">{donor.district}, {donor.upazila}</p>
                  <p className="text-sm text-gray-500 mt-4">📞 {donor.phone}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-20">No donors found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDonors;