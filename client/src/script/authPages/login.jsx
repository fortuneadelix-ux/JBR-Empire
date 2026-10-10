import '../../styles/auth.css'
import { data, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Bold } from 'lucide-react';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        if(!email || email.trim() === ""){
            setError("email")
            return;
        }
        if(!password || password.trim() === ""){
            setError("password")
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            });

            const data = await response.json();
            setError(data.message)

            console.log(data);
            if (!response.ok) {
                throw new Error("Erreur lors de la connexion");
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user))
           

        } catch (error) {
            console.error(error);
        }
            
    }
    return(
        <div className="login">
            <div className="content">
                <div className="presentationCard">
                    <span style={{fontWeight: 'Bold', fontSize: '20px', marginBottom: '20%'}}>JBR Empire mannager App</span>
                    <span style={{fontWeight: 'bold', fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)'}}>Espace de travail</span>
                    <span style={{fontWeight: 'bold', fontSize: '50px', marginBottom: '15px'}}>Gérez l'ensemble de vos opérations depuis un centre de contrôle unique</span>
                    <span style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '20px'}}>Accédez à l'activité de l'équipe, aux indicateurs de revenus, aux contrôles utilisateurs et à la santé du système depuis un espace de travail conçu pour la gestion quotidienne.</span>
                </div>

                <div className="connexion">
                    <div className="connexionContent">
                        <span style={{fontSize: 'large', fontWeight: 'bold', color: 'rgb(96, 136, 255)'}}>Connexion</span>
                        <span style={{fontSize: '30px', fontWeight: 'bold'}}>Bon retour parmis nous</span>
                        <span style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: '15px'}}>
                            Accédez à votre espace de travail grâce à vos identifiants d'équipe vérifiés
                        </span>

                        <form className="loginForm" onSubmit={onSubmit}>
                            <span style={{marginBottom: '5px', fontWeight: 'bold'}}>Email</span>
                            <input 
                                type="email"  
                                placeholder="name@exemple.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <span style={{fontWeight: 'bold'}}>Mot de passe</span> 
                                <span style={{color: 'rgb(96, 136, 255)', fontWeight: 'bold'}}>Mot de passe oublié ?</span>
                            </div>
                            <input 
                                type="password" 
                                style={{marginTop: '5px'}}
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className='remember' style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                                <input type="checkbox" />
                                <span>Se souvenir de moi pour 1 mois</span>
                            </label>

                            <span className='error'>{data.message}</span>
                            <button type='submit' className='connectBut'>Se connecter</button>

                            <div className="divider">
                                <span>OR CONTINUE WITH</span>
                            </div>
                            <div className="loginLinks">
                                <button className="google">Google</button>
                                <button className="gitHub">GitHub</button>
                            </div>

                            <span style={{display :'flex' ,width: '100%', justifyContent: 'center'}}>Vous n'avez pas de compte ? <a href="https://wa.me/22896388755"> Contactez l'admin</a></span>
                            
                        </form>
                    </div>
                </div>
            </div>
            

        </div>
    );
}
