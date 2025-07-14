import LogoutBtn from "@/features/auth/ui/logoutBtn";
import Avatar from "@/features/avatar/ui/avatar";
import { useIsAuthenticated } from "@/shared/hooks/useAuth";

const Header = () => {
  const isAuth = useIsAuthenticated();
  return (
    <header className="flex items-center justify-between px-8 py-3 bg-white shadow-md min-h-[64px]">
      <div className="flex items-center">
        <img src="/vite.svg" alt="Logo" className="h-10" />
        <span className="ml-3 font-bold text-xl text-gray-900 select-none">
          Donation Auk
        </span>
      </div>
      {isAuth && (
        <div className="flex gap-5">
          <LogoutBtn />
          <Avatar />
        </div>
      )}
    </header>
  );
};

export default Header;
