import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Courses from './pages/Courses'
import Enterprise from './pages/Enterprise'
import Newsletter from './pages/Newsletter'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/newsletter" element={<Newsletter />} />
      </Routes>
    </BrowserRouter>
  )
}
