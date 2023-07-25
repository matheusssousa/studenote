import { X } from "@phosphor-icons/react";
import React from "react";

export default function CategoriaCard({ categoria, onClick, categoriaSelecionada }) {
    console.log(categoria);
    // Função para escurecer a cor hex
    const escurecerCor = (hex, percent) => {
        // Remova o símbolo '#' se estiver presente
        hex = hex.replace("#", "");

        // Obtenha os componentes RGB
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // Calcule o novo valor RGB escurecido
        r = Math.max(0, Math.floor(r * (1 - percent / 100)));
        g = Math.max(0, Math.floor(g * (1 - percent / 100)));
        b = Math.max(0, Math.floor(b * (1 - percent / 100)));

        // Converta os componentes de volta para o formato hexadecimal
        const escurecidoHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        return escurecidoHex;
    };

    // Obtenha a cor escurecida (10% mais escura, você pode ajustar esse valor conforme necessário)
    const escurecidoHex = escurecerCor(categoria.cor, 40);

    return (
        <button
            type="button"
            className={`px-2 py-1 flex gap-1 items-center rounded-md shadow-sm ${categoriaSelecionada ? "bg-[#FFE500]" : ""}`}
            style={{ backgroundColor: `${escurecidoHex}` }}
            onClick={() => onClick(categoria)}>
            <p className={'font-semibold text-xs'} style={{color: `${categoria.cor}`}}>
                {categoria.nome}
            </p>
            {categoriaSelecionada && (
                <button
                    type="button"
                    style={{color: `${categoria.cor}`}}
                    onClick={(e) => {e.stopPropagation();onClick(null);}}>
                    <X size={15} weight="bold"/>
                </button>
            )}
        </button>
    )
}
