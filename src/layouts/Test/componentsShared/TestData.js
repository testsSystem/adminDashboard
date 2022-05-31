import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MDInput from "components/MDInput";
import TextField from "@mui/material/TextField";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import Questions from "./Questions";

import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

// import { Category } from "@mui/icons-material";

function TestData() {
  //   useEffect(() => {
  //     fetch("http://localhost:3000/api/v1").then((response) => {
  //       response.json().then((places) => {
  //         const allPlaces = places.data.map((place) => {
  //           return {
  //             title: <>{place.firstName}</>,
  //             Category: <>{place.lastName}</>,
  //             // location: (
  //             //   <>
  //             //     <a
  //             //       target="_blank"
  //             //       rel="noreferrer"
  //             //       href={`http://www.google.com/maps/@${place.latitude},${place.longitude},15z`}
  //             //     >
  //             //       Click Here
  //             //     </a>
  //             //   </>
  //             // ),
  //             actions: <>test</>,
  //           };
  //         });
  //         setRows(allPlaces);
  //       });
  //     });
  //   });

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
                Test Data
              </MDTypography>
            </MDBox>
            <MDBox p={2} mt={0}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="standard-textarea"
                    label="Title"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="standard-textarea"
                    label="Available at"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="standard-textarea"
                    label="Available at"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* <MDBox> */}
        <Questions />
        {/* </MDBox> */}

        <Footer />
      </DashboardLayout>
    </>
  );
}

export default TestData;
