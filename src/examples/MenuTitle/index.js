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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function MenuTitle({ icon, title, route, light }) {
  const routes = route.slice(0, -1);

  return (
    <SoftBox mr={{ xs: 0, xl: 8 }}>
      <SoftTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title.replace("-", " ")}
      </SoftTypography>
    </SoftBox>
  );
}

// Setting default values for the props of Breadcrumbs
MenuTitle.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
MenuTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default MenuTitle;
