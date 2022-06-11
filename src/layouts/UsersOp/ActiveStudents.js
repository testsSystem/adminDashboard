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
import ActiveInstructors from "./ActiveInstructors";

function ActiveStudents() {
  const [rows, setRows] = useState([]);

  const [studentHolder, setStudentHolder] = useState([]);
  const [instructorsHolder, setInstructorsHolder] = useState([]);

  const columns = [
    { Header: "Students", accessor: "Students", width: "50%", align: "center" },
    {
      Header: "Activation",
      accessor: "Activation",
      width: "50%",
      align: "center",
    },

    // { Header: "actions", accessor: "actions", align: "center" },
  ];
  // const insColumns = [
  //   {
  //     Header: "Instructor",
  //     accessor: "Instructor",
  //     width: "50%",
  //     align: "center",
  //   },
  //   // { Header: "actions", accessor: "actions", align: "center" },
  // ];

  const fetchStudents = async () => {
    const token = window.localStorage.getItem("token") || null;

    const data = await axios({
      url: `http://localhost:3000/api/v1/users/allStudents`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      method: "GET",
    });
    setStudentHolder(data);

    return data;
  };

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
    fetchStudents();
    fetchInstructor();
  }, []);
  console.log(studentHolder?.data?.result);
  console.log(instructorsHolder?.data?.result);

  const [flag, setFlag] = useState(true);
  const [stutus, setStatus] = useState(true);

  const handleClick = () => {
    setFlag(!flag);
    setStatus(!studentHolder?.data?.result?.status);
  };

  useEffect(() => {
    setRows(
      studentHolder?.data?.result
        ? studentHolder?.data?.result?.map((st, i) => {
            return {
              Students: <div key={i}>{st?.first_name}</div>,
              Activation: (
                <MDButton
                  variant="contained"
                  color={flag ? "success" : "error"}
                  onClick={handleClick}
                >
                  Active
                </MDButton>
              ),
            };
          })
        : []
    );
    console.log(instructorsHolder?.result, "ooo");

    // setInsRows(
    //   instructorsHolder?.data?.result
    //     ? instructorsHolder?.data?.result?.map((inst, i) => {
    //         return {
    //           Instructor: <div key={i}>{inst?.first_name}</div>,
    //         };
    //       })
    //     : []
    // );
  }, [studentHolder, instructorsHolder]);

  return (
    <>
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
              //   mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                // mt={0}
              >
                Students Activation List
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
          <ActiveInstructors />
        </MDBox>

        <Footer />
      </DashboardLayout>
    </>
  );
}

export default ActiveStudents;
