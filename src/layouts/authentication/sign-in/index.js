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
import { Link, useNavigate } from "react-router-dom";

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
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate(); // useNavigate 훅 사용
  
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 기본 이벤트 방지

    try {
      const urlToSend = `${process.env.REACT_APP_ENDPOINT_URL}/customer/login`;
      alert(`${process.env.REACT_APP_ENDPOINT_URL}`)
      // 로그인 요청 예시 
      const response = await fetch(urlToSend, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pwd }),
      });

      if (response.ok) {
        // 로그인 성공 시 처리
        console.log("로그인 성공");

        //const token = response.headers.get("Authorization").split(" ")[1]; // "Bearer {토큰}"에서 토큰 값만 추출
        const token = response.headers.get("Authorization"); // "Bearer {토큰}" 전부 포함
        localStorage.setItem('jwtToken', token);

        const responseWithTk = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/api/customers/login`, {
          method: 'POST',
          headers: {
            'Authorization': `${token}`, // JWT 토큰을 Authorization 헤더에 포함
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, pwd }),
        });

        // LocalStorage에 사용자 정보 저장
        const data = await responseWithTk.json();
        localStorage.setItem('customerId', data.customerId);
        localStorage.setItem('customerName', data.customerName);
        console.log("로그인 성공");

        // const redisNotiSub = await fetch(`http://localhost:8080/api/notifications/subscribe/${data.customerId}`, {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `${token}`, // JWT 토큰을 Authorization 헤더에 포함
        //   }
        // });

        // if (redisNotiSub.ok) {
        //   // 로그인 성공 시 처리
        //   console.log(redisNotiSub);
        // }

        // "/dashboard"로 리다이렉트
        navigate("/dashboard", { 
          state: { 
            customerName: `${data.customerName}`, 
          } 
        });
      } else {
        // 로그인 실패 처리
        alert("로그인 실패! 이메일 및 패스워드를 다시 확인해주세요.");
        setEmail("");
        setPwd("");
      }
    } catch (error) {
      alert("로그인 실패! 이메일과 패스워드를 다시 확인해주세요.");
      setEmail("");
      setPwd("");
      console.error("로그인 요청 중 오류 발생", error);
    }
  };

  return (
    <CoverLayout
      title="환영합니다."
      description="이메일 및 패스워드를 입력하여 로그인하세요."
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleLogin}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              유저 이메일
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="유저 이메일" 
                     value={email} onChange={(e) => setEmail(e.target.value)} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              패스워드
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="패스워드" 
                     value={pwd} onChange={(e) => setPwd(e.target.value)} />
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
