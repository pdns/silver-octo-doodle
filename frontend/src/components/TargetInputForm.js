import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

class TargetInputForm extends React.Component {
  constructor(props) {
    const { defaultHost } = props;
    super(props);
    this.state = {
      fields: {
        name: { value: '', error: false },
        host: { value: defaultHost ? defaultHost.id : '', error: false },
        from: { value: '', error: false },
        to: { value: '', error: false },
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
      if (typeof value === 'string') value = value.trim();
      const error = value.length < 1;
      atLeastOneError = atLeastOneError || error;
      newState.fields[f] = { value, error };
    });

    if (atLeastOneError) {
      this.setState(newState);
    } else {
      const f = newState.fields;
      this.props.onSubmit({
        name: f.name.value,
        hostId: f.host.value,
        from: f.from.value,
        to: f.to.value,
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
        <FormControl
          error={fields.host.error}
          fullWidth
          required
        >
          <InputLabel shrink>Host</InputLabel>
          <Select
            value={fields.host.value}
            onChange={e => this.onChange(e, 'host')}
            displayEmpty
          >
            <MenuItem value='' disabled>Select a host</MenuItem>
            {
              this.props.hosts &&
              this.props.hosts.map((h, i) => <MenuItem key={i} value={h.id}>{h.name}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          label="From"
          value={fields.from.value}
          error={fields.from.error}
          onChange={e => this.onChange(e, 'from')}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="To"
          value={fields.to.value}
          error={fields.to.error}
          onChange={e => this.onChange(e, 'to')}
          margin="normal"
          fullWidth
          required
        />
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

TargetInputForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hosts: PropTypes.array,
  defaultHost: PropTypes.object,
};

export default TargetInputForm;
