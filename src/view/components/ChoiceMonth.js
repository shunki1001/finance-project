import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ChoiceMonth = (props) => {
    const { month, setMonth } = props;

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">Month</InputLabel>
                <Select labelId="simple-select-label" id="simple-select" value={month} label="Month" onChange={handleChange}>
                    <MenuItem value={1}>1月</MenuItem>
                    <MenuItem value={2}>2月</MenuItem>
                    <MenuItem value={3}>3月</MenuItem>
                    <MenuItem value={4}>4月</MenuItem>
                    <MenuItem value={5}>5月</MenuItem>
                    <MenuItem value={6}>6月</MenuItem>
                    <MenuItem value={7}>7月</MenuItem>
                    <MenuItem value={8}>8月</MenuItem>
                    <MenuItem value={9}>9月</MenuItem>
                    <MenuItem value={10}>10月</MenuItem>
                    <MenuItem value={11}>11月</MenuItem>
                    <MenuItem value={12}>12月</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ChoiceMonth;
