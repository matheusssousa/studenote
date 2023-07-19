import axios from "axios";
import React from "react";
import Api from "../../services/api";
import './styles.css';

export default function Anotacoes() {

    try {
        const response = Api.get('tarefa');
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
    return (
        <div className="body-page">
            <div className="header-page">
                <h1 className="font-semibold text-2xl text-[#524B4B]">Minhas Anotações</h1>
            </div>
            {/* <button onClick={fetchDataNotes}>Enviar</button> */}
            <div className="container-central-notes">
                <div className="container-notes-right">Anotações neste espaço</div>
                <div className="container-notes-left">
                    <div className="container-categoria-disciplina">
                        <p className="title-p">Categorias</p>
                    </div>
                    <div className="container-categoria-disciplina">
                        <p className="title-p">Disciplinas</p>
                    </div>
                </div>
            </div>
        </div>
    )
}