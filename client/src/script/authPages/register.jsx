import { Link } from "react-router-dom";
import '../../styles/auth.css'

export default function Register(){
    return(
        <div className="login">
            <div className="card">
                <span className='header'>Inscription</span>
                <div className="inputs">

                    <input 
                        type="text"  
                        placeholder="Nom d'utilisateur"
                    />

                    <input 
                        type="text"  
                        placeholder="email"
                    />

                    <input 
                        type="text" 
                        placeholder="Mot de passe"/>
                </div>
                <span className="remind">Mot de passe oublié</span>
                <button className="connect">Se connecter</button>
                <span className="switch">Pas de compte? <a href="https://wa.me/22896388755">Contactez l'admin</a></span>
            </div>
        </div>
    );
}