const Home = () => {
  return (
    <div className="min-h-[80vh] bg-linear-to-br from-red-50 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold text-red-700 mb-6 leading-tight">
          Give Blood,<br />Save Lives
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Connecting generous donors with those in need across Bangladesh
        </p>
        
        <div className="flex justify-center gap-6">
          <a 
            href="/register" 
            className="bg-red-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition"
          >
            Join as a Donor
          </a>
          <a 
            href="/search" 
            className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition"
          >
            Search Donors
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;