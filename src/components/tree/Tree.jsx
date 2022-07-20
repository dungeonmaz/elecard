import { TreeView, TreeItem } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react'
import { Modal, Box, Button, AppBar, Toolbar } from '@mui/material';
import { useState } from 'react';

const ConvertTime = (time) => {
    let date = new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(time)
    return date
}

const formatedData = {
    id: 'root',
    name: 'Categories',
    children: [
    ]
}

let ids = ['root']

const formatData = (l_data) => {
    formatedData.children = []
    ids = ['root']
    l_data.forEach((el) => {
        if (formatedData.children.find(x => x.id === el.category) === undefined) {
            formatedData.children.push({
                id: el.category,
                name: el.category,
                children: [],
            })
            ids.push(el.category)
        }
        let j = formatedData.children.find(x => x.id === el.category)
        j.children.push({
            id: el.image,
            name: el.name.charAt(0).toUpperCase() + el.name.slice(1),
            properties: { size: el.filesize, time: el.timestamp, image: el.image },
        })
        ids.push(el.image)
    })
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};


const Tree = ({ data, loading, matches }) => {
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [expanded, setExpanded] = useState([])

    const handleOpen = (url) => {
        setOpen(true)
        setImageUrl(url)
    };
    const handleClose = () => setOpen(false);
    if (loading) {
        return <h2>Loading...</h2>
    }

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ids : [],
        );
    };

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => (renderTree(node)))
                : null}
            {nodes.properties ? <div>
                <div>Image : <img src={`http://contest.elecard.ru/frontend_data/${nodes.properties.image}`} alt="" width="96px" style={{ display: 'flex' }} onClick={() => { handleOpen(`http://contest.elecard.ru/frontend_data/${nodes.properties.image}`) }} /></div>
                <div>Size : {nodes.properties.size}</div>
                <div>Time : {ConvertTime(nodes.properties.time)}</div>
            </div> : null}
        </TreeItem>
    )

    formatData(data)

    return (
        <div>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box>
                        <Button variant="contained" color='secondary' onClick={handleExpandClick}>
                            {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <TreeView expanded={expanded} onNodeToggle={handleToggle} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} sx={{width:matches ?'1360px' : '300px', margin: '0 auto', paddingBottom:'80px' }}>
                {renderTree(formatedData)}
            </TreeView>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img src={imageUrl} alt="" />
                </Box>
            </Modal>
        </div>
    )
}

export default Tree