import classes from './AllCours.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cours from './Cours';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import AdminFooter from '../../Footer/AdminFooter';
import CircularProgressBar from '../../CircularProgressBar/CircularProgressBar';

export default function AdminAllCours(){

const navigate = useNavigate();

const [cours, setCours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showProgress, setShowProgress] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fonction pour récupérer les cours
        const fetchCours = async () => {
            try {
                const response = await fetch('https://e-learning-expert-lab-server.onrender.com/cours');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCours(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCours();
    }, []);

    const filteredCours = cours.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    if (loading) {
        return <p className={classes.loading}>Loading...</p>;
    }

    if (error) {
        return <p className={classes.error}>Error: {error}</p>;
    }

    function UpdateCours(courId) {
        navigate(`/admin/updateCour/${courId}`);
    }



    // ########################" Suppression de cour" ######################

    function handleDeleteCour(courId) {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?");
        if (confirmDelete) {
            fetch(`https://e-learning-expert-lab-server.onrender.com/cours/${courId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression du cours');
                }
                setCours(cours.filter(c => c._id !== courId)); // Met à jour l'état pour retirer le cours supprimé
            })
            .catch(error => {
                setError(error.message);
            });
        }

    }

    // ################# Déconnexion ########################

    const handleLogout = async () => {
        setShowProgress(true);
        
        try {
            const response = await axios.post('https://e-learning-expert-lab-server.onrender.com/logout', {}, { withCredentials: true });
            console.log(response);
            setIsSuccess(true);
            setMessage('Déconnexion réussie !');
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        } catch (error) {
            setTimeout(() => {
                setShowProgress(false);
            }, 3000);
            setIsSuccess(false);
            setMessage('Erreur lors de la déconnexion');
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            setTimeout(() => setShowProgress(false), 5000);
        }
    };

    return(
        <>
        <section className={classes.header_text}>

            <button className={classes.logout} onClick={handleLogout}>Se deconnecter</button>
            
            <h1>Tous les cours</h1>
            <p>Cliquez sur un cour pour modifier.</p>

            <form action="" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="search" 
                    name='recherche' 
                    placeholder='Rechercher un cours...' 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </form>

            <div className={classes.box_card}>
            
            {filteredCours.length > 0 ? 
            filteredCours.map((c) => (
                <Cours key={c.title} 
                title={c.title}
                detail={c.detail}
                duree={c.duree}
                lessons={c.lessons}
                image={c.imageUrl}
                icons={
                    <>
                        <MdDeleteForever className={classes.modif} onClick={() => handleDeleteCour(c._id)} />
                        {/* Autres icônes si nécessaire */}
                        {/* <MdEdit /> */}
                    </>
                }
                onSelectCour={() => UpdateCours(c._id)}
                 />
             ))  : <p className={classes.aucun_cour}>Aucun cours ne correspond à votre recherche. Essayez d'autres mots-clés.</p>
             } 
             
                
            </div>

            <AdminFooter />
            
        </section>
        {showProgress && (
                <CircularProgressBar isSuccess={isSuccess} message={message} duration={5000} />
            )}
        </>
    )
}