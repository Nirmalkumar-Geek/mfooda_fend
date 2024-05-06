import React, { useState } from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <div>
            {console.log(searchQuery)}
            <Form.Control
                type="text"
                placeholder="Search Restaurants"
                className="w-100"
                value={searchQuery}
                onChange={handleChange}
            />
        </div>

    );
};

export default SearchBar;
