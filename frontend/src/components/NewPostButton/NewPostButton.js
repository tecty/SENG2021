import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import './NewPostButton.css';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

class NewPostButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="NewPostButton">
        <Tooltip id="tooltip-fab" title="Add">
          <Button variant="fab" color="secondary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

NewPostButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPostButton);