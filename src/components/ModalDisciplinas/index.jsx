import React, { useState } from "react";
import { X } from '@phosphor-icons/react';
import Api from "../../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddDisciplinas({ showModal, setShowModal }) {
    const [nome, setNome] = useState('');

    const cadastrarDisciplinas = (event) => {
        event.preventDefault();

        if (!nome) {
            toast.error("Por favor, preencha o nome da disciplinas.", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored"
            });
            return;
        }

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
            })
            .catch(function (error) {
                console.error(error);
                toast.error("Erro ao cadastrar disciplina. Verifique os dados e tente novamente.", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
            });
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
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
                            onChange={(event) => setNome(event.target.value)} />
                        <div className="container-bottom-form">
                            <button type="submit" className="px-2 py-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300">Adicionar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}