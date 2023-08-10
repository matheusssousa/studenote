import { XCircle } from "@phosphor-icons/react";
import React from "react";

export default function ListCategorias({ categorias, categoriaSelect, handleRemove }) {
    return (
        <div className={!categoriaSelect.length ? 'none':'flex gap-1 w-full mt-1 flex-col -translate-x-14'}>
            {categoriaSelect.map((categoria, i) => (
                <button
                    type="button"
                    key={categoria.id}
                    onClick={() => handleRemove(i)}
                    className="px-2 py-1 flex gap-1 rounded-lg items-center shadow-sm hover:shadow-md duration-300 justify-between"
                    style={{backgroundColor: `${categoria.cor}`}}>
                    <p className="text-xs font-semibold">{categoria.nome}</p>
                    <XCircle size={15} />
                </button>
            ))}
        </div>
    )
}