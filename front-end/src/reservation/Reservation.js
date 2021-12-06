import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createReservation } from '../utils/api'
import ErrorAlert from "../layout/ErrorAlert";

function Reservation () {
  const history = useHistory()
  const initialForm = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: ''
  }
  const [newReservation, setNewReservation] = useState(initialForm);
  const [error, setError] = useState(null);

  function changeHandler({ target: { name, value } }) {
    setNewReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit (event) {
    event.preventDefault()
    setError(null);

    const response = {
      ...newReservation,
      status: "booked"
    }
    console.log(response)
    createReservation(response)
    .then(() => {
        history.push(`/reservation?date=${newReservation.reservation_date}`);
    })
    .catch(setError);
    console.log(newReservation)

    /*const response = await createReservation(newReservation);
    const res_date = response.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
          history.push(
          `/dashboard?date=`+res_date
          )*/

    /*createReservation(newReservation)
        .then((createdReservation) => {
          const res_date = createdReservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
          history.push(
          `/dashboard?date=`+res_date
          )
        })
      .catch(setError);*/
  }

  

  return (
    <main>
      <h1>Make a New Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='first_name'>First Name</label>
          <input 
            name='first_name' 
            id='first_name' 
            type='text' 
            value={newReservation.first_name} 
            onChange={changeHandler}/>
        </div>
        <div className='form-group'>
          <label className='last_name'>Last Name</label>
          <input 
            name='last_name' 
            id='last_name' 
            type='text' 
            value={newReservation.last_name} 
            onChange={changeHandler} />
        </div>
        <div className='form-group'>
          <label className='mobile_number'>Mobile Number</label>
          <input 
            name='mobile_number' 
            id='mobile_number' 
            type='text' 
            value={newReservation.mobile_number} 
            onChange={changeHandler}/>
        </div>
        <div className='form-group'>
          <label className='reservation_date'>Reservation Date</label>
          <input 
            name='reservation_date' 
            id='reservation_date' 
            type='text' 
            value={newReservation.reservation_date} 
            onChange={changeHandler}/>
        </div>
        <div className='form-group'>
          <label className='reservation_time'>Reservation Time</label>
          <input 
            name='reservation_time' 
            id='reservation_time' 
            type='text' value={newReservation.reservation_time} 
            onChange={changeHandler} />
        </div>
        <div className='form-group'>
          <label className='people'>Number of People</label>
          <input 
            name='people' 
            id='people' 
            type='number' 
            value={newReservation.people} 
            onChange={changeHandler}/>
        </div>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => history.push('/')}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <ErrorAlert error={error} />
    </main>
  )
}
export default Reservation
