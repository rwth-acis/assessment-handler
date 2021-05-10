import React from 'react';
import AssessmentForm  from "./AssessmentForm";
import PostAddIcon from '@material-ui/icons/PostAdd';
import PageHeader from '../../components/PageHeader';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))
export default function Assessments(){
    const classes = useStyles();
    return(
        <>
            <PageHeader 
                title="New Assessment"
                subtitle="Form with validation"
                icon={<PostAddIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}><AssessmentForm /></Paper>
            
        </>
        
    )
}