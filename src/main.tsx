import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DarkThemeProvider } from './providers/darkTheme/darkThemeContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkThemeProvider>
      <App />
    </DarkThemeProvider>
    
  </StrictMode>,
)
