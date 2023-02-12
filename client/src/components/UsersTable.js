import arrowDown from "../images/arrow-down.svg";
import arrowUp from "../images/arrow-up.svg";

import UsersTableSingle from "./UsersTableSingle";

function UsersTable(props) {
  const {
    users,
    sort,
    SortClick,
    addUserClick,
    addGroupClick
  } = props;

  const handleSortClick = (type) => {
    if (type === sort.type) {
      SortClick({type: type, asc: !sort.asc});
    } else {
      SortClick({type: type, asc: false});
    }
  }

  return (
    <div className="view-table">
      <button className="add-new-user" onClick={addUserClick}>Добавить нового пользователя</button>
      <button className="add-new-group" onClick={addGroupClick}>Добавить новую группу</button>

      <div className="view-table__header">
        <div className="view-table__cell">
          <input type="checkbox" disabled className="view-table__checked" />
        </div>
        <button className="view-table__cell" onClick={() => {handleSortClick("name")}}>
          Полное имя {sort.type === "name" ? (sort.asc ? <img src={arrowUp} alt=""/> : <img src={arrowDown} alt=""/>) : ""}
        </button>
        <button className="view-table__cell" onClick={() => {handleSortClick("account")}}>
          Учетная запись {sort.type === "account" ? (sort.asc ? <img src={arrowUp} alt=""/> : <img src={arrowDown} alt=""/>) : ""}
        </button>
        <button className="view-table__cell" onClick={() => {handleSortClick("email")}}>
          Электронная почта {sort.type === "email" ? (sort.asc ? <img src={arrowUp} alt=""/> : <img src={arrowDown} alt=""/>) : ""}
        </button>
        <button className="view-table__cell" onClick={() => {handleSortClick("groups")}}>
          Группа {sort.type === "groups" ? (sort.asc ? <img src={arrowUp} alt=""/> : <img src={arrowDown} alt=""/>) : ""}
        </button>
        <button className="view-table__cell" onClick={() => {handleSortClick("position")}}>
          Должность {sort.type === "position" ? (sort.asc ? <img src={arrowUp} alt=""/> : <img src={arrowDown} alt=""/>) : ""}
        </button>
        <button className="view-table__cell">
          Номер телефона
        </button>
      </div>
      { users.map((e) => (
        <UsersTableSingle user={e} key={e.uid} />
      ))}

    </div>
  );
}

export default UsersTable;
