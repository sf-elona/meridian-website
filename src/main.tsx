import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// StrictMode intentionally omitted: this experience is driven by imperative
// GSAP / Lenis timelines whose double-invocation under StrictMode fights the
// pinned ScrollTriggers. Effects are still cleaned up properly.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
