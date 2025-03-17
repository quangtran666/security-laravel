import Button from "../../components/forms/Button.tsx";
import {logout} from "../../services/authService.ts";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {getMe} from "../../services/userService.ts";

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            const response = await getMe();
            setUser(response.data);
        }

        getUser();
    }, []);

    return (
        <>
            <div>
                {user && (
                    <span>{user.name}</span>
                )}
            </div>
            <Button
                onClick={async () => {
                    await logout();
                    navigate("/auth/login");
                }}
            >
                Logout
            </Button>
        </>
    );
}

export default Home;