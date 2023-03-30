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
import React, {useEffect, useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {CircularProgress, FormControlLabel, Switch} from "@material-ui/core";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EditableTable from "../../examples/Tables/EditableTable";
import PowerTable from "../../examples/Tables/PowerTable";
import {useMaterialUIController} from "../../context";
import StackedPlotChart from "../../examples/Charts/StackedCharts";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import {green} from "@mui/material/colors";


function Tables() {
    const [loading, setLoading] = useState(true);
    const [controller, dispatch] = useMaterialUIController();
    const {EVTableData} = controller;
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        Object.entries(EVTableData).length > 0 && setLoading(false);
    }, [EVTableData])

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar/>
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
                                <EditableTable/>
                            </MDBox>
                        </Card>
                    </Grid>
                    {loading ? (
                        <Grid item xs={12}>
                            <MDBox pt={3} sx={{textAlign: "center"}}>
                                <CircularProgress/>
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
                                <MDBox pt={3} pr={2} sx={{textAlign: "right"}}>
                                    <FormControlLabel
                                        control={<Switch checked={showTable} onChange={toggleTable}/>}
                                        label="Show Table"
                                    />
                                </MDBox>
                                <MDBox pt={3}>
                                    {showTable && EVTableData ? <PowerTable data={EVTableData}/> : null}
                                </MDBox>
                                <MDBox>
                                    {EVTableData ?
                                        <>
                                            <DefaultInfoCard
                                                iconSX={{color: green[500]}}
                                                color="secondary"
                                                icon="energy_savings_leaf"
                                                title="Save"
                                                description="Power Consumption Savings"
                                                value="18.7%"
                                            />
                                            <StackedPlotChart data={EVTableData}/>
                                        </>
                                        : null}
                                </MDBox>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Tables;
