import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

function PowerTable({ data }) {
  let colHeaders = [];
  Object.entries(data?.power).length > 0 && Object.entries(data?.power)[0][1].map((powers, index) => {
    colHeaders.push(`Truck ${index + 1}`);
  });
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            {colHeaders.map((header, index) => (
              <TableCell key={index}>{`Truck ${index + 1}`}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && Object.entries(data?.power).map(([date, powers]) => (
            <TableRow key={date}>
              <TableCell>{date}</TableCell>
              {powers.map((power, index) => (
                <TableCell key={index}>{power}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PowerTable;
