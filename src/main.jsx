import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App.jsx'

const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 3),
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
