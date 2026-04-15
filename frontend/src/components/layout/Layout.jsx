import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const { i18n } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
