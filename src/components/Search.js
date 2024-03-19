import "./Search.css";

const Search = ({ search, setSearch, handleSubmit }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Enter City Name"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default Search;
