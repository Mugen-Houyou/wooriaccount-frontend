import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import colors from "assets/theme/base/colors";

export default function AccountsList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState('우리은행 자유입출금 123-123123-12');
  const open = Boolean(anchorEl);
  const { black } = colors;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => () => {
    setSelectedItem(value);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: colors.dark.main, fontSize:'1rem' }}
      >
        {selectedItem}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose(selectedItem)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose('우리은행 자유입출금 123-123123-12')}>우리은행 자유입출금 123-123123-12</MenuItem>
        <MenuItem onClick={handleClose('우리은행 자유입출금 546-564754-246')}>우리은행 자유입출금 546-564754-246</MenuItem>
        <MenuItem onClick={handleClose('우리은행 정기예금 459-349829-92358')}>우리은행 정기예금 459-349829-92358</MenuItem>
        <MenuItem onClick={handleClose('우리은행 적금 9834-253982-91325')}>우리은행 적금 9834-253982-91325</MenuItem>
      </Menu>
    </div>
  );
}
