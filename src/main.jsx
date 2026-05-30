import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Fix --vh CSS variable for true mobile viewport height (avoids browser chrome overlap)
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('resize', setVh, { passive: true });
window.addEventListener('orientationchange', setVh, { passive: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
