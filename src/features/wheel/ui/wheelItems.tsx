import { useWheelItemsState } from "../model/use-wheelItems-state";

const WheelItems = () => {
  const { items } = useWheelItemsState();
  return (
    <ul className="space-y-2  p-4 w-full max-w-md">
      {items?.map((item) => (
        <li
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 1) 66%, ${item.color} 100%)`,
          }}
          key={item.id}
          className={`relative flex items-center justify-between rounded-md overflow-hidden cursor-pointer`}
        >
          {/* Content */}
          <div className="flex-1 px-4 py-2 text-white relative z-10">
            {item.title}
          </div>
          <div className="flex items-center px-3 py-2 space-x-3 text-white relative z-10">
            <span>{item.price}</span>
            <div className="border-l border-white/30 h-5"></div>
            <span>{item.percent} %</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WheelItems;
