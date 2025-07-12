import React from "react";
import { useDonationsListState } from "../model/use-donations-list-state";

type Props = {};

const DonationList = (props: Props) => {
  const { socket } = useDonationsListState();

  return <div>DonationList</div>;
};

export default DonationList;
