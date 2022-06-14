/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card } from "@mui/material";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [info, setInfo] = useState([]);

  const [countTests, setCountTests] = useState();

  const fetchProfile = async () => {
    const token = window.localStorage.getItem("token") || null;

    const data = await axios({
      url: `http://localhost:3000/api/v1/users/profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      method: "GET",
    });
    setInfo(data?.data?.result[0]);
    console.log(info, "tesstttttt");

    return data;
  };

  const fetchTestLength = async () => {
    const token = window.localStorage.getItem("token") || null;

    const data = await axios({
      url: `http://localhost:3000/api/v1/admin/getAllTests`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      method: "GET",
    });
    setCountTests(data?.data?.result.length);
    console.log(data?.data?.result?.length, "lengthhhhhhh");

    return data;
  };

  useEffect(() => {
    fetchProfile();
    fetchTestLength();
  }, []);

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={1}
            textAlign="center"
          >
            <MDTypography variant="h5" fontWeight="medium" color="white">
              Test Data
            </MDTypography>
          </MDBox>
          <MDBox p={2} mt={0}>
            <Grid container spacing={5}>
              <Grid item xs={4} md={4}>
                <div>Full Name</div>
                <br />
                <div>
                  {info.first_name} {info.last_name}
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div>Email</div>
                <br />
                <div>{info.email}</div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div>Created Date</div>
                <br />
                <div>{info.createdAt}</div>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={1}
            textAlign="center"
          >
            <MDTypography variant="h5" fontWeight="medium" color="white">
              Tests Info
            </MDTypography>
          </MDBox>
          <MDBox p={2} mt={0} textAlign="center">
            <Grid container spacing={5}>
              <Grid item xs={12} md={12}>
                <div>All Tests In System</div>
                <br />
                <div>
                  <h4> {countTests}</h4>
                </div>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
