import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './NewCoursForm.module.css';

export default function UpdateCour() {
    const { courId } = useParams();
    const [coursData, setCoursData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoursData = async () => {
            try {
                const response = await fetch(`https://e-learning-expert-lab-server.onrender.com/cours/${courId}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données du cours');
                }
                const data = await response.json();
                setCoursData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCoursData();
    }, [courId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch(`https://e-learning-expert-lab-server.onrender.com/cours/${courId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du cours');
            }

            await response.json();
            navigate('/admin/admincours');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={classes.container}>
                <div className={classes.form_container}>
                    <h1>Modifier le cours</h1>

                    <div className={classes.contact}>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className={classes.input_box}>
                                <input type="text" name="title" placeholder='Nom du cours' defaultValue={coursData?.title} />
                            </div>
                            <div className={classes.input_box}>
                                <input type="text" name="detail" placeholder='Faite un petit détail du cours' defaultValue={coursData?.detail} />
                            </div>
                            <div className={classes.input_box}>
                                <input type="text" name="duree" placeholder="Nombre d'heure" defaultValue={coursData?.duree} />
                            </div>
                            <div className={classes.input_box}>
                                <input type="text" name="lessons" placeholder='Nombe de lessons' defaultValue={coursData?.lessons} />
                            </div>
                            <div className={classes.input_box}>
                                <input type="text" name="imageUrl" placeholder='Image url' defaultValue={coursData?.imageUrl} />
                            </div>
                            <div className={classes.input_box}>
                                <input type="file" name="videos" multiple accept="video/*" />
                            </div>
                            <button type='submit'>Enregistrer</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}