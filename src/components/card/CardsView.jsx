import React from 'react'
import { AppBar, Toolbar, Pagination, FormControl, Radio, RadioGroup, FormControlLabel, Popover, Button } from '@mui/material'
import Cards from './Cards'
import { useState } from 'react'

const CardsView = ({ matches, loading, data, setData, handleRestoreClick, setSortType, sortType }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(20)
    const [anchorEl, setAnchorEl] = useState(null);

    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard)

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }

    const handleSortChange = (e) => {
        setSortType(e.target.value)
        switch (e.target.value) {
            case 'category':
                data.sort(function (a, b) {
                    const categoryA = a.category.toUpperCase();
                    const categoryB = b.category.toUpperCase();
                    if (categoryA < categoryB) {
                        return -1;
                    }
                    if (categoryA > categoryB) {
                        return 1;
                    }

                    return 0;
                });
                break
            case 'date':
                data.sort(function (a, b) {
                    return b.timestamp - a.timestamp
                })
                break
            case 'name':
                data.sort(function (a, b) {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    return 0;
                });
                break
            case 'size':
                data.sort(function (a, b) {
                    return a.filesize - b.filesize
                })
                break
            default:
                break
        }
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleRemove = (c) => {
        data = data.filter(obj => obj.image !== c)
        localStorage.setItem('previous', JSON.stringify(data))
        setData(data)
    }


    return (
        <div>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{display : 'flex', alignItems:'center', flexDirection: matches ? 'row' :'column'}}>
                        <Pagination siblingCount={matches ? 2 : 0} sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }} color="secondary" count={Math.ceil(data.length / cardsPerPage)} page={currentPage} onChange={handlePageChange} />
                        <div  style={{display : 'flex', alignItems:'center', flexDirection: 'row', gap:matches ? '20px' :'50px'}}>
                        <Button aria-describedby={id} variant="contained" color='secondary' onClick={handleClick}>
                            Sort
                        </Button>
                        <Button aria-describedby={id} variant="contained" color='secondary' onClick={handleRestoreClick}>
                            Restore
                        </Button>
                        </div>
                    </div>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioGroup value={sortType} onChange={handleSortChange}>
                                <FormControlLabel value="category" control={<Radio sx={{ margin:'0 5px',color: "black", '&.Mui-checked': { color: "purple", }, }} />} label="Category" />
                                <FormControlLabel value="date" control={<Radio sx={{ margin:'0 5px', color: "black", '&.Mui-checked': { color: "purple", }, }} />} label="Date" />
                                <FormControlLabel value="name" control={<Radio sx={{ margin:'0 5px', color: "black", '&.Mui-checked': { color: "purple", }, }} />} label="Name" />
                                <FormControlLabel value="size" control={<Radio sx={{ margin:'0 5px', color: "black", '&.Mui-checked': { color: "purple", }, }} />} label="Size" />
                            </RadioGroup>
                        </FormControl>
                    </Popover>
                </Toolbar>
            </AppBar>
            <div style={{ paddingBottom: '50px' }}>
                <Cards loading={loading} data={currentCards} handleRemove={handleRemove} />
            </div>
        </div>
    )
}

export default CardsView