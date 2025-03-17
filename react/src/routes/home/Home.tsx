import Button from "../../components/forms/Button.tsx";
import {logout} from "../../services/authService.ts";
import {useNavigate} from "react-router";

function Home() {
    const navigate = useNavigate();

    return (
        <Button
            onClick={async () => {
                await logout();
                navigate("/auth/login");
            }}
        >
            Logout
        </Button>
    );
}

export default Home;