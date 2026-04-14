import Image from "next/image";
import FooterImg from "../assets/logo-xl.png";
import Fb from "../assets/facebook.png";
import Ins from "../assets/instagram.png";
import X from "../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Logo and Name */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={FooterImg}
            alt="KeenKeeper Logo"
            width={200}
            height={200}
          />
        </div>

        {/* Tagline */}
        <p className="text-gray-300 max-w-xl mb-8 text-sm md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-gray-400">
            Social Links
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image src={Ins} alt="Instagram" width={32} height={32} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image src={Fb} alt="Facebook" width={32} height={32} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image src={X} alt="Twitter" width={32} height={32} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;