import classes from './AllCours.module.css';
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Cours from './Cours';
import { useNavigate } from 'react-router-dom';

export default function AllCours(){

const navigate = useNavigate();

const [cours, setCours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fonction pour récupérer les cours
        const fetchCours = async () => {
            try {
                const response = await fetch('https://e-learning-expert-lab-backend.onrender.com/cours');
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

    function ShowCourDetail(courId) {
        navigate(`/cours/${courId}`);
    }

    return(
        <>
        <section className={classes.header_text}>
            
            <h1>Explorez nos cours</h1>
            <p>Découvrez notre sélection de cours pour développer vos compétences et atteindre vos objectifs professionnels.</p>

            <form action="" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="search" 
                    name='recherche' 
                    placeholder='Rechercher un cours...' 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FaSearch className={classes.searsh} />
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
                onSelectCour={() => ShowCourDetail(c._id)}
                 />
             ))  : <p className={classes.aucun_cour}>Aucun cours ne correspond à votre recherche. Essayez d'autres mots-clés.</p>
             } 
             
                
                  {/* <ul>
                {cours.map((coursItem) => (
                    <li key={cours._id}>
                        {coursItem.title}
                        {coursItem.detail}
                        {coursItem.duree}
                        {coursItem.lessons}
                        {coursItem.imageUrl}
                        {coursItem.addDate}
                        </li> 
                ))}
            </ul>  */}

                
            </div>
            
        </section>
        </>
    )
}