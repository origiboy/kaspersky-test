function UsersGroups(props) {
  const {
    users,
    groups,
    addUserClick,
    addGroupClick
  } = props;

  return (
    <div className="view-groups">
      <div className="view-groups__flexbox">
        { groups.map((e) => (
          <div className="view-groups__group" key={ e }>
            <h3>{ e }</h3>
            { users.filter((a) => a.groups === e ).map((e) => (
              <div className="view-groups__user" key={ e.uid }>
                <span>{ e.name }</span>
                <span className="view-groups__user-position">{ e.position }</span>
              </div>
            )) }
            <button className="add-new-user" onClick={() => addUserClick(e)}>Добавить нового пользователя</button>
          </div>
        )) }
        <div className="view-groups__group">
          <h3>Без группы</h3>
          { users.filter((a) => a.groups === "Без группы" ).map((e) => (
            <div className="view-groups__user" key={ e.uid }>
              <span>{ e.name }</span>
              <span className="view-groups__user-position">{ e.position }</span>
            </div>
          )) }
          <button className="add-new-user" onClick={() => addUserClick("Без группы")}>Добавить нового пользователя</button>
        </div>
        <button className="add-new-group" onClick={addGroupClick}>Добавить новую группу</button>
      </div>
    </div>
  );
}

export default UsersGroups;
