import style from './FilteringBtn.module.css'

interface FilteringBtnProps {
  onChange: (value: boolean | null) => void;
  options: string[];
}
export const FilteringBtn = (props: FilteringBtnProps) => {
  return (
    <>
      <select className={style.selectFilter} onChange={(e) => props.onChange(e.target.value === "true" ? true : e.target.value === "false" ? false : null)}>
        <option value="">All</option>
        <option value="true">{props.options[0]}</option>
        <option value="false">{props.options[1]}</option>
      </select>
    </>
  )
}