import React, { useState, useEffect } from 'react'
import axios from 'axios'
//newName controls form input element

const Person = ({person}) =>{
  return(
    <li key={person.name}>{person.name} {person.number} </li>
  )
}
const Persons = ({persons, filter}) =>{
  return(
    <ul>
    {
      persons.filter((individual)=>individual.name.toLowerCase().includes(filter.toLowerCase()))
      .map((individual)=>
      <Person  person={individual}/>
    )
    }
  </ul>
  )
}

const Input = ({label, value, handler}) =>{
  return(
    <div>
      {label} <input onChange={handler} value={value} />
  </div>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{
      console.log('data GET')
      setPersons(response.data)
    })
  }, [])
  const handleNameChange = (event) =>{
    setNewName(event.target.value);
  }

  const handleNumChange = (event) =>{
    setNewNum(event.target.value);
  }
  const handleFilterChange = (event) => setFilter(event.target.value)


  const handleSubmitForm = (event) =>{
    event.preventDefault();
    persons.find(existing => existing.name === newName) ? 
      alert(`${newName} is already added to phonebook`) : 
      setPersons(persons.concat({name: newName, number: newNum}))
    setNewName('')
    setNewNum('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Input label="filter shown with" value={filter} handler={handleFilterChange}/>
      
      <h2>
        Add a new
      </h2>
      <form onSubmit={handleSubmitForm}>
      <Input label="name: " value={newName} handler={handleNameChange}/>
      <Input label="number: " value={newNum} handler={handleNumChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons filter={filter} persons={persons}/>
    </div>
  )
}



export default App