import * as React from 'react';
// @mui
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
// Router
import { Link as RouterLink } from 'react-router-dom';

// ------------------------

const StyledCardContent = styled(CardContent)({
  '&.MuiCardContent-root': {
    padding: 6
  }
})

// ------------------------

export default function ProductItem({src, title, id}) {
  return (
    <Card sx={{maxHeight: 110, borderRadius: '10%'}}>
      <CardActionArea component={RouterLink} to={`/categories/${id}`}>
          <CardMedia
            sx={{ height: 80 }}
            image={src}
            title={title}
            />
          <StyledCardContent>
            <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
              <Typography gutterBottom variant="body2">
                {title}
              </Typography>
            </div>
          </StyledCardContent>
        </CardActionArea>
      </Card>
  );
}