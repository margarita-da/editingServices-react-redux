import React, {useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService, getEditServices,fetchEditService } from '../actions/actionCreators';
import { NavLink, useParams,useHistory } from 'react-router-dom'
import Spinner from './Spinner';

function ServiceAdd(props) {
  const {item, loading, error, edit} = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();
  const params = useParams()
  const history = useHistory()

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(changeServiceField(name, value));
  };
  useEffect(() => {
    dispatch(getEditServices(params.id))

  }, [params.id])

  const handleSubmit = useCallback(
    async (evt) => {
      evt.preventDefault();
    if (edit === true) {
      dispatch(addService());
    } else {
        dispatch(fetchEditService(item))
    }
    history.push( '/services')
  },
  [dispatch, item]
);
    if(error){
      return <p>Произошла ошибка {error}</p>;
    }
    if (loading) {
      return(
      <>
        <Spinner/>
      </>
      )
    }
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div >
        <div>Название</div>
        <input name='name' onChange={handleChange} value={item && item.name} />
      </div>
      <div>
        <div>Цена</div>
        <input name='price' onChange={handleChange} value={item && item.price} />
      </div>
      

      {item && (
        <div className="option__block">
          <div>Описание</div>
          <input name='content' onChange={handleChange} value={item && item.content} />
        
          <NavLink to={`/services`}>
            Отмена
          </NavLink>
        </div>
      )}
      
      <button type='submit' disabled={loading}>Save</button>
      {error && <p>Something went wrong try again</p>}
    </form>
  );
}

export default ServiceAdd;
