import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { App as CapApp } from "@capacitor/app";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SampleDataBanner from "./components/SampleDataBanner";
import ItemListPage from "./pages/ItemListPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import InquiryPage from "./pages/InquiryPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const listener = CapApp.addListener("backButton", () => {
      if (location.pathname === "/") {
        CapApp.exitApp();
      } else {
        navigate(-1);
      }
    });
    return () => {
      listener.then((l) => l.remove());
    };
  }, [location.pathname, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SampleDataBanner />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ItemListPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
