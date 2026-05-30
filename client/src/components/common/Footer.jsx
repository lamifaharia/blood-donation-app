const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-between gap-12 border-b border-neutral-content/10 pb-12">
          
          {/* Brand */}
          <div className="w-full lg:w-1/4">
            <div className="text-3xl font-bold flex items-center gap-2 mb-4">🩸 BloodLink</div>
            <p className="opacity-70 text-sm">
              BloodLink Industries Ltd. Providing reliable blood donation coordination since 2026.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-24">
            <nav className="flex flex-col gap-3">
              <h6 className="font-bold text-error uppercase text-sm tracking-widest">Services</h6>
              <a className="link link-hover text-sm">Find Donors</a>
              <a className="link link-hover text-sm">Request Blood</a>
              <a className="link link-hover text-sm">Donation History</a>
            </nav>

            <nav className="flex flex-col gap-3">
              <h6 className="font-bold text-error uppercase text-sm tracking-widest">Company</h6>
              <a className="link link-hover text-sm">About us</a>
              <a className="link link-hover text-sm">Contact</a>
              <a className="link link-hover text-sm">Privacy Policy</a>
            </nav>

            <nav className="flex flex-col gap-3">
              <h6 className="font-bold text-error uppercase text-sm tracking-widest">Stay Updated</h6>
              <div className="join">
                <input 
                  type="text" 
                  placeholder="email@gmail.com" 
                  className="input input-bordered join-item w-48 bg-neutral-content/10 border-neutral-content/20" 
                />
                <button className="btn btn-error text-white join-item">Sub</button>
              </div>
            </nav>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 text-center opacity-50 text-sm">
          <p>© 2026 BloodLink Industries Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;