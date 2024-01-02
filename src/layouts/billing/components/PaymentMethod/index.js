/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import SoftInput from "components/SoftInput";
import { useState } from "react";

function PaymentMethod() {
  const { borderWidth, borderColor } = borders;
  const [ accountFrom, setAccountFrom ] = useState("");
  const [ accountTo, setAccountTo ] = useState("");
  const [ amountToSend, setAmountToSend ]  = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 이벤트 방지

    try {
      // 송금 요청 예시 
      const response = await fetch('/api/sendWireTransfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountFrom, accountTo, amountToSend }),
      });

      if (response.ok) {
        console.log("송금 요청 성공");
      } else {
        console.log("송금 요청 실패");
      }
    } catch (error) {
      console.error("송금 요청 중 오류 발생", error);
    }
  };

  return (
    <Card id="delete-account" component="form" role="form" onSubmit={handleSubmit}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" >
        <SoftTypography variant="h6" fontWeight="bold">
          송금 정보를 입력하세요.
        </SoftTypography>
      </SoftBox>

      
      <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            />
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" >
        <SoftTypography variant="h6" fontWeight="medium" minWidth="110px">
          송금할 계좌:
        </SoftTypography>
        <SoftInput type="text" placeholder="송금할 계좌를 입력" 
                     value={accountFrom} onChange={(e) => setAccountFrom(e.target.value)} />
      </SoftBox>
      
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" >
        <SoftTypography variant="h6" fontWeight="medium" minWidth="130px">
          송금받을 계좌:
        </SoftTypography>
        <SoftInput type="text" placeholder="송금받을 계좌를 입력" 
                     value={accountTo} onChange={(e) => setAccountTo(e.target.value)} />
      </SoftBox>

      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" >
        <SoftTypography variant="h6" fontWeight="medium" minWidth="70px">
          금액:
        </SoftTypography>
        <SoftInput type="text" placeholder="금액을 입력" 
                     value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} />
      </SoftBox>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" >
      </SoftBox>

      <SoftButton pt={2} px={2} type="submit" variant="gradient" color="dark">
        송금
      </SoftButton>
    </Card>
  );
}

export default PaymentMethod;
