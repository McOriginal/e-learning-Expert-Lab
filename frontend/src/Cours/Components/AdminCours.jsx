
import classes from './AllCours.module.css';



export default function AdminCours({title, image, detail, duree, lessons, icons, onSelectCour}){

    return(
        <>
       <article>
       <div className={classes.card} onClick={onSelectCour}>
            <div className={classes.box_img}>
                <img src={image} alt={title} />
                </div>
                <p className={classes.title}>{title}</p>
                <h4 className={classes.detail}>{detail} </h4>
                <p className={classes.lesson}>{duree}  .  {lessons} lessons</p>
                <div className={classes.icon}>
                {icons}

                </div>
                </div>
       </article>
        </>
    )
}