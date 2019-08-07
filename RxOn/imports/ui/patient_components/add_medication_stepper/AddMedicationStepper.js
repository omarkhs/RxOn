import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MedicationInput from './MedicationInput';
import ImageUpload from './ImageUpload';
import ConfirmationPage from './ConfirmationPage';
import Success from './Success';

const styles = theme => ({
   root: {
      width: '90%',
   },
   button: {
      marginRight: theme.spacing.unit,
   },
   instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
   },
   connectorActive: {
      '& $connectorLine': {
         borderColor: theme.palette.secondary.main,
      },
   },
   connectorCompleted: {
      '& $connectorLine': {
         borderColor: theme.palette.primary.main,
      },
   },
   connectorDisabled: {
      '& $connectorLine': {
         borderColor: theme.palette.grey[100],
      },
   },
   connectorLine: {
      transition: theme.transitions.create('border-color'),
   },
});

class MedicationStepper extends Component {
   constructor(props) {
      super(props);
      this.state = {
         activeStep: 0,
         rxName: '',
         rxStrength: '',
         rxDose: '',
         imgLink: '',
      };
   }

   handleNext = () => {
      const { activeStep } = this.state;
      this.setState({
         activeStep: activeStep + 1,
      });
   };

   handleBack = () => {
      const { activeStep } = this.state;
      this.setState({
         activeStep: activeStep - 1,
      });
   };

   handleChange = input => e => {
      this.setState({ [input]: e.target.value });
   };

   setViewLink = val => {
      this.setState({ imgLink: val });
   };

   getStepContent = (step, values) => {
      switch (step) {
         case 0:
            return <MedicationInput handleChange={this.handleChange} values={values} />;
         case 1:
            return <ImageUpload setLink={this.setViewLink} values={values} />;
         case 2:
            return <ConfirmationPage values={values} />;
         case 3:
            return <Success />;
         default:
            return 'Unknown step';
      }
   };

   render() {
      const { classes } = this.props;
      const { activeStep, rxName, rxStrength, rxDose, imgLink } = this.state;
      const values = { rxName, rxStrength, rxDose, imgLink };
      const steps = ['Add Medication', 'Upload Prescription', 'Review and Submit'];
      const connector = (
         <StepConnector
            classes={{
               active: classes.connectorActive,
               completed: classes.connectorCompleted,
               disabled: classes.connectorDisabled,
               line: classes.connectorLine,
            }}
         />
      );
      return (
         <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={connector}>
               {steps.map(label => (
                  <Step key={label}>
                     <StepLabel>{label}</StepLabel>
                  </Step>
               ))}
            </Stepper>
            <div>
               {activeStep === steps.length ? (
                  <div>
                     <Typography className={classes.instructions}>
                        All steps completed - you're prescription has been sent!
                     </Typography>
                     <Button className={classes.button}>Close</Button>
                  </div>
               ) : (
                  <React.Fragment>
                     <Typography className={classes.instructions} />
                     {this.getStepContent(activeStep, values)}
                     <br />
                     <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                     >
                        {activeStep === 0 ? 'Cancel' : 'Back'}
                     </Button>
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                     >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                     </Button>
                  </React.Fragment>
               )}
            </div>
         </div>
      );
   }
}

export default withStyles(styles)(MedicationStepper);