import React, { useEffect, useState } from "react";
import Api from "../../services/api";
import Loading from "../../components/Loading";
import { PlusCircle } from '@phosphor-icons/react';
import AddCategorias from "../../components/ModalCategorias";
import 'react-toastify/dist/ReactToastify.css';
import CategoriaCard from "../../components/CategoriaCard";

export default function Categorias() {
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchCategorias = async () => {
        setLoading(true);
        try {
            const response = await Api.get('categoria');
            setCategorias(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const openModal = (typeModal) => {
        setShowModal(typeModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCategoriaChange = () => {
        fetchCategorias();
    }

    return (
        <div className="body-page">
            {loading ? <Loading loading={loading} /> : (
                <>
                    <div className="header-page flex justify-between">
                        <h1 className="font-semibold text-2xl text-[#524B4B]">Minhas Categorias</h1>
                        <button className="flex px-2 py-2 gap-2 text-sm font-semibold rounded-md bg-[#FFE500] shadow-sm hover:shadow-md duration-300" onClick={() => openModal('Add')}>
                            <PlusCircle size={20} />
                            Adicionar categoria
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {categorias.length === 0 ? (
                            <p className="text-center text-sm font-semibold text-[#524B4B]">Você não possui categorias cadastradas.</p>
                        ) : (
                            categorias.map((categoria) => (
                                <CategoriaCard
                                    key={categoria.id}
                                    categoria={categoria}
                                    filter={false}
                                    onCategoriaChange={handleCategoriaChange}
                                />
                            ))
                        )}
                    </div>
                    {showModal === 'Add' && (
                        <AddCategorias
                            showModal={showModal === 'Add'}
                            closeModal={closeModal}
                            setShowModal={setShowModal}
                            onCategoriaChange={handleCategoriaChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}
