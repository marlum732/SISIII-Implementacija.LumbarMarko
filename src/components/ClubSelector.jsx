import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const clubs = ["Pergola", "Alaya", "Tivoli", "Retro", "Bellavita", "Canava"];

function ClubSelector({ onSelectClub, selectedClub }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedClub || "Clubs"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectClub(null)}>
          All Clubs
        </MenuItem>
        {clubs.map((club) => (
          <MenuItem onClick={() => onSelectClub(club)} key={club}>
            {club}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default ClubSelector;
