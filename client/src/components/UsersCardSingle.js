import { useState } from 'react';

import userImage from "../images/user.png";

function UsersCardSingle(props) {
  const {
    user
  } = props;

  const [checked, setChecked] = useState(false);

  return (
    <div className={checked ? "view-card__card checked" : "view-card__card"} >
      <input type="checkbox" defaultChecked={user.checked} onChange={() => setChecked(!checked)} />
      <h2>{ user.name }</h2>
      <img src={userImage} alt=""/>
      <span>{ user.position }</span>
      <span>{ user.groups }</span>
      <span>{ user.number }</span>
    </div>
  );
}

export default UsersCardSingle;
