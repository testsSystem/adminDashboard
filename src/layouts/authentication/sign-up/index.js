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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const navigate = useNavigate();

  const sigInstructorUp = () => {
    const firstName =
      firstnameRef.current.querySelector("input[type=text]").value;
    const lastName =
      lastnameRef.current.querySelector("input[type=text]").value;
    const email = emailRef.current.querySelector("input[type=email]").value;
    const password = passwordRef.current.querySelector(
      "input[type=password]"
    ).value;

    fetch(`https://logietestapi.herokuapp.com/api/v1/admin/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((signup) => {
          if (signup) {
            console.log(signup);
            navigate("/dashboard");
          }
        });
      })
      .catch((e) => e);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Creat new admin
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                variant="standard"
                fullWidth
                ref={firstnameRef}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last Name"
                variant="standard"
                fullWidth
                ref={lastnameRef}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                ref={emailRef}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                ref={passwordRef}
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={sigInstructorUp}
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
