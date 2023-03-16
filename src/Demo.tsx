import * as React from 'react';
import {useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddDeleteTableRows from "./DynamicTable";
import {Button} from "@mui/material";
import {TableContext} from "./TableContext";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: 20,
    color: theme.palette.text.secondary,
}));
const url = `https://volpes-energy-backend-fiiwhtua3a-ew.a.run.app`;

export default function Demo() {
    const [tableRows, setTableRows] = useState([]);
    const [APIData, setAPIData] = useState(null);

    const getEVSchedule = async () => {
        try {
            const response = await fetch(`${url}/ev_scheduler`);
            const data = await response.json()
            setAPIData(data);
        } catch (e) {
            console.error(e.toString);
        }
    }

    async function handleSubmit(event) {
        // TODO Call the actual API
        event.preventDefault();
        console.log(tableRows)
        await getEVSchedule()
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <h2>EV Data Form</h2>
                        <TableContext.Provider value={{tableRows, setTableRows}}>
                            <AddDeleteTableRows/>
                            <form onSubmit={handleSubmit}>
                                <Button variant="outlined" color="secondary" type="submit">Submit</Button>
                            </form>
                        </TableContext.Provider>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>{APIData ? JSON.stringify(APIData) : `No Responses yet`}</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
