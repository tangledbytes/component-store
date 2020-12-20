import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PerformanceDialog extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateLoadTestData({
      loadTest: {
        url: this.props.urlForModal
      }
    });
  }

  render() {
    const { MesheryPerformanceComponent } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="performance-dialog-title"
        aria-describedby="performance-dialog-description"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="alert-dialog-title">
          <h3 color="primary">Performance Test</h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="performance-component">
            <MesheryPerformanceComponent />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default PerformanceDialog;
