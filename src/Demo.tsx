import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Form from "./Form";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddDeleteTableRows from "./DynamicTable";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: 20,
    color: theme.palette.text.secondary,
}));

export default function Demo() {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <h2>EV Data Form</h2>
                        <AddDeleteTableRows />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>Data table and Chart</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
