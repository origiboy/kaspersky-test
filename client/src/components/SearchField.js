import { useState, useEffect } from 'react';

function SearchField(props) {
  const {
    search,
    searchArgument
  } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    search(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
      <div className="search-sort__search">
        <input placeholder="Кого ищем?" value={value} onChange={(e) => setValue(e.target.value)} /> по
        <select onChange={(e) => searchArgument(e.target.value)} defaultValue="name">
          <option value="name">Имени</option>
          <option value="account">Названии учетной записи</option>
          <option value="email">Названии электронной почты</option>
          <option value="groups">Группе</option>
          <option value="position">Должности</option>
          <option value="number">Номеру телефона</option>
        </select>
      </div>
  );
}

export default SearchField;
