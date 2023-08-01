import React, { useState, useEffect } from "react";
import { X } from '@phosphor-icons/react';
import Api from "../../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddDisciplinas({ showModal, setShowModal, disciplina, onDisciplinasChange }) {
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (showModal === 'Edit' && disciplina) {
            setNome(disciplina.nome);
        }
    }, [showModal, disciplina])

    const cadastrarDisciplinas = (event) => {
        event.preventDefault();

        if (!nome) {
            toast.error("Por favor, preencha o nome da disciplinas.", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored"
            });
            return;
        }

        if (showModal === 'Edit') {
            Api.put(`/disciplina/${disciplina.id}`, {
                nome: nome,
            })
                .then(function (response) {
                    console.log(response);
                    toast.success("Disciplina atualizada com sucesso!", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                    setNome('');

                    setShowModal(false);
                    onDisciplinasChange();
                })
                .catch(function (error) {
                    if (error.response.data.message.includes("The nome has already been taken.")) {
                        toast.error("Essa disciplina já existe, tente novamente.", {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: "colored"
                        });
                        return
                    }
                    toast.error("Erro ao atualizar disciplina. Verifique os dados e tente novamente.", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                });
        } else {
            Api.post('/disciplina', {
                nome: nome,
            })
                .then(function (response) {
                    console.log(response);
                    toast.success("Disciplina adicionada com sucesso!", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                    setNome('');

                    setShowModal(false);
                    onDisciplinasChange();
                })
                .catch(function (error) {
                    if (error.response.data.message.includes("The nome has already been taken.")) {
                        toast.error("Essa disciplina já existe, tente novamente.", {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: "colored"
                        });
                        return
                    }
                    toast.error("Erro ao cadastrar disciplina. Verifique os dados e tente novamente.", {
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
                    <h1 className="font-semibold text-2xl text-[#524B4B]">Adicionar disciplina</h1>
                    <button onClick={() => setShowModal(false)} className="text-[#524B4B] backdrop-blur-sm hover:backdrop-blur-md duration-300"><X size={25} /></button>
                </div>
                <div className="w-full h-px bg-black opacity-10 my-2"></div>
                <form className="modal-form" onSubmit={cadastrarDisciplinas}>
                    <div className="">
                        <p>Nome *</p>
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                            className="w-full p-2 rounded-md text-xs" />
                        <div className="container-bottom-form mt-2">
                            <button type="submit" className="px-2 py-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300">{showModal === 'Edit' ? 'Atualizar' : 'Adicionar'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}