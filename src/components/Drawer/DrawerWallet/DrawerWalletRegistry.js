import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { MINIMUM_FOAM_STAKE } from 'config';
import sl from 'utils/sl';
import { deserializeFoam } from 'utils/foam';

const useStyles = makeStyles(theme => ({
  row: {
    marginBottom: 20,
  },
  button: {
    width: 100,
  },
}));

function Component({ approveFOAM, approved }) {
  const classes = useStyles();

  async function onFormSubmit(e) {
    e.preventDefault();

    const amount = parseFloat(e.target.amount.value);

    if (amount < MINIMUM_FOAM_STAKE) {
      return sl(
        'error',
        `A minimum of ${MINIMUM_FOAM_STAKE} FOAM is required.`
      );
    }

    await approveFOAM(amount);
    sl(
      'success',
      'Transaction was created, Wait until it\'s mined ...',
      'Success'
    );
  }

  return (
    <form type="action" onSubmit={onFormSubmit}>
      <div className={classes.row}>
        <small>
          Approve FOAM for use in the registry. We need the right to transfer
          FOAM when you create a new POIs and initiate a challenge. This will
          not affect your balance of FOAM.
        </small>
      </div>
      <div className={classes.row}>
        <TextField
          id="amount"
          label="Approved registry tokens"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={`${MINIMUM_FOAM_STAKE} FOAM minimum...`}
          defaultValue={!approved ? 0 : deserializeFoam(approved)}
          fullWidth
          required
        />
      </div>
      <div className={classes.row}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Approve
        </Button>
      </div>
    </form>
  );
}

export default connect(({ wallet }) => {
  return {
    ...wallet,
  };
}, mapDispatchToProps)(Component);
