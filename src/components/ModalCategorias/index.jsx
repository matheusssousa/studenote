import React, { useEffect, useState } from "react";
import { X } from '@phosphor-icons/react';
import Api from "../../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddCategorias({ setShowModal, categoria, showModal, onCategoriaChange }) {
    // console.log(showModal);
    const [nome, setNome] = useState('');
    const [color, setColor] = useState('#rrggbb');

    useEffect(() => {
        if (showModal === 'Edit' && categoria) {
            setNome(categoria.nome);
            setColor(categoria.cor);
        }
    }, [showModal, categoria])

    const cadastrarCategoria = (event) => {
        event.preventDefault();

        if (!nome || !color) {
            toast.error("Por favor, preencha todos os campos obrigatórios.", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored"
            });
            return;
        }

        if (showModal === 'Edit') {
            Api.put(`/categoria/${categoria.id}`, {
                nome: nome,
                cor: color,
            })
                .then(function (response) {
                    console.log(response);
                    toast.success("Categoria atualizada com sucesso!", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                    setNome('');
                    setColor('rrggbb');

                    setShowModal(false);
                    onCategoriaChange();
                })
                .catch(function (error) {
                    if (error.response.data.message.includes("The nome has already been taken.")) {
                        toast.error("Essa categoria já existe, tente novamente.", {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: "colored"
                        });
                        return
                    }
                    toast.error("Erro ao atualizar categoria. Verifique os dados e tente novamente.", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                });
        } else {
            Api.post('/categoria', {
                nome: nome,
                cor: color,
            })
                .then(function (response) {
                    console.log(response);
                    toast.success("Categoria adicionada com sucesso!", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                    setNome('');
                    setColor('rrggbb');

                    setShowModal(false);
                    onCategoriaChange();
                })
                .catch(function (error) {
                    if (error.response.data.message.includes("The nome has already been taken.")) {
                        toast.error("Essa categoria já existe, tente novamente.", {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: "colored"
                        });
                        return
                    }
                    toast.error("Erro ao cadastrar categoria. Verifique os dados e tente novamente.", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                });
        }
    }
    return (
        <div className="modal-overlay">
            <div className="w-1/3 h-1/6 bg-[#F1F1F1] rounded-lg p-4">
                <div className="modal-header">
                    <h1 className="font-semibold text-2xl text-[#524B4B]">Adicionar categoria</h1>
                    <button onClick={() => setShowModal(false)} className="text-[#524B4B] backdrop-blur-sm hover:backdrop-blur-md duration-300"><X size={25} /></button>
                </div>
                <div className="w-full h-px bg-black opacity-10 my-2"></div>
                <form className="w-full" onSubmit={cadastrarCategoria}>
                    <div className="min-h-[5vh] flex text-sm font-semibold text-[#524B4B] items-center gap-2">
                        <p>Nome *</p>
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                            className="p-2 text-xs w-1/3 rounded-md" />
                        <p>Cor *</p>
                        <input
                            name="color"
                            type="color"
                            value={color}
                            onChange={(event) => setColor(event.target.value)}
                            className="rounded-md h-[4vh] w-1/4 cursor-pointer" />
                    </div>
                    <div className="container-bottom-form">
                        <button type="submit" className="px-2 py-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300">{showModal === 'Edit' ? 'Atualizar' : 'Adicionar'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}