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
import authorsTableData from "layouts/tables/data/authorsTableData";
import AccountsList from "../../components/AccountsList";

// 목업
const mockTransactions = [
  {
    senderName: "홍길동",
    receiverName: "김철수",
    amount: "100000",
    balanceAfterTx: "500000",
    description: "송금",
    createdAt: "2022-07-01T12:00:00"
  },
  {
    senderName: "이영희",
    receiverName: "박지민",
    amount: "150000",
    balanceAfterTx: "350000",
    description: "생일 축하금",
    createdAt: "2022-07-02T15:30:00"
  },
  {
    senderName: "김민준",
    receiverName: "조은지",
    amount: "200000",
    balanceAfterTx: "800000",
    description: "대출 상환",
    createdAt: "2022-07-03T09:20:00"
  },
  {
    senderName: "최준호",
    receiverName: "유서연",
    amount: "50000",
    balanceAfterTx: "450000",
    description: "식사비",
    createdAt: "2022-07-04T13:45:00"
  },
  {
    senderName: "박지민",
    receiverName: "이영희",
    amount: "120000",
    balanceAfterTx: "620000",
    description: "대여금 반환",
    createdAt: "2022-07-05T18:00:00"
  }
];


// 일시 포매터
function formatDate(dateArray) {
  const [year, month, day, hour, minute, second] = dateArray;
  return new Date(year, month -1, day, hour, minute, second); 
  // return date.toISOString().split('.')[0]; 
}

function Tables() {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [transactions, setTransactions] = useState(mockTransactions);

  useEffect( () => {
    // 첫 마운트 시, 
    // 먼저 계좌목록 조회 후, 
    // 첫 번째 계좌의 거래내역을 조회.
    const initFetchAcc = async () => {
      try {
        const customerId = localStorage.getItem("customerId"); // LocalStorage에서 customerId 가져오기
        const response = await fetch(`http://127.0.0.1:8080/api/accounts/find?id=${customerId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const firstAccount = data[0].accountId; // 첫 번째 계좌를 기본 선택
            try {
              const response = await fetch(`http://127.0.0.1:8080/api/tx/all/${firstAccount}`);
              if (response.ok) {
                const data = await response.json();
                setTransactions(data.content);
              } else {
                console.error("Failed to fetch transactions");
                setTransactions(mockTransactions); // API 요청 실패 시 목업 데이터 사용
              }
            } catch (error) {
              console.error("Error fetching transactions", error);
              setTransactions(mockTransactions); // API 요청 실패 시 목업 데이터 사용
            }
          }
        } else {
          console.error("최초로 계좌 목록을 불러오는 데 실패했습니다.");
          setTransactions(mockTransactions); // API 요청 실패 시 목업 데이터 사용
        }
      } catch (error) {
        console.error("최초로 계좌 목록 요청 중 오류 발생", error);
        setTransactions(mockTransactions); // API 요청 실패 시 목업 데이터 사용
      }
    };
    initFetchAcc();
  }, [] );

  useEffect(() => {
    if (selectedAccountId) {
      const fetchTransactions = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8080/api/tx/all/${selectedAccountId}`);
          if (response.ok) {
            const data = await response.json();
            setTransactions(data.content);
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
    return {
      senderName: tx.senderName,
      receiverName: tx.receiverName,
      amount: tx.amount,
      balanceAfterTx: tx.balanceAfterTx,
      description: tx.description,
      createdAt: formatDate(tx.createdAt).toLocaleString(),
    };
  });

  const columns = [
    { name: "senderName", align: "left" },
    { name: "receiverName", align: "left" },
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
          
        <Card >
          <div style={{display:"flex", paddingLeft:"1rem"}}>
            <SoftTypography variant="button" fontWeight="medium" color="text" paddingTop="0.4rem">
              계좌 선택: 
            </SoftTypography>
            <AccountsList onSelectAccount={(account) => setSelectedAccountId(account)} />
          </div>
            <SoftBox
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
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
