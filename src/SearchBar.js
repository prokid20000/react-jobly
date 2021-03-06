import { useState } from "react";
import "./SearchBar.css";

/** SearchBar, form that is used for searching for a term
 * 
 * Props:
 * - performSearch: function for performing search, setting state
 * 
 * State:
 * - formData: object of the form
 * 
 * {Companies, Jobs} -> SearchBar
 */

function SearchBar({ performSearch }) {
  const initialFormData = { search: "" };
  const [formData, setFormData] = useState(initialFormData);

  // Perform search and then reset search box blank.
  function handleSubmit(evt) {
    evt.preventDefault();
    performSearch(formData);
    setFormData(initialFormData);
  }

  // Update the formData state when user types
  function handleChange(evt) {
    const { value } = evt.target;
    setFormData({ "search": value });
  }

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          value={formData.search}
          placeholder="Enter search term.."
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SearchBar;