import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UsersTable from '../components/UsersTable';
import UsersCard from '../components/UsersCard';
import UsersGroups from '../components/UsersGroups';

import SearchField from '../components/SearchField';
import PopupAddNewUser from '../components/PopupAddNewUser';
import PopupAddNewGroup from '../components/PopupAddNewGroup';
import Sort from '../components/Sort';

const API_URL = "http://localhost:3300/";
const COMPANY_DOMAIN = "kaspersky.ru/";


function Users() {
  const [viewType, setViewType] = useState("table"); //views: table, cards, groups
  const [actualUsers, setActualUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchArgument, setSearchArgument] = useState("name");
  const [sort, setSort] = useState({type: null, asc: true});
  const [popupUser, setPopupUser] = useState({state: false, group: null});
  const [popupGroup, setPopupGroup] = useState(false);

  useEffect(() => {
    fetch(API_URL + "users/get/").then(response => response.json())
    .then(data => {
      setActualUsers(Object.values(data.users || {}));
      setUsers(Object.values(data.users || {}));
      setGroups(data.groups || []);
    });
  }, []);

  useEffect(() => {
    if (actualUsers) {
      let usersFormatted = users, query;
      if (search !== null) {
        usersFormatted = usersFormatted.filter((element) => {
          query = String(element[searchArgument]).toLowerCase().replace(/\s/g, "");
          if (query.indexOf(search) !== -1) {
            return true;
          } else {
            return false;
          }
        });
      }
      if (sort.type !== null) {
        usersFormatted = usersFormatted.sort((a, b) => {
          const nameA = a[sort.type].toLowerCase();
          const nameB = b[sort.type].toLowerCase();
          if (nameA < nameB) {
           return !sort.asc ? -1 : 1;
          }
          if (nameA > nameB) {
           return sort.asc ? -1 : 1;
          }
          return 0;
        });
      }
      setActualUsers(usersFormatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, searchArgument]);

  const handleSearch = (s) => {
    let query = s.toLowerCase().replace(/\s/g, "");
    setSearch(query);
  }

  const handleAddUser = (values) => {
    setPopupUser(false);
    const newUser = Object.assign(values);
    newUser.uid = Date.now();
    newUser.account = COMPANY_DOMAIN + newUser.name.replace(/\s/g, "");
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    };
    fetch(API_URL + "users/add/", requestOptions).then(response => response.json())
    .then(data => {
      if (data) {
        alert("Пользователь добавлен");
        setUsers(Object.values(data.users || {}));
        setActualUsers(Object.values(data.users || {}));
      } else {
        alert("Произошла ошибка, попробуйте позже!");
      }
    });
  }

  const handleAddGroup = (values) => {
    setPopupGroup(false);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch(API_URL + "groups/add/", requestOptions).then(response => response.json())
    .then(data => {
      if (data.message === "OK") {
        alert("Группа успешно добавлена");
        setGroups(data.groups);
      } else if (data.error === "alreadyAdded") {
        alert("Такая группа уже есть!");
      } else {
        alert(`Произошла ошибка, попробуйте позже - ${data.error}`);
      }
    });
  }

  return (
    <div className="container user">
      <Link to="/" className="user__back">Вернуться на домашнюю</Link>
      <div className="user__view">
        <span>Вид отображения:</span>
        <button
          className={viewType === "table" ? "active" : ""}
          onClick={() => setViewType("table")}>Общая таблица</button>
        <button
          className={viewType === "cards" ? "active" : ""}
          onClick={() => setViewType("cards")}>Список карточек пользователей</button>
        <button
          className={viewType === "groups" ? "active" : ""}
          onClick={() => setViewType("groups")}>Группы пользователей</button>
      </div>
      <div className="search-sort">
        <SearchField search={handleSearch} searchArgument={(a) => setSearchArgument(a)} />
        { viewType === "cards" || viewType === "groups" ? <Sort sort={sort} SortClick={(a) => setSort(a)} /> : "" }
        <div>
          <button onClick={() => setSort({type: null, asc: true})} className="search-sort__reset-sort">Сбросить сортировку</button>
        </div>
      </div>
      {
        viewType === "table" ? <UsersTable users={actualUsers} sort={sort} SortClick={(a) => setSort(a)} addUserClick={() => setPopupUser({state: true, group: null})} addGroupClick={() => setPopupGroup(true)} /> :
          viewType === "cards" ? <UsersCard users={actualUsers} addUserClick={() => setPopupUser({state: true, group: null})} addGroupClick={() => setPopupGroup(true)} /> :
            viewType === "groups" ? <UsersGroups users={actualUsers} groups={groups} addUserClick={(a) => setPopupUser({state: true, group: a})} addGroupClick={() => setPopupGroup(true)} /> : ""
      }
      { popupUser.state ? <PopupAddNewUser defaultGroup={popupUser.group} groups={groups} addUser={handleAddUser} closeClick={() => setPopupUser({state: false, group: null})} /> : ""  }
      { popupGroup ? <PopupAddNewGroup addGroup={handleAddGroup} closeClick={() => setPopupGroup(false)} /> : ""  }
    </div>
  );
}

export default Users;
