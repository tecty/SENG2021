import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import './ConfirmButton.css';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
});

class ConfirmButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="ConfirmButton">
        <Tooltip id="tooltip-fab" title="Confirm">
          <Button 
            variant="fab"
            color="primary"
            aria-label="Confirm"
            className={classes.fab}
            onClick={this.props.onClick}
          >
            <CheckIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

ConfirmButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmButton);