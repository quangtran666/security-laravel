import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./routes/login/login.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route path="auth" >
            <Route path="login" element={ <Login /> } />
        </Route>
    </Routes>
  </BrowserRouter>,
)
