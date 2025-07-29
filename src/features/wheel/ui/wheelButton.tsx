import { Button } from "@/shared/ui/button";
import React from "react";
import { Link } from "react-router";

type Props = {};

export const WheelButton = (props: Props) => {
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
