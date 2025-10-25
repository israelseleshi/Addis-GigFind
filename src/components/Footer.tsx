export function Footer() {
  return (
    <footer className="bg-[#0A2239] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFB300] to-[#FF8F00]">
                <span className="text-[#0A2239]">AG</span>
              </div>
              <span>Addis GigFind</span>
            </div>
            <p className="text-sm text-white/70">
              Connecting Addis — One Gig at a Time
            </p>
          </div>

          <div>
            <h4 className="mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Browse Gigs</li>
              <li className="hover:text-white cursor-pointer">How It Works</li>
              <li className="hover:text-white cursor-pointer">Success Stories</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Post a Gig</li>
              <li className="hover:text-white cursor-pointer">Find Talent</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/70">
          <p>© 2025 Addis GigFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
