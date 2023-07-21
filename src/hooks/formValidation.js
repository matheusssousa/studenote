export default function validateForm(data) {
    const errors = {};

    if (!data.nome) {
        errors.nome = 'O campo nome é obrigatório';
    }
    if (!data.email) {
        errors.email = 'O campo email é obrigatório';
    }
    if (!data.password) {
        errors.password = 'O campo senha é obrigatório';
    }
    if (!data.descricao) {
        errors.descricao = 'O campo conteúdo é obrigatório';
    }
    if (!data.disciplina) {
        errors.disciplina = 'Selecione uma disciplina';
    }
    // if (data.selectedCategories.length === 0) {
    //     errors.categoria = 'Selecione pelo menos uma categoria';
    // }

    return errors;
};