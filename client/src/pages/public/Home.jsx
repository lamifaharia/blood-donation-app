const Home = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-red-700 mb-6">
          Give Blood, Save Lives
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Connecting generous donors with those in need across Bangladesh
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="/register" className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium">
            Join as a Donor
          </a>
          <a href="/search" className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full text-lg font-medium">
            Search Donors
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;