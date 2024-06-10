import  { useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({value, onSearchChange, onImmediateChange }) {
    const searchDebounceRef = useRef(null);
    
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;

        //Update the search term immediately
        onImmediateChange(searchTerm);
        //Clear the existing timeout if it exists
        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }
        // Set a new timeout
        searchDebounceRef.current = setTimeout(() => {
            onSearchChange(searchTerm);
        }, 500);
    }
    return (
        <div>
            <input type="text"
            value={value}
            placeholder="Search..."
            onChange={handleSearchChange} 
            />
        </div>
    )
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onImmediateChange: PropTypes.func.isRequired,
};

export default SearchBar;