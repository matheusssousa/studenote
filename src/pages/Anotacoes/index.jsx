import React, { useState, useEffect } from "react";
import { PlusCircle, X } from '@phosphor-icons/react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Api from "../../services/api";
import './styles.css';
import CategoriaCard from "../../components/CategoriaCard";
import DisciplinaCard from "../../components/DisciplinaCard";
import validateForm from "../../hooks/formValidation";

export default function Anotacoes() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [date, setDate] = useState('');
    const [disciplina, setDisciplina] = useState('');

    const [categorias, setCategorias] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

    const [errors, setErrors] = useState({
        nome: '',
        descricao: '',
        disciplina: '',
        categoria: ''
    });

    const clearErrors = () => {
        setErrors({
          nome: '',
          descricao: '',
          disciplina: '',
          categoria: ''
        });
      };

    const cadastrarNota = (event) => {
        event.preventDefault();

        setErrors({
            nome: '',
            descricao: '',
            disciplina: '',
            //   categoria: ''
        });

        const errors = validateForm({ nome, descricao, disciplina });
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }
        Api.post('/notas', {
            nome: nome,
            descricao: descricao,
            data_prazo: date,
            disciplina_id: disciplina,
        })
            .then(function (response) {
                console.log(response);
                toast.success("Nota adicionada com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
                setShowModal(false)
            })
            .catch(function (error) {
                console.error(error);
                toast.error("Erro ao cadastrar. Verifique os dados e tente novamente.", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
            });
    }

    useEffect(() => {
        const fetchCategoria = async () => {
            const res_categoria = await Api.get('categoria');
            setCategorias(res_categoria.data);
        };
        const fetchDisciplina = async () => {
            const res_disciplina = await Api.get('disciplina');
            console.log(res_disciplina.data);
            setDisciplinas(res_disciplina.data);
        };

        fetchCategoria();
        fetchDisciplina();
    }, []);

    const openModal = () => {
        clearErrors();
        setShowModal(true);
    };

    const closeModal = () => {
        clearErrors();
        setShowModal(false);
    };

    return (
        <div className="body-page">
            <div className="header-page flex justify-between">
                <h1 className="font-semibold text-2xl text-[#524B4B]">Minhas Anotações</h1>
                <button className="flex px-2 py-2 gap-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300" onClick={openModal}>
                    <PlusCircle size={20} />
                    Adicionar anotação
                </button>
            </div>
            <div className="container-central-notes">
                <div className="container-notes-right">Anotações neste espaço</div>
                <div className="container-notes-left">
                    <div className="container-categoria-disciplina">
                        <p className="title-p">Categorias</p>
                        <div className="w-full h-px bg-black opacity-10 my-2"></div>
                        <div className="flex flex-wrap gap-1">
                            {categorias.map((categoria) => (
                                <CategoriaCard key={categoria.id} categoria={categoria} />
                            ))}
                        </div>
                    </div>
                    <div className="container-categoria-disciplina">
                        <p className="title-p">Disciplinas</p>
                        <div className="w-full h-px bg-black opacity-10 my-2"></div>
                        <div className="flex flex-wrap gap-1">
                            {disciplinas.map((disciplina) => (
                                <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h1 className="font-semibold text-2xl text-[#524B4B]">Adicionar anotação</h1>
                            <button onClick={closeModal} className="text-[#524B4B] backdrop-blur-sm hover:backdrop-blur-md duration-300"><X size={25} /></button>
                        </div>
                        <div className="w-full h-px bg-black opacity-10 my-2"></div>
                        <form className="modal-form" onSubmit={cadastrarNota}>
                            <div className="container-top-form">
                                <div className="container-right">
                                    <p>Nome *</p>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={nome}
                                        onChange={(event) => setNome(event.target.value)} />
                                    {errors.nome && <small className="error-message">{errors.nome}</small>}
                                    <p>Conteúdo *</p>
                                    <textarea
                                        name="descricao"
                                        cols="30"
                                        rows="10"
                                        value={descricao}
                                        onChange={(event) => setDescricao(event.target.value)}></textarea>
                                    {errors.descricao && <small className="error-message">{errors.descricao}</small>}
                                    <p>Prazo</p>
                                    <input
                                        type="date"
                                        name="date"
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                    />
                                </div>
                                <div className="container-left">
                                    <p>Categorias *</p>
                                    <input type="text" />
                                    {errors.categoria && <small className="error-message">{errors.categoria}</small>}
                                    <p>Disciplina *</p>
                                    <select
                                        name="disciplina"
                                        onChange={(event) => setDisciplina(event.target.value)}
                                        value={disciplina}
                                    >
                                        <option disabled value="">Selecione uma disciplina</option>
                                        {disciplinas.map((disciplina) => (
                                            <option value={disciplina.id} key={disciplina.id}>{disciplina.nome}</option>
                                        ))}
                                    </select>
                                    {errors.disciplina && <small className="error-message">{errors.disciplina}</small>}
                                </div>
                            </div>
                            <div className="container-bottom-form">
                                <button type="submit" className="px-2 py-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300">Adicionar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
