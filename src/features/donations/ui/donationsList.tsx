import { useDonationsListState } from "../model/use-donations-list-state";
import DonationItem from "./donationItem";

const DonationList = () => {
  const { items } = useDonationsListState();
  console.log(items);

  return (
    <ul>
      {items?.map((item) => (
        <DonationItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default DonationList;
