import React, { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { Searchbar } from "react-native-paper";

export const SearchScreen = ({ }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    )
}

export default SearchScreen