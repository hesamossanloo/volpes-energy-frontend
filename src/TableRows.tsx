import React from "react";
import Select from './Select'
function TableRows({rowsData, deleteTableRows, handleChange}) {
    return (

        rowsData.map((data, index) => {
            const {
                ev_type,
                p_max,
                soc_max,
                arrival_time,
                departure_time,
                arrival_soc,
                departure_soc
            } = data;
            return (

                <tr key={index}>
                    <td>
                        <input type="text" value={ev_type} onChange={(evnt) => (handleChange(index, evnt))}
                               name="ev_type" className="form-control"/>
                    </td>
                    <td>
                        <input type="text" value={p_max} onChange={(evnt) => (handleChange(index, evnt))}
                               name="p_max" className="form-control"/>
                    </td>
                    <td><input type="text" value={soc_max} onChange={(evnt) => (handleChange(index, evnt))}
                               name="soc_max" className="form-control"/></td>
                    <td><input type="text" value={arrival_time} onChange={(evnt) => (handleChange(index, evnt))}
                               name="arrival_time" className="form-control"/></td>
                    <td><input type="text" value={departure_time} onChange={(evnt) => (handleChange(index, evnt))}
                               name="departure_time" className="form-control"/></td>
                    <td><input type="text" value={arrival_soc} onChange={(evnt) => (handleChange(index, evnt))}
                               name="arrival_soc" className="form-control"/></td>
                    <td><input type="text" value={departure_soc} onChange={(evnt) => (handleChange(index, evnt))}
                               name="departure_soc" className="form-control"/></td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button>
                    </td>
                </tr>

            )
        })

    )

}

export default TableRows;
