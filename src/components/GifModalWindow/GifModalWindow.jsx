import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


export default function GifModalWindow({ open, onClose, modalInfo }) {
  const useStyles = makeStyles({
    card: {
      maxWidth: 500,
      position: "absolute",
      top: '35%',
      left: '40%',
      textAlign: 'center',
    },
    media: {
      height: 200,
    },
  });
  
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={ open }
        onClose={ onClose }
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={ modalInfo.images.fixed_width_still.url }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              { modalInfo.title }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="span">
              Rating: { modalInfo.rating }
              <br />
              Import date: { modalInfo.import_datetime }
            </Typography>
          </CardContent>
          <CardActions>
          <Link
            href={ modalInfo.source }
            target="_blank"
            rel="noreferrer"
          >
            Source link
          </Link>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
