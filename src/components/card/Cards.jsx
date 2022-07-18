import React from 'react'
import { Grid } from '@mui/material';
import CardItem from './CardItem';

const Cards = ({data, loading, handleRemove}) => {
  if(loading) {
    return <h2>Loading...</h2>
  }

  return <Grid container spacing={3} sx={{ padding: '20px', display:'flex',justifyContent:'center' }}>
  {data.map((card) => (
    <Grid key={card.image} item xs={12} sm={6} md={4} lg={3}>
      <CardItem time={card.timestamp} image={card.image} name={card.name} category={card.category} size={card.filesize} handleRemove={handleRemove}/>
    </Grid>
  ))}
</Grid>
}

export default Cards
