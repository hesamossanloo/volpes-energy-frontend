import React, {useState} from "react"
import TableRows from "./TableRows"

function AddDeleteTableRows() {
    const [rowsData, setRowsData] = useState([]);

    const addTableRows = () => {

        const rowsInput = {
            ev_type: '',
            p_max: '',
            soc_max: '',
            arrival_time: '',
            departure_time: '',
            arrival_soc: '',
            departure_soc: '',
        }
        // @ts-ignore
        setRowsData([...rowsData, rowsInput])

    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt) => {
        const {name, value} = evnt.target;
        const rowsInput = [...rowsData];
        // @ts-ignore
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }
    return (
        /*
        "P_max": "500",
        "SoC_max": "850",
        "Arrival_time": "2022.12.12 20:15:00",
        "Departure_time": "2022.12.13 07:00:00",
        "Arrival_SoC": "99",
        "Departure_SoC": "850"

        :param p_max: list of maximum charging/ discharging power of each EV (This is the speed that a battery on a vehicle can charge)
        :param SoC_max: list of battery capacity of each EV (Max capacity of the battery)
        :param arrival_time: list of EV arrival times
        :param departure_time: list of EV expected departure times
        :param arrival_soc: list of EV arrival State of Charge
        :param departure_soc: list of EV required State of Charge at departure
        */
        <table className="table">
            <thead>
            <tr>
                <th>EV Type</th>
                <th>P_Max</th>
                <th>SoC_Max</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Arrival_SoC</th>
                <th>Departure_SoC</th>
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
