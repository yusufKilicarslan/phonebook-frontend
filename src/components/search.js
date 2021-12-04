const Search = ({ search, handleSearch }) => (
  <div>
  <label>Search</label> <input type="text" value={search} onChange={handleSearch} />
  </div>
)

export default Search