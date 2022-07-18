import { Card, CardContent, CardMedia, IconButton, Typography, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const ConvertTime = (time) => {
  let date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(time)
  return date
}


const CardItem = ({ image, time, handleRemove, name, category, size }) => {
  const remove = () => {
    handleRemove(image)
  }
  const image_url = `http://contest.elecard.ru/frontend_data/${image}`
  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia component="img" alt="" image={image_url} height="240" />
      <IconButton sx={{ position: 'absolute', top: '10px', right: '10px' }} aria-label='delete' onClick={remove}>
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Typography variant='h6'>
          {name.charAt(0).toUpperCase() + name.slice(1)} <br></br>
        </Typography>
        <Typography variant='body2' color="text.primary">
          {ConvertTime(time)}
        </Typography>
        <Typography variant='body2' color="text.secondary">
          {category}
        </Typography>
        <Typography variant='body2' color="text.secondary">
          {size}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardItem