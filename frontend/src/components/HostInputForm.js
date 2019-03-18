import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

class HostInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: { value: 'a', error: false },
        user: { value: 'b', error: false },
        address: { value: 'c', error: false },
        port: { value: 22, error: false },
        identityFile: { value: 'd', error: false },
      },
    };
  }

  onChange = (event, field) => {
    const newState = { fields: { ...this.state.fields } };
    newState.fields[field] = { value: event.target.value, error: false };
    this.setState(newState);
  }

  onSubmit = () => {
    const newState = { fields: { ...this.state.fields } };
    let atLeastOneError = false;

    Object.keys(this.state.fields).forEach((f) => {
      let { value } = this.state.fields[f];
      let error;
      if (typeof value === 'string') {
        value = value.trim();
        error = value.length < 1;
      }
      if (f === 'port') {
        value = parseInt(value, 10);
        error = Number.isNaN(value);
      }
      atLeastOneError = atLeastOneError || error;
      newState.fields[f] = { value, error };
    });

    if (atLeastOneError) {
      this.setState(newState);
    } else {
      const f = newState.fields;
      this.props.onSubmit({
        name: f.name.value,
        user: f.user.value,
        address: f.address.value,
        port: f.port.value,
        identityFile: f.identityFile.value,
      });
    }
  }

  render() {
    const { fields } = this.state;

    return (
      <form>
        <TextField
          label="Name"
          value={fields.name.value}
          error={fields.name.error}
          onChange={e => this.onChange(e, 'name')}
          margin="normal"
          fullWidth
          required
          autoFocus
        />
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField
              label="User"
              value={fields.user.value}
              error={fields.user.error}
              onChange={e => this.onChange(e, 'user')}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Address/hostname"
              value={fields.address.value}
              error={fields.address.error}
              onChange={e => this.onChange(e, 'address')}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField
              label="Port"
              value={fields.port.value}
              error={fields.port.error}
              onChange={e => this.onChange(e, 'port')}
              margin="normal"
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Identity file"
              value={fields.identityFile.value}
              error={fields.identityFile.error}
              onChange={e => this.onChange(e, 'identityFile')}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button color="primary" onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.onSubmit}>
            Create
          </Button>
        </DialogActions>
      </form>
    );
  }
}

HostInputForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default HostInputForm;
