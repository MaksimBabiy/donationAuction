import { Button } from "@/shared/ui/button";
import { useStateLogin } from "../model/use-state-login";

const LogoutBtn = () => {
  const { logOut } = useStateLogin();
  return (
    <Button variant={"default"} onClick={logOut}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
