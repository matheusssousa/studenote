import React, { useState } from "react";
import { CaretLeft } from '@phosphor-icons/react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import SVGRegister from "../../assets/SVGRegister";
import './styles.css';
import Api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate();

    const cadastrarDados = (event) => {
        event.preventDefault(); 

        if (password !== passwordconfirm) {
            toast.error("Senhas não conferem!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored"
            });
            return; 
        }

        Api.post('/register', {
            name: name,
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                toast.success("Cadastro realizado com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
                navigate("/login");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.data.message === "The email has already been taken.") {
                    toast.error("Este e-mail já foi cadastrado.", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "colored"
                    });
                    return;
                }
                toast.error("Erro ao cadastrar. Verifique os dados e tente novamente.", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored"
                });
            });
    }

    return (
        <div className="body-register">
            <div className="container-register">
                <div className="flex flex-col w-5/6 justify-center items-center gap-4">
                    <div className="w-full flex justify-start">
                        <a href="/login" className="px-3 py-1 h-10 flex justify-center items-center bg-[#FFE500] rounded-full text-sm font-semibold hover:shadow-md duration-300"><CaretLeft size={20} />Voltar</a>
                    </div>
                    <h1 className="font-semibold text-4xl">Cadastrar-se</h1>
                </div>
                <form onSubmit={cadastrarDados} className="form-register">
                    <p>Nome</p>
                    <input
                        type="text"
                        name="nome"
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                    <p>Email</p>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                    <p>Senha</p>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    <div className="text-xs font-semibold text-gray-500 ml-2">A senha deve ter mais de 8 caracteres.</div>
                    <p>Confirmar Senha</p>
                    <input
                        type="password"
                        name="confirm-password"
                        value={passwordconfirm}
                        onChange={(event) => setPasswordConfirm(event.target.value)} />
                    <button type="submit">Cadastrar</button>
                </form>
                <div className="font-semibold text-sm flex">STUDE<p className="font-light">NOTES</p></div>
            </div>
            <div className="SVG">
                <SVGRegister/>
            </div>
        </div>
    )
}
