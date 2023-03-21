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
import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CircularProgress, FormControlLabel, Switch } from "@material-ui/core";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EditableTable from "../../examples/Tables/EditableTable";
import PowerTable from "../../examples/Tables/PowerTable";
import { useMaterialUIController } from "../../context";
import StackedPlotChart from "../../examples/Charts/StackedCharts";


function Tables() {
  const [EVSchedule, setEVSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [controller, dispatch] = useMaterialUIController();
  const { EVTableData } = controller;
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://volpes-energy-backend-fiiwhtua3a-ew.a.run.app/ev_scheduler");
      const jsonData = await response.json();
      setEVSchedule(jsonData?.power);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(()=>{
    EVTableData && setLoading(false);
  }, [EVTableData])

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  EVs
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <EditableTable />
              </MDBox>
            </Card>
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <MDBox pt={3} sx={{ textAlign: "center" }}>
                <CircularProgress />
              </MDBox>
            </Grid>
          ) : (
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
                    EV Schedule
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} pr={2} sx={{ textAlign: "right" }}>
                  <FormControlLabel
                    control={<Switch checked={showTable} onChange={toggleTable} />}
                    label="Show Table"
                  />
                </MDBox>
                <MDBox pt={3}>
                  {showTable && EVSchedule ? <PowerTable data={EVSchedule} /> : null}
                </MDBox>
                <MDBox pt={3}>
                  {EVSchedule ? <StackedPlotChart data={EVSchedule} /> : null}
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;