import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import colors from "assets/theme/base/colors";

function AccountsList({ onSelectAccount }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const open = Boolean(anchorEl);
  const { dark } = colors;


  useEffect(() => {
    const fetchAccounts = async () => {
      const jwtToken = localStorage.getItem('jwtToken'); // LocalStorage에서 jwtToken 가져오기  
      try {
        const customerId = localStorage.getItem('customerId'); // LocalStorage에서 customerId 가져오기
        // const response = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/api/accounts/find/${customerId}`, {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/api/accounts/find?id=${customerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `${jwtToken}`, // JWT 토큰을 Authorization 헤더에 포함
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAccounts(data);
          if (data.length > 0) {
            setSelectedItem(data[0].accountNumber); // 첫 번째 계좌를 기본 선택
          }
        } else {
          console.error("계좌 목록을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("계좌 목록 요청 중 오류 발생", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (account) => () => {
    if (account) {
      setSelectedAccountId(account.accountId);
      setSelectedItem(account.accountNumber);
      onSelectAccount(account.accountId);
    }
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
        style={{ color: dark.main, fontSize: '1rem' }}
      >
        {selectedItem || '계좌를 선택하세요'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose()}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
      {accounts.map((account) => (
        <MenuItem key={account.accountNumber} onClick={handleClose(account)}>
          {account.accountNumber}
        </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

AccountsList.propTypes = {
  onSelectAccount: PropTypes.func.isRequired,
};

export default AccountsList;
