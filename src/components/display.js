const Display = ({ persons, search, handleDelete }) => (
  <ul>
    {
      persons.filter((person) => person.name.toLowerCase().search(search.toLowerCase()) !== -1)
      .map((person) => (
        <li key={person.id} className='listEntry'>
          <button onClick={handleDelete(person.id)} style={{ color: 'red' }}> Delete </button>
          {person.name}: {person.number}
        </li>
      ))
    }
  </ul>
)

export default Display