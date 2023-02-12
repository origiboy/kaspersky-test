import UsersCardSingle from "./UsersCardSingle";

function UsersCard(props) {
  const {
    users,
    addUserClick,
    addGroupClick
  } = props;

  return (
    <div className="view-card">
      <div>
        <button className="add-new-user" onClick={addUserClick}>Добавить нового пользователя</button>
        <button className="add-new-group" onClick={addGroupClick}>Добавить новую группу</button>
      </div>
      <div className="view-card__flexbox">
      { users.map((e) => ( <UsersCardSingle user={e} key={e.uid}/> )) }
      </div>


    </div>
  );
}

export default UsersCard;
