import { withLoading } from "../../hoc/withLoading";
import style from './Card.module.css'

interface CardProps {
    name: string;
    date?: string | null;
    imgUrl: string;
    isSuccessful?: boolean;
    onClick?: () => void;
}
export const Card = (props: CardProps) => {
    return (
        <div className={style.card} onClick={props.onClick}>
            <div className={style.cardImageContainer}>
                <img src={props.imgUrl} alt={props.name} className={style.cardImage} />
            </div>
            <div className={style.cardContent}>
                <h3>{props.name}</h3>
                <p>{props.date ? new Date(props.date).toLocaleDateString() : "Date not available"}</p>
                {props.isSuccessful !== undefined && (
                    <p className={props.isSuccessful ? style.successful : style.unsuccessful}>
                        Status: {props.isSuccessful ? "Successful" : "Unsuccessful"}
                    </p>
                )}
            </div>
        </div>
    )
}
export const CardWithLoading = withLoading(Card);