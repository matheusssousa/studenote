import React from "react";
import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import "./styles.css"

const SocialMedia = () => {
    return (
        <div>
            <nav className="info-icons">
                <a href="https://www.instagram.com/theusousab/" target="_blank" rel="noopener noreferrer" className="instagram">
                    <InstagramLogo size={25} />
                </a>
                <a href="https://github.com/matheusssousa" target="_blank" rel="noopener noreferrer" className="github">
                    <GithubLogo size={25} />
                </a>
                <a href="https://www.linkedin.com/in/matheus-sousa-17b214208/" target="_blank" rel="noopener noreferrer" className="linkedin">
                    <LinkedinLogo size={25} />
                </a>
            </nav>
        </div>
    )
}

export default SocialMedia;