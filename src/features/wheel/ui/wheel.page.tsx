import NewWheel from "./newWheel";
import ClassicWheel from "./wheel";

import WheelItems from "./wheelItems";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export const WheelPage = () => {
  return (
    <div className="flex items-center justify-between mt-5">
      <WheelItems />
      <Tabs defaultValue="classic">
        <TabsList>
          <TabsTrigger value="classic">Classic</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="classic">
          <ClassicWheel />
        </TabsContent>
        <TabsContent value="new">
          <NewWheel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
