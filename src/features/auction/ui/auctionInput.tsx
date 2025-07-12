import { Button } from "@/shared/ui/button";
import { useInputState } from "../model/use-input-state";

const AuctionInput = () => {
  const { title, setTitle, price, setPrice, handleAddItem } = useInputState();

  return (
    <form className="flex flex-col sm:flex-row gap-4 items-end bg-white p-6 rounded-xl shadow max-w-xl w-full">
      <div className="flex flex-col w-full">
        <label className="mb-1 text-sm text-gray-700 font-medium">
          Название
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
          placeholder="Введите название лота"
        />
      </div>
      <div className="flex flex-col w-full max-w-[160px]">
        <label className="mb-1 text-sm text-gray-700 font-medium">Цена</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
          placeholder="₴"
          min={0}
        />
      </div>
      <Button type="button" variant="default" onClick={handleAddItem}>
        Добавить
      </Button>
    </form>
  );
};

export default AuctionInput;
