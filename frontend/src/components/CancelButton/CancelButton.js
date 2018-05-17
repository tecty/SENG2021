import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import './CancelButton.css';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
});

class CancelButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="CancelButton">
        <Tooltip id="tooltip-fab" title="Cancel">
          <Button 
            variant="fab"
            aria-label="Cancel"
            className={classes.fab}
            onClick={this.props.onClick}
          >
            <CloseIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

CancelButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CancelButton);