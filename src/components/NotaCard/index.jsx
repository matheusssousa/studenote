import React from "react";
import moment from 'moment';
import 'moment/locale/pt-br';

export default function NotaCard({ nota }) {
    return (
        <div className="w-80 h-60 rounded-xl shadow-sm border-[#263238] border-opacity-20 border bg-[#F1F1F1] p-2">
            <div>
                <div className="flex flex-col h-10">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="font-semibold text-[#263238] text-lg">{nota.nome}</h1>
                        {nota.data_prazo ? (
                            <p className="text-sm font-semibold text-[#263238]">{moment(nota.data_prazo).format('L')}</p>
                        ) : (
                            ''
                        )}
                    </div>
                    <p className="text-[#263238] h-2 w-full text-xs -translate-y-1">{nota.disciplina.nome}</p>
                </div>
                <div className="w-full flex gap-1">
                    {nota.categorias.map((categoria) => (
                        <div className="w-7 h-2 rounded-full " style={{ backgroundColor: `${categoria.cor}` }}></div>
                    ))}
                </div>
            </div>
            <div className="mt-1">
                <p className="text-xs font-semibold text-[#263238]">{nota.descricao}</p>
            </div>
            <div className="notecerd-bottom"></div>
        </div>
    )
}