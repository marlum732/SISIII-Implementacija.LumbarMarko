import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const dates = ["2023-08-23", "2023-08-24","2023-08-25","2023-08-31", "2023-09-01", "2023-09-01", "2023-09-02", "2023-09-03", "2023-09-04", "2023-09-05"];

function DateSelector({ onSelectDate, selectedDate }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedDate || "Dates"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectDate(null)}>
          All Dates
        </MenuItem>
        {dates.map((date) => (
          <MenuItem onClick={() => onSelectDate(date)} key={date}>
            {date}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default DateSelector;
