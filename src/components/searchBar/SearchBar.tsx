import style from './SearchBar.module.css'

interface SearchBarProps {
    ref: React.RefObject<HTMLInputElement | null>;
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
    return (
        <input className={style.searchInput} type="search" placeholder="Search..." ref={props.ref} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    )
}