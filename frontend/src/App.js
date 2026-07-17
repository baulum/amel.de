import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="grain">
      <SmoothScroll>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
