import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './searchInput.scss';


export default function SearchInput({ handleSearchChange }) {

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 500,
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
    <TextField
      id="outlined-full-width"
      label="Giphy search..."
      className={classes.textField}
      margin="normal"
      variant="outlined"
      onChange={ handleSearchChange }
    />
  );
}