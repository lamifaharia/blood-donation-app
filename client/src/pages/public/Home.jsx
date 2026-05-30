const Home = () => {
  return (
    <div className="hero min-h-[80vh] bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 p-8">
        
        <img
          src="/home.png"
          alt="Blood donation process"
          className="max-w-lg w-full rounded-2xl shadow-2xl"
        />

        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-base-content mb-6 leading-tight">
            Give Blood, <br />
            <span className="text-error">Save Lives</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 mb-10">
            Connecting generous donors with those in need across Bangladesh.
            Join our community of heroes today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <a
              href="/register"
              className="btn btn-error btn-lg text-white px-10 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Join as a Donor
            </a>
            <a
              href="/search"
              className="btn btn-outline btn-lg btn-error px-10 rounded-full hover:scale-105 transition-transform"
            >
              Search Donors
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;