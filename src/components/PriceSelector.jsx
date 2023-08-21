import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const priceFilters = [
    { label: "Free", condition: price => price === 0},
    { label: "0-10", condition: price => price >= 0 && price <= 10 },
    { label: "10-20", condition: price => price > 10 && price <= 20 },
    { label: "20-30", condition: price => price > 20 && price <= 30 },
    { label: "30-40", condition: price => price > 30 && price <= 40 },
    { label: "40-50", condition: price => price > 40 && price <= 50 },
    { label: ">50", condition: price => price > 50 }
];


function PriceSelector({ onSelectPriceFilter, selectedPriceFilter }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPriceFilter || "Price"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectPriceFilter(null)}>
          Any Price
        </MenuItem>
        {priceFilters.map((filter) => (
          <MenuItem onClick={() => onSelectPriceFilter(filter)} key={filter.label}>
            {filter.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default PriceSelector;
