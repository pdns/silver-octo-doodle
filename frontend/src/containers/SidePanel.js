import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import HostList from '../components/HostList';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { getHostList, dismissError } from '../redux/actions';

class SidePanel extends React.Component {
  componentDidMount() {
    this.props.getHostList();
  }

  render() {
    const { summary, create } = this.props.hosts;
    if (summary.errors) {
      // TODO: Nicer-looking error
      return <p>{summary.errors.map(e => e.message)}</p>;
    } else if (!summary.data || summary.isPending === true) {
      return <CircularProgress />;
    }
    return (
      <React.Fragment>
        <HostList hosts={summary.data} />
        <ErrorSnackbar errors={create.errors} onClose={this.props.dismissError}/>
      </React.Fragment>
    );
  }
}

SidePanel.propTypes = {
  hosts: PropTypes.object,
  getHostList: PropTypes.func,
  dismissError: PropTypes.func,
};

const mapStateToProps = ({ hosts }) => ({ hosts });
const mapDispatchToProps = {
  getHostList,
  dismissError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
