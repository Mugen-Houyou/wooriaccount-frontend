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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 기본 이벤트 방지

    try {
      // 로그인 요청 예시 
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 성공적인 로그인 처리
        console.log("로그인 성공");
        console.log("username:"+username+","+"password:"+password);
      } else {
        // 로그인 실패 처리
        console.log("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생", error);
    }
  };

  return (
    <CoverLayout
      title="환영합니다."
      description="ID 및 패스워드를 입력하여 로그인하세요."
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleLogin}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              유저 ID
            </SoftTypography>
          </SoftBox>
          <SoftInput type="username" placeholder="username" 
                     value={username} onChange={(e) => setUsername(e.target.value)} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              패스워드
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" 
                     value={password} onChange={(e) => setPassword(e.target.value)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;로그인 정보 기억하기
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            로그인
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            계정이 없다면?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              회원 가입
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
