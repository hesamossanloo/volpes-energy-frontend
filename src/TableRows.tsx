import React from "react";

function TableRows({rowsData, deleteTableRows, handleChange}) {
    return (

        rowsData.map((data, index) => {
            const {
                EVType,
                PMax,
                SOCMax,
                arrivalTime,
                departureTime,
                arrivalSOC,
                departureSOC
            } = data;
            return (

                <tr key={index}>
                    <td>
                        <input type="text" value={EVType} onChange={(evnt) => (handleChange(index, evnt))}
                               name="EVType" className="form-control"/>
                    </td>
                    <td>
                        <input type="text" value={PMax} onChange={(evnt) => (handleChange(index, evnt))}
                               name="PMax" className="form-control"/>
                    </td>
                    <td><input type="text" value={SOCMax} onChange={(evnt) => (handleChange(index, evnt))}
                               name="SOCMax" className="form-control"/></td>
                    <td><input type="text" value={arrivalTime} onChange={(evnt) => (handleChange(index, evnt))}
                               name="arrivalTime" className="form-control"/></td>
                    <td><input type="text" value={departureTime} onChange={(evnt) => (handleChange(index, evnt))}
                               name="departureTime" className="form-control"/></td>
                    <td><input type="text" value={arrivalSOC} onChange={(evnt) => (handleChange(index, evnt))}
                               name="arrivalSOC" className="form-control"/></td>
                    <td><input type="text" value={departureSOC} onChange={(evnt) => (handleChange(index, evnt))}
                               name="departureSOC" className="form-control"/></td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button>
                    </td>
                </tr>

            )
        })

    )

}

export default TableRows;
