import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./routes/login/login.tsx";
import MainLayout from "./layouts/mainLayout.tsx";
import Home from "./routes/home/home.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route element={ <MainLayout /> }>
            <Route path="auth" >
                <Route path="login" element={ <Login /> } />
            </Route>
            <Route path="home" >
                <Route index element={<Home />} />
            </Route>
        </Route>
    </Routes>
  </BrowserRouter>,
)
