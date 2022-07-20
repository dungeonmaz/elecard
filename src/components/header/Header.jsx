import { AppBar, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Toolbar, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()

    const handleChange = (e) => {
        switch (e.target.value) {
            case "/cards":
                navigate("/cards")
                break
            case "/tree":
                navigate("/tree")
                break
            default:
                break
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Toolbar>
                    <Typography>Elecard Test</Typography>
                </Toolbar>
                <FormControl sx={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                    <FormLabel sx={{marginRight:'8px', color:'white', '&.Mui-focused': {color:'white'},}}>View</FormLabel>
                    <RadioGroup row value={window.location.pathname} onChange={handleChange}>
                        <FormControlLabel value="/cards" control={<Radio sx={{ color: "white", '&.Mui-checked': { color: "purple", }, }} />} label="Cards" />
                        <FormControlLabel value="/tree" control={<Radio sx={{ color: "white", '&.Mui-checked': { color: "purple", }, }} />} label="Tree" />
                    </RadioGroup>
                </FormControl>
            </AppBar>
            <Toolbar />
        </Box>
    )
}

export default Header