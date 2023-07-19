import React from "react";
import SocialMedia from '../SocialMedia';
import './styles.css';

export default function Footer() {
    return(
        <div className="footer">
            <div className="bar-footer"/>
            <div className="conteudo-footer">
                <div className="info">
                    <p>Desenvolvido por Matheus Sousa</p>
                </div>
                <SocialMedia />
            </div>
        </div>
    )
}