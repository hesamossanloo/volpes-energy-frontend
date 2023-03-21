import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TableFooter,
  Button, TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

// Material Dashboard 2 React context
import {
  setEVTableData, useMaterialUIController
} from "context";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  tableContainer: {
    marginTop: "10px"
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "#7b809a"
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  hover: {
    cursor: "pointer"
  },
  center: {
    textAlign: "center"
  }
}));

let EVList = [
  {
    id: "baa2c507-ef90-41d6-8745-c7d587b705e2",
    EVName: "Truck 1",
    PMax: "500",
    SOCMax: "850",
    arrival: "2022.12.12 20:15:00",
    departure: "2022.12.13 07:00:00",
    arrivalSOC: "99",
    departureSOC: "850"
  },
  {
    id: "b71505a7-1ab4-4766-b638-a9c1ffd02d26",
    EVName: "Truck 2",
    PMax: "400",
    SOCMax: "850",
    arrival: "2022.12.12 22:00:00",
    departure: "2022.12.13 01:00:00",
    arrivalSOC: "50",
    departureSOC: "850"
  },
  {
    id: "5a4e5a39-9dc4-482b-993d-7a09ee640e70",
    EVName: "Truck 3",
    PMax: "300",
    SOCMax: "850",
    arrival: "2022.12.12 21:00:00",
    departure: "2022.12.13 06:00:00",
    arrivalSOC: "75",
    departureSOC: "850"
  },
  {
    id: "c51be328-34d8-499f-8c98-990a2e966849",
    EVName: "Truck 4",
    PMax: "300",
    SOCMax: "850",
    arrival: "2022.12.12 21:00:00",
    departure: "2022.12.13 07:00:00",
    arrivalSOC: "75",
    departureSOC: "850"
  },
  {
    id: "df284576-46f7-464b-b7a8-c1ed27e4c0fd",
    EVName: "Truck 5",
    PMax: "250",
    SOCMax: "1200",
    arrival: "2022.12.12 21:00:00",
    departure: "2022.12.13 09:00:00",
    arrivalSOC: "75",
    departureSOC: "1200"
  }
];

const tableHeader = [
  { label: "EV Name", data: "ev_name" },
  { label: "P Max", data: "p_max" },
  { label: "SoC Max", data: "soc_max" },
  { label: "Arrival", data: "arrival" },
  { label: "Departure", data: "departure" },
  { label: "ArrivalSoC", data: "arrival_soc" },
  { label: "DepartureSoC", data: "departure_soc" },
  { label: "Action", data: "action" }
];

const EditableTable = (props) => {
  const classes = useStyles();
  const [editingId, setEditingId] = useState(null);
  const [rows, setRows] = useState(EVList);
  const [controller, dispatch] = useMaterialUIController();

  const addRandomRow = () => {
    const newRandomEV = {
      id: Math.floor(Math.random() * 100000),
      EVName: EVList[Math.floor(Math.random() * EVList.length)].EVName,
      PMax: EVList[Math.floor(Math.random() * EVList.length)].PMax,
      SOCMax: EVList[Math.floor(Math.random() * EVList.length)].SOCMax,
      arrival: EVList[Math.floor(Math.random() * EVList.length)].arrival,
      departure: EVList[Math.floor(Math.random() * EVList.length)].departure,
      arrivalSOC: EVList[Math.floor(Math.random() * EVList.length)].arrivalSOC,
      departureSOC: EVList[Math.floor(Math.random() * EVList.length)].departureSOC
    };

    const updateUsers = [
      // copy the current rows state
      ...rows,
      // now you can add a new object to add to the array
      newRandomEV
    ];
    // update the state to the updatedUsers
    setRows(updateUsers);
    setEditingId(newRandomEV.id);
  };

  const addEmptyRow = () => {
    const newEV = {
      id: Math.floor(Math.random() * 100000),
      EVName: "",
      PMax: "",
      SOCMax: "",
      arrival: "",
      departure: "",
      arrivalSOC: "",
      departureSOC: ""
    };

    const updateEVs = [
      // copy the current rows state
      ...rows,
      // now you can add a new object to add to the array
      newEV
    ];
    // update the state to the updatedUsers
    setRows(updateEVs);
    setEditingId(newEV.id);
  };

  const handleEditRow = (id) => {
    setEditingId(id);
  };

  const handleDeleteRow = (index) => {
    const newEV = rows.filter((EV, i) => i !== index);
    setRows(newEV);
  };

  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value };
        }
        return row;
      })
    );
  };

  const handleSubmitData = () => {
    setEVTableData(dispatch, { ...rows })
  }
  return (
    <TableContainer sx={{ boxShadow: "none" }} component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((cell) => (
              <TableCell key={cell.data} className={classes.tableHeaderCell}>
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              {/* EVName */}
              <TableCell>
                {editingId === row.id ? (
                  <TextField
                    name="EVName"
                    value={row.EVName}
                    onChange={(event) => handleInputChange(event, row.id)}
                  />
                ) : (
                  row.EVName
                )}
              </TableCell>
              {/* PMax */}
              <TableCell>
                {editingId === row.id ? (
                  <TextField
                    name="PMax"
                    value={row.PMax}
                    onChange={(event) => handleInputChange(event, row.id)}
                  />
                ) : (
                  row.PMax
                )}
              </TableCell>
              {/* SOCMax */}
              <TableCell>
                {editingId === row.id ? (
                  <TextField
                    name="SOCMax"
                    value={row.SOCMax}
                    onChange={(event) => handleInputChange(event, row.id)}
                  />
                ) : (
                  row.SOCMax
                )}
              </TableCell>
              {/* arrival */}
              <TableCell>
                {editingId === row.id ? (
                  <TextField
                    name="arrival"
                    value={row.arrival}
                    onChange={(event) => handleInputChange(event, row.id)}
                  />
                ) : (
                  row.arrival
                )}
              </TableCell>
              {/* departure */}
              <TableCell>
                {editingId === row.id ? (
                  <TextField
                    name="departure"
                    value={row.departure}
                    onChange={(event) => handleInputChange(event, row.id)}
                  />
                ) : (
                  row.departure
                )}
              </TableCell>
              {/* arrivalSOC */}
              <TableCell>
                {editingId === row.id ? (
                  <TextField
                    name="arrivalSOC"
                    value={row.arrivalSOC}
                    onChange={(event) => handleInputChange(event, row.id)}
                  />
                ) : (
                  row.arrivalSOC
                )}
              </TableCell>
              {/* departureSOC */}
              <TableCell>
                {editingId === row.id ? (
                  <TextField
                    name="departureSOC"
                    value={row.departureSOC}
                    onChange={(event) => handleInputChange(event, row.id)}
                  />
                ) : (
                  row.departureSOC
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <Grid container>
                    <Grid item lg={12}>
                      <Typography>
                        <SaveIcon
                          color="secondary"
                          onClick={() => setEditingId(null)}
                          className={classes.hover}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item lg={9}>
                      <Typography>
                        <EditIcon
                          color="secondary"
                          onClick={() => handleEditRow(row.id)}
                          className={classes.hover}
                        />
                      </Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography>
                        <DeleteIcon
                          color="secondary"
                          onClick={handleDeleteRow.bind(this, i)}
                          className={classes.hover}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12}>
              <Grid container>
                <Grid item lg={4} className={classes.center}>
                  <Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addRandomRow}
                      className={classes.button}
                      startIcon={<AddIcon />}
                    >
                      Add Saved EV
                    </Button>
                  </Typography>
                </Grid>
                <Grid item lg={4} className={classes.center}>
                  <Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={addEmptyRow}
                      className={classes.button}
                      startIcon={<AddIcon />}
                    >
                      Add Empty Row
                    </Button>
                  </Typography>
                </Grid><Grid item lg={4} className={classes.center}>
                  <Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmitData}
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default EditableTable;