import arrowDown from "../images/arrow-down.svg";
import arrowUp from "../images/arrow-up.svg";

function Sort(props) {
  const {
    SortClick,
    sort
  } = props;

  const handleSortClick = (type) => {
    if (type === sort.type) {
      SortClick({type: type, asc: !sort.asc});
    } else {
      SortClick({type: type, asc: false});
    }
  }

  return (
      <div className="search-sort__sort">
        <span>сортировать по:</span>
        <button onClick={() => handleSortClick("name")}>Имени {sort.type === "name" ? (sort.asc ? <img src={arrowUp} alt=""/> : <img src={arrowDown} alt=""/>) : ""}</button>
        <button onClick={() => handleSortClick("position")}>Должности {sort.type === "position" ? (sort.asc ? <img src={arrowUp} alt=""/> : <img src={arrowDown} alt=""/>) : ""}</button>
      </div>
  );
}

export default Sort;
