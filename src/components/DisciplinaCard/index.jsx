import React from "react";

export default function DisciplinaCard(disciplina) {
    return (
        <div className="px-2 py-1 flex gap-1 items-center rounded-md shadow-sm bg-[#FFE500]">
            <p className="font-semibold text-xs">{disciplina.disciplina.nome}</p>
        </div>
    )
}
