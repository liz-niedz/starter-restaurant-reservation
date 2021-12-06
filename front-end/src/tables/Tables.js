import React from 'react'
import { useHistory } from 'react-router-dom'

function Table () {
  const history = useHistory()
  //const initialForm = {
  //  table_name: '',
   // capacity: ''
  //}
  //const [newTable, setNewTable] = useState(initialForm)

  async function handleSubmit (event) {
    event.preventDefault()
    //const table = {
   //   ...newTable
    //}
    //const response = await createReservation(reservation)
    history.push('/dashboard')
  }

  return (
    <main>
      <form>
        <div className='form-group'>
          <label className='table_name'>Table Name</label>
          <input name='table_name' id='table_name' type='text' />
        </div>
        <div className='form-group'>
          <label className='capacity'>Capacity</label>
          <input name='capacity' id='capacity' type='number' />
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
    </main>
  )
}

export default Table
