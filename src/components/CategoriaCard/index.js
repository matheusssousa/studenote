import { X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import AddCategorias from "../ModalCategorias";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';
import Api from "../../services/api";

export default function CategoriaCard({ categoria, onClick, categoriaSelecionada, filter, onCategoriaChange }) {
    const [showModal, setShowModal] = useState(false);

    const modalType = (tipoModal) => {
        setShowModal(tipoModal);
    }

    const closeModal = () => {
        setShowModal(null);
    };

    const DeleteCategoria = () => {
        Api.delete(`/categoria/${categoria.id}`)
            .then(function (response) {
                console.log(response);
                toast.success("Categoria deletada com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
                onCategoriaChange();
            })
            .catch(function (error) {
                console.error(error);
                toast.error("Erro ao excluir categoria.", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
            })
    }

    // Função para escurecer a cor hex
    const escurecerCor = (hex, percent) => {
        // Remova o símbolo '#' se estiver presente
        hex = hex.replace("#", "");

        // Obtenha os componentes RGB
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // Calcule o novo valor RGB escurecido
        r = Math.max(0, Math.floor(r * (1 - percent / 100)));
        g = Math.max(0, Math.floor(g * (1 - percent / 100)));
        b = Math.max(0, Math.floor(b * (1 - percent / 100)));

        // Converta os componentes de volta para o formato hexadecimal
        const escurecidoHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        return escurecidoHex;
    };

    // Obtenha a cor escurecida (10% mais escura, você pode ajustar esse valor conforme necessário)
    const escurecidoHex = escurecerCor(categoria.cor, 55);

    return (
        !filter ? <>
            <div className={`w-[15%] h-24 flex rounded-lg gap-2 shadow-md p-3 items-center justify-evenly`} style={{ backgroundColor: `${escurecidoHex}` }} key={categoria.id}>
                <p className="font-semibold text-sm" style={{ color: `${categoria.cor}` }}>{categoria.nome}</p>
                <div className="w-px h-full" style={{ backgroundColor: `${categoria.cor}` }}></div>
                <div className=" flex flex-col gap-3">
                    <button onClick={() => modalType('Delete')} className="font-semibold text-sm drop-shadow-md hover:text-white duration-300" style={{ color: `${categoria.cor}` }}>
                        <TrashSimple size={20} />
                    </button>
                    <button onClick={() => modalType('Edit')} className="font-semibold text-sm drop-shadow-md hover:text-white duration-300" style={{ color: `${categoria.cor}`}}>
                        <PencilSimple size={20} />
                    </button>
                </div>
                {showModal === 'Delete' && (
                    <div className="modal-overlay z-10">
                        <div className="w-1/3 h-1/6 bg-[#F1F1F1] rounded-lg p-4">
                            <h1 className="text-xl font-semibold text-[#263238] text-center">Excluir <i>{categoria.nome}</i></h1>
                            <div className="w-full h-px bg-black opacity-10 my-2"></div>
                            <div className="flex h-2/3 w-full flex-col justify-between">
                                <p className="text-sm font-semibold text-[#263238]">Tem certeza que deseja excluir esta categoria?</p>
                                <div className="flex justify-end gap-2">
                                    <button className="font-semibold text-sm text-[#263238] bg-slate-300 rounded-md px-2 shadow-sm hover:shadow-md py-1 duration-300 hover:text-slate-50" onClick={() => setShowModal(false)}>
                                        Cancelar
                                    </button>
                                    <button onClick={DeleteCategoria} className="font-semibold text-sm text-[#263238] bg-red-600 rounded-md px-2 shadow-sm hover:shadow-md py-1 duration-300 hover:text-slate-50">
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showModal === 'Edit' && (
                    <AddCategorias
                        showModal={showModal}
                        closeModal={closeModal}
                        categoria={categoria}
                        setShowModal={setShowModal}
                        onCategoriaChange={onCategoriaChange}
                    />
                )}
            </div>
        </> : <>
            <button
                type="button"
                className={`px-2 py-1 flex gap-1 items-center rounded-md shadow-sm ${categoriaSelecionada ? "bg-[#FFE500]" : ""}`}
                style={{ backgroundColor: `${escurecidoHex}` }}
                onClick={() => onClick(categoria)}>
                <p className={'font-semibold text-xs'} style={{ color: `${categoria.cor}` }}>
                    {categoria.nome}
                </p>
                {categoriaSelecionada && (
                    <button
                        type="button"
                        style={{ color: `${categoria.cor}` }}
                        onClick={(e) => { e.stopPropagation(); onClick(null); }}>
                        <X size={15} weight="bold" />
                    </button>
                )}
            </button>
        </>
    )
}
