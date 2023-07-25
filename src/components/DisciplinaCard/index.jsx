import { X } from "@phosphor-icons/react";
import React from "react";

export default function DisciplinaCard({ disciplina, disciplinaSelecionada, onClick }) {
    return (
        <button
            type="button"
            className={`px-2 py-1 flex gap-1 items-center rounded-md shadow-sm bg-[#FFE500]`}
            onClick={() => onClick(disciplina)}>
            <p className={`font-semibold text-xs`}>
                {disciplina.nome}
            </p>
            {disciplinaSelecionada && (
                <button
                    type="button"
                    onClick={(e) => {e.stopPropagation();onClick(null);}}>
                    <X size={15} weight="bold" />
                </button>
            )}
        </button>
    );
}
