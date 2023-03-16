import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(APIData) {
    let rows = []
    let powerObj = []
    let colHeaders = []
    // @ts-ignore
    APIData["APIData"] != null | undefined && Object.keys(APIData["APIData"]).map(key => {
        // Set obj key/value
        // @ts-ignore
        powerObj = APIData["APIData"]["power"]
        colHeaders = Object.keys(Object.keys(powerObj)[0])
    })

    let tmpObj = {}
    Object.keys(powerObj).map((k, i) => {
        tmpObj[i] = k
        tmpObj[i+1] = {...Object.assign({}, Object.values(powerObj[k]))}
    })

    rows.push(tmpObj)

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {colHeaders.length > 0 && <TableCell>DateTime</TableCell>}
                        {colHeaders.length > 0 && colHeaders?.map(k => <TableCell>{k}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row, i) => (
                        <TableRow
                            key={row[0]}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row[i]}
                            </TableCell>
                            <TableCell align="right">{row[i]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
