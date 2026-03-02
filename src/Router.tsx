import {routes} from './constants/routes.ts'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
export const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={routes.HOME} element={<div>Home</div>} />
                <Route path={routes.LAUNCH} element={<div>Launch</div>} />
                <Route path={routes.SHIP} element={<div>Ship</div>} />
                <Route path={routes.LAUNCH_DETAILS} element={<div>Launch Details</div>} />
                <Route path={routes.SHIP_DETAILS} element={<div>Ship Details</div>} />
                <Route path={routes.NOT_FOUND} element={<div>Not Found</div>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}