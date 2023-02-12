import { useFormik } from 'formik';

function PopupAddNewUser(props) {
  const {
    groups,
    addUser,
    closeClick,
    defaultGroup
  } = props;

  const formik = useFormik({
     initialValues: {
       name: '',
       email: '',
       groups: defaultGroup ?? 'Без названия',
       position: '',
       number: '',
     },
     onSubmit: values => {
       addUser(values);
     },
   });

  return (
    <div className="popup-user">
      <div className="popup-user__inner">
        <h2>Добавить нового пользователя</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Имя и фамилия</label>
          <input
           id="name"
           name="name"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.name}
           required
          />

          <label htmlFor="account">Учетная запись (формируется автоматически)</label>
          <input
           id="account"
           name="account"
           type="text"
           value={"kaspersky.ru/" + formik.values.name.replace(/\s/g, "")}
           disabled
          />

          <label htmlFor="email">Электронная почта</label>
          <input
           id="email"
           name="email"
           type="email"
           onChange={formik.handleChange}
           value={formik.values.email}
           required
          />
          <label htmlFor="groups">Группа</label>
          <select
            name="select"
            onChange={value => formik.setFieldValue('groups', value.target.value)}
            value={formik.values.groups}
          >
            <option value="Без группы">Без группы</option>
            { groups.map((option) => <option key={ option } value={ option }>{ option }</option>) }
          </select>
          <label htmlFor="position">Должность</label>
          <input
           id="position"
           name="position"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.position}
           required
          />
          <label htmlFor="number">Номер телефона (формат +7XXXXXXXXXX)</label>
          <input
           id="number"
           name="number"
           type="tel"
           pattern="[+]{1}[0-9]{11,14}"
           onChange={formik.handleChange}
           value={formik.values.number}
           required
          />
          <button type="submit">Добавить</button>
        </form>
      <button className="popup-user__close" onClick={closeClick}>

      </button>
      </div>
    </div>
  );
}

export default PopupAddNewUser;
