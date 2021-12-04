const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, handleSubmit }) => (
  <form>
    <div>
      <label>Name: </label> <input type="text" value={newName} onChange={handleNameChange} />
    </div>
    <div>
      <label>Number</label> <input type="text" value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={handleSubmit} style={{ color: 'green'}}> add </button>
    </div>
  </form>
)

export default Form