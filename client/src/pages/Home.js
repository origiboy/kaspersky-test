import {
  Link
} from "react-router-dom";

function Home() {
  return (
    <div className="container home">
      <div className="home__main-content">
        <h1 className="home__header">Добро пожаловать на страницу проекта для SafeBoard 2022!</h1>
        <Link to="/users/" className="home__button">Перейти на страницу пользователей</Link>
      </div>
      <div className="home__author">Разработано <b>Косаревым Михаилом</b> специально для kaspersky</div>
    </div>
  );
}

export default Home;
