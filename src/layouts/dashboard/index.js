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

import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

function formatCurrency(amount) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(amount);
}

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]); // 계좌 목록 상태
  const fetchAccounts = async () => {
    const customerId = localStorage.getItem('customerId'); // LocalStorage에서 customerId 가져오기
    const jwtToken = localStorage.getItem('jwtToken'); // LocalStorage에서 jwtToken 가져오기  
    
    try {
      const response = await fetch(`http://localhost:8080/api/accounts/find?id=${customerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${jwtToken}`, // JWT 토큰을 Authorization 헤더에 포함
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setAccounts(data); // 계좌 목록 상태 업데이트
      } else {
        console.error("계좌 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("계좌 목록 요청 중 오류 발생", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const createAnAccount = async () => {

    const customerId = localStorage.getItem('customerId'); // LocalStorage에서 customerId 가져오기
    
    const isConfirmed = window.confirm("정말로 계좌를 생성하시겠습니까?");
    
    if (!isConfirmed) return;

    if (!customerId) {
      alert("계좌 생성 권한이 없습니다. 영업점으로 직접 방문해주세요.");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/api/accounts/create/${customerId}`, {
        method: 'POST', // 계정 생성을 위한 POST 요청
        // 필요한 경우 헤더 설정
      });
  
      if (response.ok) {
        const data = await response.json();
        fetchAccounts();
        alert("계좌 생성 성공!");
        console.log("계좌 생성 성공!", data);
      } else {
        console.error("계좌 생성 실패");
      }
    } catch (error) {
      console.error("계좌 생성 요청 중 오류 발생: ", error);
    }
  };

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {accounts.map((account) => (
              <Grid key={account.accountNumber} item xs={18} sm={6} xl={4}>
                <MiniStatisticsCard
                  title={{ text: "우리은행 "+account.accountNumber }}
                  count={formatCurrency(account.balance)} // 포매팅 함수 사용
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
            ))}
            {/* 새 계좌 생성 버튼 */}
            <Grid item xs={18} sm={6} xl={4} onClick={createAnAccount}>
              <MiniStatisticsCard
                title={{ text: "새 계좌 생성하기..." }}
                icon={{ color: "info", component: "addcircleoutline" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;