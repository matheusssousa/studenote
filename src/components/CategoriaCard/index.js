import { X } from "@phosphor-icons/react";
import React, { useState } from "react";
import AddCategorias from "../ModalCategorias";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react';
import Api from "../../services/api";

export default function CategoriaCard({ categoria, onClick, categoriaSelecionada, filter }) {
    const [showModal, setShowModal] = useState(false);

    const modalType = (tipoModal) => {
        setShowModal(tipoModal);
    }

    const closeModal = () => {
        setShowModal(null);
    };

    const DeleteCategoria = (categoria) => {
        Api.delete(`/categoria/${categoria}`)
            .then(function (response) {
                console.log(response);
                toast.success("Categoria deletada com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
                toast.error("Erro ao excluir categoria.", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
            })

        setShowModal(false);
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
    const escurecidoHex = escurecerCor(categoria.cor, 40);

    return (
        !filter ? <>
            <div className="w-[15%] h-24 flex flex-col border border-[#524B4B] rounded-lg boreder-opacity-20 gap-2 pb-2 shadow-sm" key={categoria.id}>
                <div className="w-full h-10 rounded-t-lg shadow-sm" style={{ backgroundColor: `${categoria.cor}` }}></div>
                <div className="w-full flex flex-col items-center justify-center gap-3 h-10">
                    <p className="text-sm font-semibold text-[#524B4B]">{categoria.nome}</p>
                    <div className="w-full flex justify-center">
                        <button onClick={() => DeleteCategoria(categoria.id)} className="font-semibold text-sm text-[#263238] drop-shadow-md hover:text-red-600 duration-300">
                            <TrashSimple size={20} />
                        </button>
                        <div className="w-px h-full bg-black mx-2"></div>
                        <button onClick={() => modalType('Edit')} className="font-semibold text-sm text-[#263238] drop-shadow-md hover:text-blue-600 duration-300">
                            <PencilSimple size={20} />
                        </button>
                    </div>
                </div>
                {showModal === 'Edit' && (
                    <AddCategorias
                        showModal={showModal}
                        closeModal={closeModal}
                        categoria={categoria}
                        setShowModal={setShowModal}
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
