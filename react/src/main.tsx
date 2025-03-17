import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./routes/login/login.tsx";
import MainLayout from "./layouts/mainLayout.tsx";
import Home from "./routes/home/home.tsx";
import Register from "./routes/register/register.tsx";
import EmailVerificationPrompt from "./routes/emailVerificationPrompt/emailVerificationPrompt.tsx";
import VerifyEmail from "./routes/verifyEmail/verifyEmail.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route element={ <MainLayout /> }>
            <Route path="auth" >
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
                <Route path="email-verification" element={ <EmailVerificationPrompt />} />
                <Route path="verify-email" element={ <VerifyEmail /> } />
            </Route>
            <Route path="home" >
                <Route index element={<Home />} />
            </Route>
        </Route>
    </Routes>
  </BrowserRouter>,
)
