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
import { useParams } from "react-router-dom";

function ActiveStudents() {
  // const fetchInstructor = async() => {
  //  await axios.get("//localhost:3000/api/v1/admin/allStudents").then((resp) => {
  //     console.log(resp.data);
  // }
  const [studentHolder, setStudentHolder] = useState([]);

  const [instructorsHolder, setInstructorsHolder] = useState([]);

  const [msg, setMsg] = useState(false);

  const [rows, setRows] = useState([]);

  const columns = [
    { Header: "Students", accessor: "Students", width: "50%", align: "center" },
    { Header: "status", accessor: "status", align: "center" },

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
      url: `
      https://logietestapi.herokuapp.com/api/v1/admin/instructors`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      method: "GET",
    });
    setStudentHolder(data);

    return data;
  };

  const fetchStudents = async () => {
    const token = window.localStorage.getItem("token") || null;

    const data = await axios({
      url: `
      https://logietestapi.herokuapp.com/api/v1/admin/allStudents`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      method: "GET",
    });
    setInstructorsHolder(data);

    return data;
  };

  const results = useQueries([
    { queryKey: ["post", 1], queryFn: fetchStudents },
    { queryKey: ["post", 2], queryFn: fetchInstructor },
  ]);

  // console.log(results[0].data.data.result, "tow fetches............");
  // console.log(studentHolder.data.result, "tow fetches............");

  const studentsMap = studentHolder?.data?.result?.map((st, i) => {
    // console.log(st.first_name, "firstName.........");
    return {
      Students: <div>{st?.first_name}</div>,
    };
  });

  console.log(studentsMap, "studentMap, ,,,,,,,,");
  if (msg) {
    setRows(studentsMap);
  }

  let [counter, setCounter] = useState(0);

  // const fetchStudents = async () => {
  //   const token = window.localStorage.getItem("token") || null;

  //   const data = await axios({
  //     url: `
  //     http://localhost:3000/api/v1/admin/allStudents`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token ? `Bearer ${token}` : undefined,
  //     },
  //     method: "GET",
  //   });
  //   setStudentHolder(data);

  //   return data;
  // };

  const dataStatus = { status: true };

  const updateStatus = async (id, status) => {
    const token = window.localStorage.getItem("token") || null;

    const data = await axios({
      url:
        `
        https://logietestapi.herokuapp.com/api/v1/admin/updateStatus/` + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      data: {
        status: !status,
      },
      method: "PUT",
    });
    // setStudentHolder(data);
    return data;
  };

  // useEffect(() => {
  //   fetchStudents();
  //   // updateStatus();
  // }, [counter]);
  // console.log(studentHolder?.data?.result);
  // console.log(instructorsHolder?.data?.result);

  const [isActive, setIsActive] = useState();
  const [status, setStatus] = useState();

  // useEffect(() => {
  //   setRows(
  //     studentHolder?.data?.result
  //       ? studentHolder?.data?.result?.map((st, i) => {
  //           setStatus(st.status);
  //           // setIsActive(status);
  //           console.log(st.status, "jjjjjjjjjjjjjjjj");
  //           return {
  //             Students: <div>{st?.first_name}</div>,
  //             status: (
  //               <div>
  //                 {st.status ? <h4>activated</h4> : <h4>not activated</h4>}
  //               </div>
  //             ),
  //             Activation: (
  //               <MDButton
  //                 key={st.id}
  //                 variant="contained"
  //                 color={st.status ? "error" : "success"}
  //                 onClick={() => {
  //                   // setIsActive(!st.status);
  //                   // setStatus(!status);
  //                   updateStatus(st.id, st.status).then(() => {
  //                     setCounter(++counter);
  //                   });
  //                   // setStatus(isActive);
  //                 }}
  //               >
  //                 {console.log(status, "isssss")}
  //                 {!st.status ? <h4>Activate</h4> : <h4>Deactivate</h4>}
  //               </MDButton>
  //             ),
  //           };
  //         })
  //       : []
  //   );
  // }, [studentHolder, isActive, status, counter]);

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
          {/* <ActiveInstructors /> */}
        </MDBox>

        <Footer />
      </DashboardLayout>
    </>
  );
}

export default ActiveStudents;
