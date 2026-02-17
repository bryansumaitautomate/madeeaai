import MadeeaCTA from "./MadeeaCTA";
import madeeaLogo from "@/assets/madeea-logo.png";

export const AuditNavbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-primary/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={madeeaLogo} alt="Madeea" className="h-6" />
        </a>
        <MadeeaCTA label="Book Now" onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/0qkIXW7E44BcuiWW7g1k', '_blank')} />
      </div>
    </nav>
  );
};
