import React, {useState} from "react";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

// Material Dashboard 2 React context
import {setEVTableData, useMaterialUIController} from "context";

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
    },
    left: {
        textAlign: "left"
    },
    right: {
        textAlign: "right"
    }
}));

let EVList = [
    {
        id: "baa2c507-ef90-41d6-8745-c7d587b705e2",
        ev_name: "Truck 1",
        P_max: "500",
        SoC_max: "850",
        Arrival_time: "2022.12.12 20:15:00",
        Departure_time: "2022.12.13 07:00:00",
        Arrival_SoC: "99",
        Departure_SoC: "850"
    },
    {
        id: "b71505a7-1ab4-4766-b638-a9c1ffd02d26",
        ev_name: "Truck 2",
        P_max: "400",
        SoC_max: "850",
        Arrival_time: "2022.12.12 22:00:00",
        Departure_time: "2022.12.13 01:00:00",
        Arrival_SoC: "50",
        Departure_SoC: "850"
    },
    {
        id: "5a4e5a39-9dc4-482b-993d-7a09ee640e70",
        ev_name: "Truck 3",
        P_max: "300",
        SoC_max: "850",
        Arrival_time: "2022.12.12 21:00:00",
        Departure_time: "2022.12.13 06:00:00",
        Arrival_SoC: "75",
        Departure_SoC: "850"
    },
    {
        id: "c51be328-34d8-499f-8c98-990a2e966849",
        ev_name: "Truck 4",
        P_max: "300",
        SoC_max: "850",
        Arrival_time: "2022.12.12 21:00:00",
        Departure_time: "2022.12.13 07:00:00",
        Arrival_SoC: "75",
        Departure_SoC: "850"
    },
    {
        id: "df284576-46f7-464b-b7a8-c1ed27e4c0fd",
        ev_name: "Truck 5",
        P_max: "250",
        SoC_max: "1200",
        Arrival_time: "2022.12.12 21:00:00",
        Departure_time: "2022.12.13 09:00:00",
        Arrival_SoC: "75",
        Departure_SoC: "1200"
    }
];

const tableHeader = [
    {label: "EV Name", data: "ev_name"},
    {label: "P Max", data: "P_max"},
    {label: "SoC Max", data: "SoC_max"},
    {label: "Arrival", data: "Arrival_time"},
    {label: "Departure", data: "Departure_time"},
    {label: "ArrivalSoC", data: "Arrival_SoC"},
    {label: "DepartureSoC", data: "Departure_SoC"},
    {label: "Action", data: "action"}
];

// const EV_SCHEDULE_URL = "https://volpes-energy-backend-fiiwhtua3a-ew.a.run.app/ev_scheduler"

const EditableTable = (props) => {
    const classes = useStyles();
    const [editingId, setEditingId] = useState(null);
    const [rows, setRows] = useState(EVList);
    const [controller, dispatch] = useMaterialUIController();
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('json');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
    };

    function normalizePayload(payload) {
        let resp = payload.data
        if (payload.data.indexOf("\n") !== -1) {
            resp = resp.replaceAll("\n", "")
        }
        resp = JSON.parse(resp)
        return resp
    }

    const handleSubmitData = async () => {
        const payload = rows.reduce((obj, cur, i) => {
            return {...obj, [i]: cur};
        }, {})

        try {
            const resp = await fetch(`${process.env.REACT_APP_VOLPES_ENERGY_API}/ev_scheduler`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (resp.status === 200) {
                const data = await resp.json()
                setEVTableData(dispatch, data)
            }
        } catch (e) {
            console.error(e)
        }
    }
    const handleUploadSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        let payload = {data: await file.text()}

        payload = normalizePayload(payload)

        const body = fileType === 'json' ? JSON.stringify(payload) : payload
        let postReq = {
            method: 'POST',
            body
        }

        postReq = fileType === 'json' ? {...postReq, headers: {'Content-Type': 'application/json'}} : postReq

        try {
            const resp = await fetch(`${process.env.REACT_APP_VOLPES_ENERGY_API}/ev_scheduler`, postReq)

            if (resp.status === 200) {
                const data = await resp.json()
                setFile(null)
                document.querySelector("input[type=file]").value = '';
                setEVTableData(dispatch, data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const addRandomRow = () => {
        const newRandomEV = {
            id: Math.floor(Math.random() * 100000),
            ev_name: EVList[Math.floor(Math.random() * EVList.length)].ev_name,
            P_max: EVList[Math.floor(Math.random() * EVList.length)].P_max,
            SoC_max: EVList[Math.floor(Math.random() * EVList.length)].SoC_max,
            Arrival_time: EVList[Math.floor(Math.random() * EVList.length)].Arrival_time,
            Departure_time: EVList[Math.floor(Math.random() * EVList.length)].Departure_time,
            Arrival_SoC: EVList[Math.floor(Math.random() * EVList.length)].Arrival_SoC,
            Departure_SoC: EVList[Math.floor(Math.random() * EVList.length)].Departure_SoC
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
            ev_name: "",
            P_max: "",
            SoC_max: "",
            Arrival_time: "",
            Departure_time: "",
            Arrival_SoC: "",
            Departure_SoC: ""
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
        const {name, value} = event.target;
        setRows(
            rows.map((row) => {
                if (row.id === id) {
                    return {...row, [name]: value};
                }
                return row;
            })
        );
    };

    return (
        <TableContainer sx={{boxShadow: "none"}} component={Paper} className={classes.tableContainer}>
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
                            {/* ev_name */}
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        name="ev_name"
                                        value={row.ev_name}
                                        onChange={(event) => handleInputChange(event, row.id)}
                                    />
                                ) : (
                                    row.ev_name
                                )}
                            </TableCell>
                            {/* P_max */}
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        name="P_max"
                                        value={row.P_max}
                                        onChange={(event) => handleInputChange(event, row.id)}
                                    />
                                ) : (
                                    row.P_max
                                )}
                            </TableCell>
                            {/* SoC_max */}
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        name="SoC_max"
                                        value={row.SoC_max}
                                        onChange={(event) => handleInputChange(event, row.id)}
                                    />
                                ) : (
                                    row.SoC_max
                                )}
                            </TableCell>
                            {/* Arrival_time */}
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        name="Arrival_time"
                                        value={row.Arrival_time}
                                        onChange={(event) => handleInputChange(event, row.id)}
                                    />
                                ) : (
                                    row.Arrival_time
                                )}
                            </TableCell>
                            {/* Departure_time */}
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        name="Departure_time"
                                        value={row.Departure_time}
                                        onChange={(event) => handleInputChange(event, row.id)}
                                    />
                                ) : (
                                    row.Departure_time
                                )}
                            </TableCell>
                            {/* Arrival_SoC */}
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        name="Arrival_SoC"
                                        value={row.Arrival_SoC}
                                        onChange={(event) => handleInputChange(event, row.id)}
                                    />
                                ) : (
                                    row.Arrival_SoC
                                )}
                            </TableCell>
                            {/* Departure_SoC */}
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        name="Departure_SoC"
                                        value={row.Departure_SoC}
                                        onChange={(event) => handleInputChange(event, row.id)}
                                    />
                                ) : (
                                    row.Departure_SoC
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
                                    <FormControl>
                                        <InputLabel>File Type</InputLabel>
                                        <Select value={fileType} onChange={handleFileTypeChange}>
                                            <MenuItem value="json">JSON</MenuItem>
                                            <MenuItem value="csv">CSV</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} className={classes.center}>
                                    <FormControl>
                                        <InputLabel>File Upload</InputLabel>
                                        <input type="file" onChange={handleFileChange}/>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} className={classes.center}>
                                    <Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            disabled={!file}
                                            onClick={handleUploadSubmit}
                                            className={classes.button}
                                        >
                                            Submit Upload
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
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
                                            startIcon={<AddIcon/>}
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
                                            startIcon={<AddIcon/>}
                                        >
                                            Add Empty Row
                                        </Button>
                                    </Typography>
                                </Grid>
                                <Grid item lg={4} className={classes.center}>
                                    <Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleSubmitData}
                                            className={classes.button}
                                        >
                                            Submit Table Rows
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