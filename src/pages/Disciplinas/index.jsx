import React, { useEffect, useState } from "react";
import Api from "../../services/api";
import Loading from "../../components/Loading";

export default function Disciplinas(params) {
    const [loading, setLoading] = useState(false);
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        const fetchDisciplinas = async () => {
            setLoading(true);
            const res_categoria = await Api.get('categoria');
            setDisciplinas(res_categoria.data);
            setLoading(false);
        };
        fetchDisciplinas();
    }, [])
    return (
        <div className="body-page">
            {loading ? <Loading loading={loading} /> : (<div></div>)}
        </div>
    )
}