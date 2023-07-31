import { X } from "@phosphor-icons/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';
import Api from "../../services/api";
import AddDisciplinas from "../ModalDisciplinas";

export default function DisciplinaCard({ disciplina, disciplinaSelecionada, onClick, filter }) {
    const [showModal, setShowModal] = useState(false);

    const modalType = (tipoModal) => {
        setShowModal(tipoModal);
        console.log(showModal)
    }   

    const closeModal = () => {
        setShowModal(null);
    };

    const DeleteDisciplina = (disciplina) => {
        console.log(disciplina)
        // Api.delete(`/disciplina/${disciplina}`)
        //     .then(function (response) {
        //         console.log(response);
        //         toast.success("Disciplina deletada com sucesso!", {
        //             position: toast.POSITION.TOP_RIGHT,
        //             theme: "colored"
        //         });
        //         // window.location.reload();
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //         toast.error("Erro ao excluir disciplina.", {
        //             position: toast.POSITION.TOP_RIGHT,
        //             theme: "colored"
        //         });
        //     })

        setShowModal(false);
    }

    return (
        !filter ? <>
            <div className={`w-[15%] h-24 flex rounded-lg gap-2 shadow-md p-3 items-center justify-evenly bg-[#FFE500]`} key={disciplina.id}>
                <p className="font-semibold text-sm">{disciplina.nome}</p>
                <div className="w-px h-full bg-black"></div>
                <div className=" flex flex-col gap-3">
                    <button onClick={() => modalType('Delete')} className="font-semibold text-sm drop-shadow-md hover:text-white duration-300">
                        <TrashSimple size={20} />
                    </button>
                    <button onClick={() => modalType('Edit')} className="font-semibold text-sm drop-shadow-md hover:text-white duration-300">
                        <PencilSimple size={20} />
                    </button>
                </div>
                {showModal === 'Delete' && (
                    <div className="modal-overlay z-10">
                        <div className="w-1/3 h-1/6 bg-[#F1F1F1] rounded-lg p-4">
                            <h1 className="text-xl font-semibold text-[#263238] text-center">Excluir <i>{disciplina.nome}</i></h1>
                            <div className="w-full h-px bg-black opacity-10 my-2"></div>
                            <div className="flex h-2/3 w-full flex-col justify-between">
                                <p className="text-sm font-semibold text-[#263238]">Você deseja excluir as notas dessa disciplina?</p>
                                <div className="flex justify-end gap-2">
                                    <button className="font-semibold text-sm text-[#263238] bg-slate-300 rounded-md px-2 shadow-sm hover:shadow-md py-1 duration-300 hover:text-slate-50" onClick={() => setShowModal(false)}>
                                        Cancelar
                                    </button>
                                    <button onClick={DeleteDisciplina(disciplina.id)} className="font-semibold text-sm text-[#263238] bg-red-600 rounded-md px-2 shadow-sm hover:shadow-md py-1 duration-300 hover:text-slate-50">
                                        Confirmar e deletar as anotações pertecentes
                                    </button>
                                    <button onClick={DeleteDisciplina(disciplina.id)} className="font-semibold text-sm text-[#263238] bg-red-600 rounded-md px-2 shadow-sm hover:shadow-md py-1 duration-300 hover:text-slate-50">
                                        Confirmar e manter as anotações pertecentes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showModal === 'Edit' && (
                    <AddDisciplinas
                        showModal={showModal}
                        closeModal={closeModal}
                        disciplina={disciplina}
                        setShowModal={setShowModal}
                    />
                )}
            </div>
        </> :
            <button
                type="button"
                className={`px-2 py-1 flex gap-1 items-center rounded-md shadow-sm bg-[#FFE500]`}
                onClick={() => onClick(disciplina)}>
                <p className={`font-semibold text-xs`}>
                    {disciplina.nome}
                </p>
                {disciplinaSelecionada && (
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onClick(null); }}>
                        <X size={15} weight="bold" />
                    </button>
                )}
            </button>
    );
}
