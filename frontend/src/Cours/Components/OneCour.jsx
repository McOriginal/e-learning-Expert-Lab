

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './OnCour.module.css';

import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";


export default function OneCour() {
    const { courId } = useParams(); // Récupérer courId depuis l'URL
    const [cours, setCours] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(0);



    useEffect(() => {
        // Fonction pour récupérer un cours spécifique
        const fetchCour = async () => {
            try {
                const response = await fetch(`http://https://e-learning-expert-lab-backend.onrender.com/cours/${courId}`);
                if (!response.ok) {
                    throw new Error('Cours not found!');
                }
                const data = await response.json();
                setCours(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCour();
    }, [courId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    
    const CourItem = (index) => {  
        setSelectedVideo(index);
        console.log(index);
    }

    const handlePreviousVideo = () => {
        // Revenir à la vidéo précédente, s'assurer qu'on ne dépasse pas la première vidéo
        setSelectedVideo((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleNextVideo = () => {
        // Passer à la vidéo suivante, s'assurer qu'on ne dépasse pas la dernière vidéo
        setSelectedVideo((prev) => (prev < cours.videos.length - 1 ? prev + 1 : prev));
    };

    return (
        <>
                <div className={classes.container}>
        
                    <div className={classes.videoContainer}>

                    <IoIosArrowDropleft onClick={handlePreviousVideo} className={classes.arrow_back} /> 
                        
                    {cours && cours.videos && cours.videos.length > 0 && (
                    <video key={selectedVideo} controls>
                        <source src={`http://https://e-learning-expert-lab-backend.onrender.com/${cours.videos[selectedVideo]}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>  
                    )} 
                    <IoIosArrowDropright onClick={handleNextVideo} className={classes.arrow_next} />
                    
                    </div>
                    
                    <div className={classes.box}>
                <div className={classes.coursItems}>
                    <h1 className={classes.coursTitle}>{cours.title}</h1>
                    <p className={classes.coursDetail}>{cours.detail}</p>
                    <p className={classes.coursDuree}>Durée : {cours.duree}</p>
                    <p className={classes.coursLessons}>Leçons : {cours.lessons}</p>                  
                    
                </div>


                <div className={classes.cours_list}>
                    
                {cours.videos.map((video, index) => (
                            <div key={index} className={classes.cour_box}>
                                <button className={index === selectedVideo ? classes.active : classes.btn} onClick={() => CourItem(index)}>cours :{index + 1} </button>
                            </div>
                        ))
                }
                </div>


                </div>
           
                </div>
        </>
    );
}
