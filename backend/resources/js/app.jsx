import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css';
import Register from './Pages/Register/Register.jsx';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}/${name}.jsx`]
   
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
