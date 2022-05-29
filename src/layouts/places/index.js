import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

// import { Category } from "@mui/icons-material";

const columns = [
  { Header: "title", accessor: "title", width: "45%", align: "left" },
  { Header: "category", accessor: "category", align: "left" },
  { Header: "location", accessor: "location", align: "center" },
  { Header: "actions", accessor: "actions", align: "center" },
];
// const row = [];

function Places() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users").then((response) => {
      response.json().then((places) => {
        const allPlaces = places.data.map((place) => {
          return {
            title: <>{place.firstName}</>,
            Category: <>{place.lastName}</>,
            // location: (
            //   <>
            //     <a
            //       target="_blank"
            //       rel="noreferrer"
            //       href={`http://www.google.com/maps/@${place.latitude},${place.longitude},15z`}
            //     >
            //       Click Here
            //     </a>
            //   </>
            // ),
            actions: <>test</>,
          };
        });
        setRows(allPlaces);
      });
    });
  });
  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
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
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Places;
