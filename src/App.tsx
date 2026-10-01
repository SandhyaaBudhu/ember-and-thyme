import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ToastProvider } from './components/UI'
import Home from './pages/Home'
import MenuPage from './pages/Menu'
import Reservations from './pages/Reservations'
import Story from './pages/Story'
import Events from './pages/Events'

export default function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL}><ToastProvider><Routes><Route element={<Layout />}><Route index element={<Home />} /><Route path="menu" element={<MenuPage />} /><Route path="reservations" element={<Reservations />} /><Route path="story" element={<Story />} /><Route path="events" element={<Events />} /><Route path="*" element={<section className="container not-found"><p className="eyebrow">A LITTLE DETOUR</p><h1>Let’s find<br /><em>your table.</em></h1><p>This page seems to have wandered off.</p><Link className="button" to="/">Back to the beginning</Link></section>} /></Route></Routes></ToastProvider></BrowserRouter>
}
