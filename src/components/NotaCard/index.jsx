import React, { useState } from "react";
import Api from "../../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import AddNotaModal from "../ModalAnotações";

export default function NotaCard({ nota , categorias, disciplinas }) {
    const [showModal, setShowModal] = useState(false);

    const modalType = (tipoModal) => {
        setShowModal(tipoModal);
    }

    const DeleteNota = (event) => {
        event.preventDefault()

        Api.delete(`/notas/${nota.id}`)
            .then(function (response) {
                console.log(response);
                toast.success("Nota deletada com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
                toast.error("Erro ao excluir nota.", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
            })

        setShowModal(false);
    }

    return (
        <div className="w-[49.5%] h-56 rounded-xl border-[#524B4B] border-opacity-20 border bg-[#F1F1F1] flex">
            <div className="w-1/3 bg-[#FFE500] h-full rounded-bl-xl rounded-tl-xl flex justify-center gap-2 flex-col p-4">
                <h1 className="font-semibold text-[#263238 text-lg">{nota.nome}</h1>
                <p className="text-[#263238] h-2 w-full text-xs -translate-y-1">{nota.disciplina.nome}</p>
                {nota.data_prazo ? (
                    <p className="text-xs font-semibold text-[#263238]">{moment(nota.data_prazo).format('L')}</p>
                ) : (
                    ''
                )}
            </div>
            <div className="p-4 w-2/3 flex flex-col justify-between">
                <div className="w-full flex gap-1">
                    {nota.categorias.map((categoria) => (
                        <div className="w-7 h-2 rounded-full " style={{ backgroundColor: `${categoria.cor}` }}></div>
                    ))}
                </div>
                <p className="text-xs font-semibold text-[#263238]">{nota.descricao}</p>
                <div className="w-full flex justify-end">
                    <button onClick={() => modalType('Delete')} className="font-semibold text-sm text-[#263238] drop-shadow-md hover:text-red-600 duration-300">
                        <TrashSimple size={20} />
                    </button>
                    <div className="w-px h-full bg-black mx-2"></div>
                    <button onClick={() => modalType('Edit')} className="font-semibold text-sm text-[#263238] drop-shadow-md hover:text-blue-600 duration-300">
                        <PencilSimple size={20} />
                    </button>
                </div>
            </div>

            {showModal === 'Delete' && (
                <div className="modal-overlay z-10">
                    <div className="w-1/3 h-1/6 bg-[#F1F1F1] rounded-lg p-4">
                        <h1 className="text-xl font-semibold text-[#263238] text-center">Excluir <i>{nota.nome}</i></h1>
                        <div className="w-full h-px bg-black opacity-10 my-2"></div>
                        <div className="flex h-2/3 w-full flex-col justify-between">
                            <p className="text-sm font-semibold text-[#263238]">Tem certeza que deseja excluir esta nota?</p>
                            <div className="flex justify-end gap-2">
                                <button className="font-semibold text-sm text-[#263238] bg-slate-300 rounded-md px-2 shadow-sm hover:shadow-md py-1 duration-300 hover:text-slate-50" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button onClick={DeleteNota} className="font-semibold text-sm text-[#263238] bg-red-600 rounded-md px-2 shadow-sm hover:shadow-md py-1 duration-300 hover:text-slate-50">
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal === 'Edit' && (
                <AddNotaModal 
                    nota={nota}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    categorias={categorias}
                    disciplinas={disciplinas}
                />
            )}

        </div>
    )
}