import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/notification'
import Form from './components/form'
import Search from './components/search'
import Display from './components/display'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const baseURL = '/api/persons';
  const reload = () => {
    axios
      .get(baseURL)
      .then(response => setPersons(response.data))  
  }
  const createNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), 4000)
  }

  useEffect(reload, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearch(event.target.value)
  const handleDelete = (id) => () => {
    const name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name} ?`))
      axios
        .delete(`${baseURL}/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          createNotification(`${name} is successfully removed`)
        })
        .catch(error => createNotification(error.response.data))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if(newName === '' || newNumber === '') {
      window.alert('Please fill both name and number')
      return
    }
      
    const thePerson = persons.find(person => person.name === newName)
    if(thePerson !== undefined) {
      if(window.confirm(`${newName} already exists. Replace the old number with a new one ?`)) {
        axios
          .put(`${baseURL}/${thePerson.id}`, { name: newName, number: newNumber })
          .then(({ data }) => {
            setPersons(persons.map(person => person.id === data.id ? data : person))
            createNotification(`${newName}'s number is successfully updated`)
          })
          .catch(error => createNotification(error.response.data))
        }
    }
    else {
      axios
        .post(baseURL, {name: newName, number: newNumber})
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          createNotification(`${newName} is successfully added`)
        })
        .catch(error => createNotification(error.response.data))
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Notification notificationMessage={notificationMessage}/>
      <Form
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Search search={search} handleSearch={handleSearch} />
      <Display persons={persons} search={search} handleDelete={handleDelete}/>
    </>
  )
}

export default App