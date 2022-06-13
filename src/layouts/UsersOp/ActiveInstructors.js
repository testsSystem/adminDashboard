import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";

import axios from "axios";
import { useQueries } from "react-query";
import MDButton from "components/MDButton";

function ActiveInstructors() {
  const [rows, setRows] = useState([]);

  const [instructorsHolder, setInstructorsHolder] = useState([]);

  const columns = [
    {
      Header: "Instructors",
      accessor: "Instructors",
      width: "50%",
      align: "center",
    },
    {
      Header: "Activation",
      accessor: "Activation",
      width: "50%",
      align: "center",
    },
  ];

  const fetchInstructor = async () => {
    const token = window.localStorage.getItem("token") || null;

    const data = await axios({
      url: `http://localhost:3000/api/v1/users/instructors`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      method: "GET",
    });
    setInstructorsHolder(data);

    return data;
  };

  useEffect(() => {
    fetchInstructor();
  }, []);
  console.log(instructorsHolder?.data?.result);

  const [flag, setFlag] = useState(true);

  const handleClick = () => {
    setFlag(!flag);
  };

  useEffect(() => {
    setRows(
      instructorsHolder?.data?.result
        ? instructorsHolder?.data?.result?.map((st, i) => {
            return {
              Instructors: <div key={i}>{st?.first_name}</div>,
              Activation: (
                <MDButton
                  variant="contained"
                  color={flag ? "success" : "error"}
                  onClick={handleClick}
                >
                  Activate
                </MDButton>
              ),
            };
          })
        : []
    );
  }, [instructorsHolder]);

  return (
    <>
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
            //   mb={1}
            textAlign="center"
          >
            <MDTypography
              variant="h4"
              fontWeight="medium"
              color="white"
              // mt={0}
            >
              Instructors Activation List
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
}

export default ActiveInstructors;
