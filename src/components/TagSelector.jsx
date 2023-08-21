import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const tags = ["ceca","balkan","party","techno","house"];


function TagSelector({ onSelectTag, selectedTag }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedTag || "Tags"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectTag(null)}>
          All Tags
        </MenuItem>
        {tags.map((tag) => (
          <MenuItem onClick={() => onSelectTag(tag)} key={tag}>
            {tag}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default TagSelector;
