import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
    const [ev, setEV] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setEV(event.target.value as string);
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">EV Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ev}
                    label="EV"
                    onChange={handleChange}
                >
                    <MenuItem value={'bus'}>Bus</MenuItem>
                    <MenuItem value={'truck'}>Truck</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
