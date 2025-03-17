import {useNavigate, useParams, useSearchParams} from "react-router";
import {useEffect} from "react";
import {handleOAuth2Callback} from "../../services/authService.ts";

function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const {provider} = useParams<{ provider: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const processCallback = async () => {
            if (!provider)
            {
                throw new Error("Provider không được xác định");
            }

            if (!searchParams.has("code"))
            {
                throw new Error("Code không được xác định");
            }

            await handleOAuth2Callback(provider, searchParams.get("code")!);

            navigate("/home");
        }

        processCallback();
    }, []);

    return (
        <></>
    );
}

export default OAuth2Callback;