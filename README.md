# Тестовое задание SafeBoard 2022. Разработка JavaScript

## Стек

frontend: HTML, CSS, React
backend: Node.js, Express + Firebase Realtime Database

<img width="1548" alt="image" src="https://user-images.githubusercontent.com/73246237/218320062-5fb31dfa-a56c-4663-ae03-4b4a42f26af9.png">


## Общее описание

Сервер локальный, поэтому для работы приложения сначала необходимо запустить сервер (см. server/README.md).
Для запуска приложения см. client/README.md.

## Небольшой отчёт по проделанной работе

Frontend разработан только с использованием функциональных компонентов (без классов).

Интерфейс сортировки, поиска и всплывающих попапов сделал на свое усмотрение.

Дополнительно (не по макету таблицы) добавлено поле "должность", которое вроде как есть на макете варианта отображения "группы".

Не совсем понял назначение чекбокса, поэтому просто добавил отслеживание изменения состояния и соответствующих стилей. Не стал делать сохранение изменений в базде данных с целью избежать неоправданного трафика. Тем не менее в самой базе данных предусмотрено поле состояния чекбокса.

Сортировка реализована для всех полей, кроме номера телефона (вряд ли понадобится сортировать номера). В видах отображения "карточки" и "группы" сортировка реализована только для отображаемых данных.

Поиск реализован моментальным с возможность выбора поля, по которому происходит поиск.

Добавление новых групп происходит через попап. Группа должна быть уникальной, при добавлении уже существующей группы, будет выводиться ошибка.

Добавление новых пользователей происходит через попап. Какой-либо сложной валидации нет, стандартная встроенная проверка. Группу можно выбрать из выпадающего списка. При нажатии на кнопку добавления нового пользователя при варианте отображения "группы" в конкретной группе, в выпадающем списке попапа автоматически выберется группа (которую можно поменять).

Дополнительно добавил немного тестов cypress.
