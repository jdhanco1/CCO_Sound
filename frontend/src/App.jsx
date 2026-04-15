import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Leadership from './pages/Leadership';
import Connect from './pages/Connect';
import Ministry from './pages/Ministry';
import Sermons from './pages/Sermons';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Missions from './pages/Missions';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Mission />} />
        <Route path="missions" element={<Missions />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="connect" element={<Connect />} />
        <Route path="connect/:slug" element={<Ministry />} />
        <Route path="sermons" element={<Sermons />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
