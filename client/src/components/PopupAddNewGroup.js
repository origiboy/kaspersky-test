import { useFormik } from 'formik';

function PopupAddNewGroup(props) {
  const {
    addGroup,
    closeClick
  } = props;

  const formik = useFormik({
     initialValues: {
       group: '',
     },
     onSubmit: values => {
       addGroup(values);
     },
  });

  return (
    <div className="popup-user">
      <div className="popup-user__inner">
        <h2>Добавить новую группу</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="group">Название новой группы</label>
          <input
           id="group"
           name="group"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.group}
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

export default PopupAddNewGroup;
