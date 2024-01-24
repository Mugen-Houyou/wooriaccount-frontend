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

import {useState, useEffect} from 'react';

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import AccountsList from "../../components/AccountsList";
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import { Icon } from '@mui/material';
import typography from 'assets/theme/base/typography';

function transformResponseToChartData(responseJSON) {
  // 월별 지출 금액과 잔액을 저장할 배열 초기화
  const monthlyExpenditure = new Array(12).fill(0);
  const monthlyBalance = new Array(12).fill(0);

  // 거래 내역을 순회하며 월별로 지출 금액과 잔액을 계산
  responseJSON.forEach(transaction => {
    const month = transaction.createdAt[1] - 1; // 월을 0부터 11까지의 인덱스로 변환
    const amount = transaction.amount;
    const balance = transaction.balanceAfterTx;

    monthlyExpenditure[month] += amount;
    monthlyBalance[month] = balance; // 월별 마지막 잔액 저장
  });

  return {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    datasets: [
      {
        label: "수입/지출액",
        color: "info",
        data: monthlyExpenditure
      },
      {
        label: "잔액",
        color: "dark",
        data: monthlyBalance
      }
    ]
  };
}


// 목업
const mockTransactions = [
  {
    senderName: "홍길동",
    targetName: "김철수",
    amount: "100000",
    balanceAfterTx: "500000",
    description: "송금",
    createdAt: "2022-07-01T12:00:00"
  },
  {
    senderName: "이영희",
    targetName: "박지민",
    amount: "150000",
    balanceAfterTx: "350000",
    description: "생일 축하금",
    createdAt: "2022-07-02T15:30:00"
  },
  {
    senderName: "김민준",
    targetName: "조은지",
    amount: "200000",
    balanceAfterTx: "800000",
    description: "대출 상환",
    createdAt: "2022-07-03T09:20:00"
  },
];

const mockChartData = {
  labels: [" "],
  datasets: [
    {
      label: "로드 중...",
      color: "info",
      data: [1],
    },
    {
      label: " ",
      color: "dark",
      data: [1],
    },
  ],
};


// 일시 포매터
function formatDate(dateArray) {
  const [year, month, day, hour, minute, second] = dateArray;
  return new Date(year, month -1, day, hour, minute, second); 
  // return date.toISOString().split('.')[0]; 
}

function Tables() {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [transactions, setTransactions] = useState(mockTransactions);
  const [chartData, setChartData] = useState(mockChartData);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));

  const { size } = typography;

  useEffect(() => {
    // 첫 마운트 시, 
    // 먼저 계좌목록 조회 후, 
    // 첫 번째 계좌의 거래내역을 조회.
    const handleFetchError = (error, message = "데이터 fetching에 실패!") => {
      console.error(message, error);
      setTransactions(mockTransactions); // API 요청 실패 시 목업 데이터 사용
    };
  
    const initFetchAcc = async () => {
      //const jwtToken = localStorage.getItem('jwtToken'); // LocalStorage에서 jwtToken 가져오기  
      try {
        const customerId = localStorage.getItem("customerId"); // LocalStorage에서 customerId 가져오기
        // const accResponse = await fetch(`http://127.0.0.1:8080/api/accounts/find?id=${customerId}`);
        const accResponse = await fetch(`http://127.0.0.1:8080/api/accounts/find?id=${customerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `${jwtToken}`, // JWT 토큰을 Authorization 헤더에 포함
            'Content-Type': 'application/json'
          }
        });
        
        if (!accResponse.ok) {
          handleFetchError(null, "최초로 계좌 목록을 불러오는 데 실패했습니다.");
          return;
        }
  
        const accData = await accResponse.json();
        if (accData.length === 0) return;
  
        const firstAccount = accData[0].accountId; // 첫 번째 계좌를 기본 선택
        const txResponse = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/api/tx/all/${customerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `${jwtToken}`, // JWT 토큰을 Authorization 헤더에 포함
            'Content-Type': 'application/json'
          }
        });
        
        if (!txResponse.ok) {
          handleFetchError(null, "Failed to fetch transactions");
          return;
        }
  
        const txData = await txResponse.json();
        console.log(txData.content);
        setTransactions(txData.content);
        setChartData(transformResponseToChartData(txData.content));
  
      } catch (error) {
        handleFetchError(error);
      }
    };
  
    initFetchAcc();
  }, []);
  
  useEffect(() => {
    if (selectedAccountId) {
      const fetchTransactions = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/api/tx/all/${selectedAccountId}`, {
            method: 'GET',
            headers: {
              'Authorization': `${jwtToken}`, // JWT 토큰을 Authorization 헤더에 포함
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setTransactions(data.content);
            setChartData(transformResponseToChartData(data.content));
          } else {
            console.error("Failed to fetch transactions");
            setTransactions(mockTransactions); // API 요청 실패 시 목업 데이터 사용
          }
        } catch (error) {
          console.error("Error fetching transactions", error);
          setTransactions(mockTransactions); // API 요청 실패 시 목업 데이터 사용
        }
      };

      fetchTransactions();
    }
  }, [selectedAccountId]);

  
  const rows = transactions.map((tx) => {
    const result = {
      //senderName: tx.senderName,
      targetName: tx.targetName,
      amount: tx.amount,
      balanceAfterTx: tx.balanceAfterTx,
      description: tx.description,
      createdAt: formatDate(tx.createdAt).toLocaleString(),
    };
    return result;
  });

  const columns = [
    //{ name: "senderName", align: "left" },
    { name: "targetName", align: "left" },
    { name: "amount", align: "right" },
    { name: "balanceAfterTx", align: "right" },
    { name: "description", align: "left" },
    { name: "createdAt", align: "left" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <div style={{ display: "flex", paddingLeft: "1.5rem" , paddingTop:"0.8rem", paddingBottom:"0.8rem"}}>
              <SoftTypography variant="button" fontWeight="medium" color="text" paddingTop="0.4rem">
                계좌 선택:
              </SoftTypography>
              <AccountsList onSelectAccount={(account) => setSelectedAccountId(account)} />
            </div>
            <SoftBox
              style={{height:'20rem',overflowX:"hidden", overflowY:"scroll" }}
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows}  />
            </SoftBox>
          </Card>
        </SoftBox>

        <GradientLineChart
          title="최근 1년 입출금 차트"
          description={
            <SoftBox display="flex" alignItems="center">
              <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                <Icon className="font-bold">arrow_upward</Icon>
              </SoftBox>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  2023
                </SoftTypography>
                년 동기 대비 3.7% 더 지출했어요.
              </SoftTypography>
            </SoftBox>
          }
          chart={chartData}
        />
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
