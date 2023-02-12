import { useState } from 'react';

function UsersTableSingle(props) {
  const {
    user
  } = props;

  const [checked, setChecked] = useState(false);

  return (
    <div className={checked ? "view-table__users checked" : "view-table__users"} >
      <div className="view-table__cell">
        <input type="checkbox" defaultChecked={user.checked} onChange={() => setChecked(!checked)} className="view-table__checked" />
      </div>
      <div className="view-table__cell">
         { user.name }
      </div>
      <div className="view-table__cell">
        { user.account }
      </div>
      <div className="view-table__cell">
        { user.email }
      </div>
      <div className="view-table__cell">
        { user.groups }
      </div>
      <div className="view-table__cell">
        { user.position }
      </div>
      <div className="view-table__cell">
        { user.number.slice(0, 2) + " (" +  user.number.slice(2, 5) + ") " + user.number.slice(5, 8) + "-" + user.number.slice(8, 10) + "-" +  user.number.slice(10, user.number.length)}
      </div>
    </div>
  );
}

export default UsersTableSingle;
