import style from './PaginationBtns.module.css'

interface PaginationBtnsProps {
    onPrevious: () => void;
    onNext: () => void;
    currentPage: number;
}

export const PaginationBtns = (props: PaginationBtnsProps) => {
    return (
        <div className={style.paginationBtns}>
            <button className={style.paginationBtn} onClick={props.onPrevious}>Previous</button>
            <button className={style.paginationBtn} onClick={props.onNext}>Next</button>
        </div>
    )
}