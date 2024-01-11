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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { Divider } from "@mui/material";

function SignUp() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPwd, setCustomerPwd] = useState('');
  const [customerBirthYYYY, setCustomerBirthYYYY] = useState('');
  const [customerBirthMM, setCustomerBirthMM] = useState('');
  const [customerBirthDD, setCustomerBirthDD] = useState('');
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSetAgremment = () => setAgreement(!agreement);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    if (!agreement) {
      alert('약관에 동의해주세요.');
      return;
    }

    try {
      // 서버에 회원 가입 요청
      const response = await fetch('http://localhost:8080/api/customers/signUp', { // 'YOUR_API_ENDPOINT'는 실제 API 엔드포인트로 대체해야 함
        method: 'POST', // 요청 방식에 따라 'POST' 등으로 변경할 수 있음
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: customerName,
          customerPhone: customerPhone,
          customerEmail: customerEmail,
          customerPwd: customerPwd,
        }),
      });

      if (response.ok) {
        // 회원 가입 성공 처리
        localStorage.setItem('customerId', response.customerId);
        localStorage.setItem('customerName', customerName);
        localStorage.setItem('customerPhone', customerPhone);
        localStorage.setItem('customerEmail', customerEmail);
        alert("회원 가입 성공하였습니다! 로그인 페이지로 이동합니다.");
        navigate("/authentication/sign-in");
      } else {
        // 회원 가입 실패 처리
        console.log("회원 가입 실패");
      }
    } catch (error) {
      console.error("회원 가입 요청 중 오류 발생", error);
    }
  };


  return (
    <BasicLayout
      title="회원 가입"
      description="회원으로 가입하여 WooriAccount의 모든 혜택을 누려보세요."
      image={curved6}
    >
      <Card>
        <SoftBox mb={2}>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="유저 이메일" onChange={(e) => setCustomerEmail(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="패스워드" onChange={(e) => setCustomerPwd(e.target.value)} />
            </SoftBox>

            <SoftBox position="relative" >
              <Divider />
              <SoftBox
                bgColor="white"
                position="absolute"
                top="50%"
                left="50%"
                px={1.5}
                lineHeight={1}
                sx={{ transform: "translate(-50%, -60%)" }}
              >
              </SoftBox>
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput type="text" placeholder="성명" onChange={(e) => setCustomerName(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="tel" placeholder="전화번호" onChange={(e) => setCustomerPhone(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2} display="flex" alignItems="center">
              <SoftInput 
                type="text" 
                placeholder="생년" 
                maxLength={4}
                value={customerBirthYYYY}
                style={{textAlign:"center"}}
                onChange={(e) => {
                  if (e.target.value.length <= 4 && /^\d*$/.test(e.target.value)) {
                    setCustomerBirthYYYY(e.target.value);
                  }
                }} 
              />
              <SoftInput 
                type="text" 
                placeholder="월" 
                maxLength={2}
                value={customerBirthMM}
                onChange={(e) => {
                  if (e.target.value.length <= 2 && /^\d*$/.test(e.target.value)) {
                    setCustomerBirthMM(e.target.value);
                  }
                }} 
              />
              <SoftInput 
                type="text" 
                placeholder="일"  
                maxLength={2}
                value={customerBirthDD}
                onChange={(e) => {
                  if (e.target.value.length <= 2 && /^\d*$/.test(e.target.value)) {
                    setCustomerBirthDD(e.target.value);
                  }
                }} 
              />
            </SoftBox>

            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;회원 가입&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                약관
              </SoftTypography>
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                에 동의합니다.
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
                회원 가입
              </SoftButton>
            </SoftBox>
          </SoftBox>
          
          <SoftBox mt={3} textAlign="center">
              <Separator />
              <SoftTypography variant="button" color="text" fontWeight="regular">
                이미 회원이십니까?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  로그인
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
