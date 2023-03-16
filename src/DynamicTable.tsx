import React, {useContext, useState} from "react"
import TableRows from "./TableRows"
import {TableContext} from "./TableContext";

function AddDeleteTableRows() {
    const [rowsData, setRowsData] = useState([]);
    // @ts-ignore
    const {setTableRows} = useContext(TableContext);

    const addTableRows = () => {
        const rowsInput = {
            EVType: '',
            PMax: '',
            SOCMax: '',
            arrivalTime: '',
            departureTime: '',
            arrivalSOC: '',
            departureSOC: '',
        }
        // @ts-ignore
        setRowsData([...rowsData, rowsInput])
        setTableRows([...rowsData, rowsInput])
    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
        setTableRows(rows);
    }

    const handleChange = (index, evnt) => {
        const {name, value} = evnt.target;
        const rowsInput = [...rowsData];
        // @ts-ignore
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
        setTableRows(rowsInput);
    }
    return (
        <table className="table">
            <thead>
            <tr>
                <th>EV Name</th>
                <th>P Max</th>
                <th>SoCMax</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>ArrivalSoC</th>
                <th>DepartureSoC</th>
                <th>
                    <button className="btn btn-outline-success" onClick={addTableRows}>+</button>
                </th>
            </tr>

            </thead>
            <tbody>

            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange}/>

            </tbody>
        </table>

    )

}

export default AddDeleteTableRows
