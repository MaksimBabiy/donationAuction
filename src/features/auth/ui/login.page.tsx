import { Button } from "@/shared/ui/button";
import { useStateLogin } from "../model/use-state-login";

const LoginPage = () => {
  const { code, link, mutate, isPending } = useStateLogin();

  const handleLogin = () => {
    window.location.href = link;
  };

  if (code) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Button
          type="submit"
          variant={"link"}
          onClick={() => mutate(code)}
          disabled={isPending}
        >
          Get Access Token
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button type="submit" variant={"link"} onClick={handleLogin}>
        Login via Donations Alerts
      </Button>
      <p className="text-sm text-gray-500 mt-4">
        You will be redirected to Donations Alerts for authentication.
      </p>
    </div>
  );
};

export default LoginPage;
