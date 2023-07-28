import React, { useState } from "react";
import ListCategorias from "../ListCategorias";

export default function MultiSelect({ categorias, categoriaSelect, setCategoriaSelect }) {
    const [selectedCategoria, setSelectedCategoria] = useState('');

    const handleAdd = (valueSelect) => {
        const selectedCategoria = categorias.find((categoria) => categoria.id == valueSelect);

        if (!selectedCategoria) {
            return;
        }

        if (!categoriaSelect.some((categoria) => categoria.id === selectedCategoria.id)) {
            const tempArray = [...categoriaSelect];
            tempArray.push(selectedCategoria);
            setCategoriaSelect(tempArray);
        }
        setSelectedCategoria('');
    }


    const handleRemove = (index) => {
        const tempArr = [...categoriaSelect];
        tempArr.splice(index, 1);
        setCategoriaSelect(tempArr);
    };

    return (
        <div className="w-full">
            <select
                name="categoria"
                id="select"
                onChange={(event) => handleAdd(event.target.value)}
                defaultValue=""
                value={selectedCategoria}
            >
                <option value="" disabled>Selecione as categorias</option>
                {categorias.map((categoria) => (
                    <option value={categoria.id} key={categoria.id}>{categoria.nome}</option>
                ))}
            </select>
            <ListCategorias categorias={categorias} handleRemove={handleRemove} categoriaSelect={categoriaSelect} />
        </div>
    )
}
