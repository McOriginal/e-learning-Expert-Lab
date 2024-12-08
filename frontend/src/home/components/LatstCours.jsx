import React, { useState, useEffect } from 'react';
import classes from './LatsCous.module.css';
import { useNavigate } from 'react-router-dom';

export default function LastCours() {
    const [latestCourses, setLatestCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loader();
    }, []);

    const loader = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://e-learning-expert-lab-server.onrender.com/latestcours');
            const data = await response.json();
            setLatestCourses(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des cours:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const goToCours = () => {
        navigate('/cours');
    }

    const goToCourDetail = (courId) => {
        navigate(`/cours/${courId}`);
    }

    return (
        <div className={classes.container}>
            <h2>Nos derniers cours</h2>
            <div className={classes.contente}>
                <p>Découvrez notre sélection de cours récemment ajoutés, conçus pour vous aider à développer vos compétences dans les domaines les plus demandés du numérique.</p>
                <button onClick={goToCours}>Voir tous</button>
            </div>

            {isLoading ? (
                <p>Chargement des cours...</p>
            ) : (
                <div className={classes.box_card}>
                    {latestCourses.map((course) => (
                        <div key={course._id} className={classes.card} onClick={() => goToCourDetail(course._id)}>
                            <div className={classes.box_img}>
                                <img src={course.imageUrl} alt={course.title} />
                            </div>
                            <p className={classes.title}>{course.title}</p>
                            <h4 className={classes.detail}>{course.detail}</h4>
                            <p className={classes.lesson}>{course.duree}  •  {course.lessons} leçons</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}