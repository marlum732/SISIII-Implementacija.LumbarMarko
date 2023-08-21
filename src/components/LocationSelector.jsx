import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const locations = ["Koper", "Ljubljana", "Portorož", "Izola", "Ljubljana", "Postojna", "Lucija", "Ankaran", "Maribor"];

function LocationSelector({ onSelectLocation, selectedLocation }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedLocation || "Locations"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectLocation(null)}>
          All Locations
        </MenuItem>
        {locations.map((location) => (
          <MenuItem onClick={() => onSelectLocation(location)} key={location}>
            {location}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default LocationSelector;
