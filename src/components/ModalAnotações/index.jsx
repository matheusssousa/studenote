import React, { useEffect, useState } from "react";
import { Plus, X } from '@phosphor-icons/react';
import Api from "../../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MultiSelect from "../../components/MultiSelect";

const AddNotaModal = ({ showModal, setShowModal, categorias, disciplinas, nota, onAnotacoesChange }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [date, setDate] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [categoriaSelect, setCategoriaSelect] = useState([]);
    const [community, setCommunity] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (showModal === 'Edit' && nota) {
            setNome(nota.nome);
            setDescricao(nota.descricao);
            setDate(nota.data_prazo);
            setDisciplina(nota.disciplina.id);
            setCategoriaSelect(nota.categorias);
        }
    }, [showModal, nota])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!nome || !descricao || !disciplina || categoriaSelect.length === 0) {
            toast.error("Por favor, preencha todos os campos obrigatórios.", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored"
            });
            return;
        }

        setSubmitting(true);

        const categoriasSelectIds = categoriaSelect.map((categoria) => categoria.id);

        if (showModal === 'Edit') {
            Api.put(`/notas/${nota.id}`, {
                nome: nome,
                descricao: descricao,
                data_prazo: date,
                disciplina_id: disciplina,
                categorias: categoriasSelectIds,
                annotation_community: community,
            })
                .then(function (response) {
                    console.log(response);
                    toast.success("Nota adicionada com sucesso!", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                    setNome('');
                    setDescricao('');
                    setDate('');
                    setDisciplina('');
                    setCategoriaSelect([]);
                    setCommunity(0);

                    setShowModal(false);
                    onAnotacoesChange();
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error("Erro ao cadastrar nota. Verifique os dados e tente novamente.", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        } else {
            Api.post('/notas', {
                nome: nome,
                descricao: descricao,
                data_prazo: date,
                disciplina_id: disciplina,
                categorias: categoriasSelectIds,
                annotation_community: community,
            })
                .then(function (response) {
                    console.log(response);
                    toast.success("Nota adicionada com sucesso!", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                    setNome('');
                    setDescricao('');
                    setDate('');
                    setDisciplina('');
                    setCategoriaSelect([]);
                    setCommunity(0);

                    setShowModal(false);
                    onAnotacoesChange();
                })
                .catch(function (error) {
                    console.error(error);
                    toast.error("Erro ao cadastrar nota. Verifique os dados e tente novamente.", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    return (
        showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="modal-header">
                            <input
                                type="text"
                                name="nome"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                className="input-name"
                                placeholder="Digite o título da sua anotação..." />
                            <button onClick={() => setShowModal(false)} className="text-[#524B4B] duration-300"><X size={25} className="hover:drop-shadow-lg" /></button>
                        </div>
                        <div className="container-top-form">
                            <div className="w-full justify-between flex">
                                <input
                                    type="date"
                                    name="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    className="input-date"
                                />
                                <select
                                    name="disciplina"
                                    onChange={(event) => setDisciplina(event.target.value)}
                                    value={disciplina}
                                    defaultValue=""
                                    className="select-disciplina"
                                >
                                    <option disabled value="">Selecione uma disciplina</option>
                                    {disciplinas.map((disciplina) => (
                                        <option value={disciplina.id} key={disciplina.id}>{disciplina.nome}</option>
                                    ))}
                                </select>
                                <button onClick={() => setCommunity(1)} type="button">Comunidade</button>
                            </div>
                            <div className="h-px w-full my-1 bg-[#524B4B]"></div>
                            <textarea
                                name="descricao"
                                cols="30"
                                rows="10"
                                value={descricao}
                                onChange={(event) => setDescricao(event.target.value)}
                                className="input-text"
                                placeholder="Digite o conteúdo aqui..."></textarea>
                            <div className="add-categoria">
                                <MultiSelect categorias={categorias} categoriaSelect={categoriaSelect} setCategoriaSelect={setCategoriaSelect} />
                            </div>
                        </div>
                        <div className="h-px w-full my-1 bg-[#524B4B]"></div>
                        <div className="container-bottom-form">
                            <button type="submit" className="px-2 py-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300">{showModal === 'Edit' ? 'Atualizar' : 'Adicionar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default AddNotaModal;
