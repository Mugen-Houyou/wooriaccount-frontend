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
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={18} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "우리은행 자유입출금 123-123123-12" }}
                count="￦53,000"
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={18} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "우리은행 자유입출금 546-564754-246" }}
                count="￦12,356"
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={18} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "우리은행 정기예금 459-349829-92358" }}
                count="￦246,981,503"
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={18} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "우리은행 적금 9834-253982-91325" }}
                count="￦26,382,001"
                icon={{ color: "info", component: "paid" }}
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
