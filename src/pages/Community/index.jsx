import React, { useEffect, useState } from "react";
import Api from "../../services/api";
import Loading from "../../components/Loading";
import NotaCard from "../../components/NotaCard";

export default function Community() {
    const [anotacoes, setAnotacoes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAnotacoes = async () => {
        setLoading(true);
        try {
            const response = await Api.get('community')
            setAnotacoes(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnotacoes();
    }, [])

    return (
        <div className="body-page">
            {loading ? <Loading loading={loading} /> : <>
                <h1 className="font-semibold text-2xl text-[#524B4B]">Comunidade</h1>
                <div>
                    {anotacoes.length === 0 ? (
                        <p className="text-center text-sm font-semibold text-[#524B4B]">Nenhuma anotação na comunidade.</p>
                    ) : (
                        anotacoes.map((anotacao) => (
                            <NotaCard
                                key={anotacao.id}
                                nota={anotacao}
                            />
                        ))
                    )}
                </div>
            </>}
        </div>
    )
}