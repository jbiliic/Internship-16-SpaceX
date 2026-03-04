import { routes } from './constants/routes.ts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/mainPage/MainPage.tsx'
import { NavBar } from './components/navBar/NavBar.tsx'
import { LandingPage } from './pages/landingPage/LandingPage.tsx'
import { LandingDetailsPage } from './pages/landingDetails/LandingDetailsPage.tsx'
import { ShipsPage } from './pages/shipsPage/ShipsPage.tsx'
export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={routes.HOME} element={<MainPage />} />
          <Route path={routes.LAUNCH} element={<LandingPage />} />
          <Route path={routes.SHIP} element={<ShipsPage />} />
          <Route path={routes.LAUNCH_DETAILS} element={<LandingDetailsPage />} />
          <Route path={routes.SHIP_DETAILS} element={<div>Ship Details</div>} />
          <Route path={routes.NOT_FOUND} element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}