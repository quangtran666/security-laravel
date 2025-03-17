import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./routes/login/Login.tsx";
import MainLayout from "./layouts/mainLayout.tsx";
import Home from "./routes/home/Home.tsx";
import Register from "./routes/register/Register.tsx";
import EmailVerificationPrompt from "./routes/email-verification-prompt/EmailVerificationPrompt.tsx";
import VerifyEmail from "./routes/verify-email/VerifyEmail.tsx";
import PasswordResetLink from "./routes/password-reset-link/PasswordResetLink.tsx";
import NewPassword from "./routes/new-password/NewPassword.tsx";
import OAuth2Callback from "./routes/callback/OAuth2Callback.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        {/* Move the callback route out of MainLayout temporarily.  */}
        <Route path="auth/oauth2/callback/:provider" element={ <OAuth2Callback /> } />
        <Route element={ <MainLayout /> }>
            <Route path="auth" >
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
                <Route path="email-verification" element={ <EmailVerificationPrompt />} />
                <Route path="verify-email" element={ <VerifyEmail /> } />
                <Route path="password-reset" element={ <PasswordResetLink /> } />
                <Route path="new-password" element={ <NewPassword /> } />
            </Route>
            <Route path="home" >
                <Route index element={<Home />} />
            </Route>
        </Route>
    </Routes>
  </BrowserRouter>,
)
