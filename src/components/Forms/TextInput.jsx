import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const TextInput = (props) => {
  return (
    <TextField
      fullWidth={true}
      label={props.label}
      margin={'dense'}
      multiline={props.multiline}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};
