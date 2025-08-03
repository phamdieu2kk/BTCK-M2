import React from 'react';
import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from '@mui/material';

const DropDown = ({
  dropDownItems,
  openMenu,
  dispatchClickFunction,
  handleDropDownClose,
}) => {
  const handleClick = (e) => {
    if (dispatchClickFunction) {
      dispatchClickFunction(e.target.innerText);
    }
    handleDropDownClose();
  };

  if (!openMenu) return null;

  return (
    <ClickAwayListener onClickAway={handleDropDownClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          zIndex: 10,
          mt: 1,
        }}
      >
        <Paper elevation={3}>
          <MenuList>
            {dropDownItems.map((item, idx) => (
              <MenuItem key={idx} onClick={handleClick}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
};

export default DropDown;
