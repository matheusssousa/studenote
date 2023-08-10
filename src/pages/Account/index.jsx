import React, { useState } from "react";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/Authcontext";

export default function Account() {
    const [loading, setLoading] = useState(false);
    const { userData } = useAuth();

    return (
        <div className="body-page">
            {loading ? <Loading loading={loading} /> :
                <>
                    {console.log(userData)}
                </>
            }
        </div>
    )
}