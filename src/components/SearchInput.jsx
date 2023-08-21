import React, { useRef } from 'react';
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from 'react-icons/bs';

function SearchInput({ onSearch }) {
  const ref = useRef(null);

  const handleInputChange = () => { //page updates constatly
    if (ref.current) {
      onSearch(ref.current.value);
    }
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search events..."
          variant="filled"
          width="2xl"  
          onChange={handleInputChange}
        />
      </InputGroup>
    </form>
  );
}

export default SearchInput;
