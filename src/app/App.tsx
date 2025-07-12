import { Toaster } from "@/shared/ui/sonner";
import { Outlet } from "react-router";

function App() {
  return (
    <main className="flex flex-col h-screen">
      <Outlet />
      <Toaster position="bottom-right" />
    </main>
  );
}

export default App;
