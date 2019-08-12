import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './filtersMenu.scss';


export default function FiltersMenu({ handleCountChange, handleMaxCountChange, chunkSize, maxCountValue }) {

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

  const classes = useStyles();

  return (
    <div className="inputs-container" >
      <TextField
        id="outlined-helperText"
        label="Max gif count"
        className={ classes.textField }
        margin="normal"
        variant="outlined"
        onChange={ handleMaxCountChange }
        value={ maxCountValue }
      />

      <TextField
        id="outlined-helperText"
        label="Gif chunk size"
        className={ classes.textField }
        margin="normal"
        variant="outlined"
        onChange={ handleCountChange }
        value={ chunkSize }
      />
    </div>
  );
}