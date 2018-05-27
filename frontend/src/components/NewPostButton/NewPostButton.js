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
});

class NewPostButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="NewPostButton">
        <Tooltip id="tooltip-fab" title="Add Pin">
          <Button 
            variant="fab"
            color="secondary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.props.onClick}
          >
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