import { Button } from "@/shared/ui/button";

import { Link } from "react-router";

export const WheelButton = () => {
  return (
    <Link to="/wheel">
      <Button
        variant={"default"}
        className="absolute bottom-15 right-4 cursor-pointer"
      >
        Wheel
      </Button>
    </Link>
  );
};
