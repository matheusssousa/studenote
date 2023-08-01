import React, { useEffect, useState } from "react";
import Api from "../../services/api";
import Loading from "../../components/Loading";
import { PlusCircle } from "@phosphor-icons/react";
import AddDisciplinas from "../../components/ModalDisciplinas";
import DisciplinaCard from "../../components/DisciplinaCard";

export default function Disciplinas() {
    const [loading, setLoading] = useState(false);
    const [disciplinas, setDisciplinas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchDisciplinas = async () => {
        setLoading(true);
        const res_disciplina = await Api.get('disciplina');
        setDisciplinas(res_disciplina.data);
        setLoading(false);
    };
    
    const openModal = (typeModal) => {
        setShowModal(typeModal);
    }
    
    const closeModal = () => {
        setShowModal(false);
    }
    
    const handleDisciplinasChange = () => {
        fetchDisciplinas();
    }
    
    useEffect(() => {
        fetchDisciplinas();
    }, [])

    return (
        <div className="body-page">
            {loading ? <Loading loading={loading} /> : (<>
                <div className="header-page flex justify-between">
                    <h1 className="font-semibold text-2xl text-[#524B4B]">Minhas Disciplinas</h1>
                    <button className="flex px-2 py-2 gap-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300" onClick={() => openModal('Add')}>
                        <PlusCircle size={20} />
                        Adicionar disciplina
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {disciplinas.length === 0 ? (
                        <p className="text-center text-sm font-semibold text-[#524B4B]">Você não possui disciplinas cadastradas.</p>
                    ) : (
                        disciplinas.map((disciplina) => (
                            <DisciplinaCard
                                key={disciplina.id}
                                disciplina={disciplina}
                                filter={false}
                                onDisciplinasChange={handleDisciplinasChange}
                            />
                        ))
                    )}
                </div>
                {showModal === 'Add' && (
                    <AddDisciplinas
                        showModal={showModal === 'Add'}
                        closeModal={closeModal}
                        setShowModal={setShowModal}
                        onDisciplinasChange={handleDisciplinasChange}
                    />
                )}
            </>)}
        </div>
    )
}