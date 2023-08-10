import React, { useState, useEffect } from "react";
import { MagnifyingGlass, Plus, PlusCircle } from '@phosphor-icons/react';
import 'react-toastify/dist/ReactToastify.css';
import Api from "../../services/api";
import './styles.css';
import CategoriaCard from "../../components/CategoriaCard";
import DisciplinaCard from "../../components/DisciplinaCard";
import Loading from "../../components/Loading";
import AddNotaModal from "../../components/ModalAnotações";
import NotaCard from "../../components/NotaCard";
import AddCategorias from "../../components/ModalCategorias";
import AddDisciplinas from "../../components/ModalDisciplinas";

export default function Anotacoes() {
    const [categorias, setCategorias] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [notas, setNotas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredNotas = notas.filter((nota) => {
        const nomeCategoria = categoriaSelecionada && categoriaSelecionada.nome.toLowerCase();
        const nomeDisciplina = disciplinaSelecionada && disciplinaSelecionada.nome.toLowerCase();

        const nomeNota = nota.nome.toLowerCase();
        const descricaoNota = nota.descricao.toLowerCase();

        return (
            nomeNota.includes(searchTerm.toLowerCase()) &&
            descricaoNota.includes(searchTerm.toLowerCase()) &&
            (!categoriaSelecionada || nota.categorias.some((categoria) => categoria.nome.toLowerCase() === nomeCategoria)) &&
            (!disciplinaSelecionada || nota.disciplina.nome.toLowerCase() === nomeDisciplina)
        );
    });

    const handleCategoriaSelect = (categoria) => {
        setCategoriaSelecionada((prevCategoria) =>
            prevCategoria === categoria ? null : categoria
        );
    };

    const handleDisciplinaSelect = (disciplina) => {
        setDisciplinaSelecionada((prevDisciplina) =>
            prevDisciplina === disciplina ? null : disciplina
        );
    };

    const fetchCategoriaDisciplinasNotas = async () => {
        setLoading(true);
        const [res_categoria, res_disciplina, res_notas] = await Promise.all([
            Api.get('categoria'),
            Api.get('disciplina'),
            Api.get('notas')
        ]);

        setCategorias(res_categoria.data);
        setDisciplinas(res_disciplina.data);
        setNotas(res_notas.data);
        setLoading(false);
    };

    const handleAnotacoesChange = () => {
        fetchCategoriaDisciplinasNotas();
    }

    const openModal = (tipoModal) => {
        setShowModal(tipoModal);
    };

    useEffect(() => {
        fetchCategoriaDisciplinasNotas();
    }, []);

    return (
        <div className="body-page">
            {loading ? <Loading loading={loading} /> :
                <>
                    <div className="container-central-notes">
                        <div className="container-notes-right">
                            <div className="container-categoria-disciplina">
                                <div className="flex justify-between items-center">
                                    <p className="title-p">Categorias</p>
                                    <button
                                        className="flex p-1 gap-2 text-sm font-semibold rounded-full bg-[#FFE500] shadow-sm hover:shadow-md duration-300"
                                        onClick={() => openModal('modalCategorias')}>
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="w-full h-px bg-black opacity-10 my-2"></div>
                                <div className="flex flex-wrap gap-1">
                                    <div className="flex flex-wrap gap-1 text-xs font-semibold text-[#524B4B]">
                                        {categorias.length === 0 ? 'Você não possui categorias cadastradas.' :
                                            (categorias.map((categoria) => (
                                                <CategoriaCard key={categoria.id} categoria={categoria}
                                                    categoriaSelecionada={categoriaSelecionada === categoria} onClick={() =>
                                                        handleCategoriaSelect(categoria)}
                                                    filter={true}
                                                />
                                            )))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="container-categoria-disciplina">
                                <div className="flex justify-between items-center">
                                    <p className="title-p">Disciplinas</p>
                                    <button
                                        className="flex p-1 gap-2 text-sm font-semibold rounded-full bg-[#FFE500] shadow-sm hover:shadow-md duration-300"
                                        onClick={() => openModal('modalDisciplinas')}>
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="w-full h-px bg-black opacity-10 my-2"></div>
                                <div className="flex flex-wrap gap-1 text-xs font-semibold text-[#524B4B]">
                                    {disciplinas.length === 0 ? 'Você não possui disciplinas cadastradas.' :
                                        (disciplinas.map((disciplina) => (
                                            <DisciplinaCard key={disciplina.id} disciplina={disciplina}
                                                disciplinaSelecionada={disciplinaSelecionada === disciplina} filter={true} onClick={() =>
                                                    handleDisciplinaSelect(disciplina)}
                                            />
                                        )))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="container-notes-left">
                            <div className="header-page flex justify-between">
                                <h1 className="font-semibold text-2xl text-[#524B4B]">Minhas Anotações</h1>
                                <div className=" w-2/3 flex justify-center items-center">
                                    <input type="text" value={searchTerm} onChange={handleSearch} className="p-2 text-sm w-2/3 rounded-xl"
                                        placeholder="Pesquisar anotação" />
                                    <MagnifyingGlass size={20} className="-translate-x-7" />
                                </div>
                                <button
                                    className="flex px-2 py-2 gap-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300"
                                    onClick={() => openModal('modalAnotacoes')}>
                                    <PlusCircle size={20} />
                                    Adicionar anotação
                                </button>
                            </div>
                            {filteredNotas.length === 0 ? (
                                <p className="text-center text-sm font-semibold text-[#524B4B]">Nenhuma anotação encontrada.</p>
                            ) : (
                                filteredNotas.map((nota) => (
                                    <NotaCard key={nota.id} nota={nota} categorias={categorias} disciplinas={disciplinas}
                                        onAnotacoesChange={handleAnotacoesChange} />
                                ))
                            )}
                        </div>
                        {showModal === 'modalAnotacoes' && (
                            <AddNotaModal
                                showModal={showModal === 'modalAnotacoes'}
                                setShowModal={setShowModal}
                                categorias={categorias}
                                disciplinas={disciplinas}
                                onAnotacoesChange={handleAnotacoesChange}
                            />
                        )}
                        {showModal === 'modalCategorias' && (
                            <AddCategorias
                                showModal={showModal === 'modalCategorias'}
                                setShowModal={setShowModal}
                                onCategoriaChange={handleAnotacoesChange}
                            />
                        )}
                        {showModal === 'modalDisciplinas' && (
                            <AddDisciplinas
                                showModal={showModal === 'modalDisciplinas'}
                                setShowModal={setShowModal}
                                onDisciplinasChange={handleAnotacoesChange}
                            />
                        )}
                    </div>
                </>
            }
        </div>
    )
}
