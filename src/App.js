import React, { useState } from 'react'

const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, handleSubmit }) => (
  <form>
    <div>
      <label>Name: </label> <input type="text" value={newName} onChange={handleNameChange} />
    </div>
    <div>
      <label>Number</label> <input type="text" value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={handleSubmit}> add </button>
    </div>
  </form>
)

const Search = ({ search, handleSearch }) => (
  <div>
  <label>Search</label> <input type="text" value={search} onChange={handleSearch} />
  </div>
)

const Display = ({ persons, search }) => (
  <ul>
  {
    persons.filter((person) => person.name.toLowerCase().search(search.toLowerCase()) !== -1)
    .map((person) => <li key={person.name}>{person.name}: {person.number}</li>)
  }
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '000'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearch(event.target.value)
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.find((person) => person.name === newName) !== undefined) {
      window.alert(`${newName} is already added`)
    }
    else if(newName === '' || newNumber === '') {
      window.alert('Please fill both name and number')
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Form
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Search search={search} handleSearch={handleSearch} />
      <Display persons={persons} search={search} />
    </>
  )
}

export default App