import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { removeService, fetchServices} from '../actions/actionCreators';
import Spinner from './Spinner';
import { NavLink } from 'react-router-dom'

function ServiceList(props) {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  const handleRemove = id => {
    dispatch(removeService(id));
  }

  if (loading) {
    return(
    <>
      <Spinner/>
    </>
    )
  }

  if (error) {
    
    return <p>Произошла ошибка {error}</p>;
  }

  return (
    <ul>
      {items.map(o => (
        <li key={o.id}>
          {o.name} {o.price}
            <NavLink to={`/services/${o.id}`}>edit</NavLink>
          <button onClick={() => handleRemove(o.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList