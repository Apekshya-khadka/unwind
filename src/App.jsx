import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import LiveChat from "./components/LiveChat.jsx";
import Home from "./pages/Home.jsx";
import CabinsPage from "./pages/CabinsPage.jsx";
import CabinDetailPage from "./pages/CabinDetailPage.jsx";
import ExperiencesPage from "./pages/ExperiencesPage.jsx";
import ExperienceDetailPage from "./pages/ExperienceDetailPage.jsx";
import GiftStayPage from "./pages/GiftStayPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import InfoPage from "./pages/InfoPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import SubscribersPage from "./pages/SubscribersPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cabins" element={<CabinsPage />} />
          <Route path="/cabins/:id" element={<CabinDetailPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
          <Route path="/gift-a-stay" element={<GiftStayPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/activities/:slug" element={<ActivityPage />} />
          <Route path="/info/:slug" element={<InfoPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/subscribers" element={<AdminRoute><SubscribersPage /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><BookingsPage /></AdminRoute>} />
          <Route path="/admin/messages" element={<AdminRoute><MessagesPage /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
      <LiveChat />
    </div>
  );
}
