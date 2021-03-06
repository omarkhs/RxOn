import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import EditAction from './EditMedication';
import CancelAction from './CancelMedication';
import ViewImageAction from './ViewMedicationImage';

const styles = () => ({
    root: {
        maxWidth: 360,
    },
    inline: {
        display: 'inline',
    },
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[600],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
});

function renderActions(props) {
    const { ContainerProps } = props;

    if (props.hideActions == undefined || props.hideActions == false) {
        return (
            <ListItemSecondaryAction>
                <EditAction ContainerProps={ContainerProps} />
                <CancelAction ContainerProps={ContainerProps} />
                <ViewImageAction ContainerProps={ContainerProps} />
            </ListItemSecondaryAction>
        );
    }
}

function Medication(props) {
    const { classes, ContainerProps } = props;
    const name = ContainerProps.rxName + ' ' + ContainerProps.rxStrength;
    const directions = ContainerProps.rxDose;
    const refills = ContainerProps.refill;
    const status = ContainerProps.status;

    function returnStatus() {
        if (status == 'pending') {
            return 'P';
        }

        if (status == 'filled' || status == 'refilled') {
            return 'F';
        }
    }

    function returnColor() {
        if (status == 'pending') {
            return classes.orangeAvatar;
        }

        if (status == 'filled' || status == 'refilled') {
            return classes.purpleAvatar;
        }
    }

    return (
        <List>
            <ListItem alignItems="flex-start" divider={true}>
                <ListItemAvatar>
                    <Avatar className={returnColor()}>{returnStatus()}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                className={classes.inline}
                                color="textSecondary"
                            >
                                Directions:{' '}
                            </Typography>
                            <Typography
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {directions}
                            </Typography>
                            <br />
                            <Typography
                                component="span"
                                className={classes.inline}
                                color="textSecondary"
                            >
                                Refills:{' '}
                            </Typography>
                            <Typography
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {refills}
                            </Typography>
                        </React.Fragment>
                    }
                />
                {renderActions(props)}
            </ListItem>
        </List>
    );
}

Medication.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styledItem = withStyles(styles)(Medication);

export default withTracker(() => {
    const filesHandle = Meteor.subscribe('images');
    const docsReadyYet = filesHandle.ready();
    return {
        docsReadyYet,
    };
})(styledItem);
