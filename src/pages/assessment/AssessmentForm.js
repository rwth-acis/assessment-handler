
import React from 'react';
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import { Divider, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import * as readerbenchService from "../../services/readerbenchService";
import Alert from '@material-ui/lab/Alert';

const validationSchema = Yup.object().shape({
    topicName: Yup.string().required("Frage ist erforderlich"),
    question: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Frage ist erforderlich"),
        questionWeights: Yup.string().required("Gewicht ist erforderlich"),
        textref: Yup.string().required("Text refenrenz ist erforderlich")
      })
    )
  });

const debug = true;

const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    button: {
      margin: theme.spacing(1)
    },
    field: {
      margin: theme.spacing(1)
    }
}));

const onSubmit = async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
    try {
        console.log("onSubmit", JSON.stringify(values, null, 2));
        fetch('http://137.226.232.187:32445/readerbench/insertAssessment', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(values, null, 2)
      }).then(function(response) {
        console.log(response)
        if(response.ok){
            resetForm();
            <Alert severity="success">Insert was a success!</Alert>
        }
        return response.json();
      });
        //readerbenchService.insertAssessment(values)
        setStatus({success: true})
    } catch (error) {
      setStatus({success: false})
      setSubmitting(false)
      setErrors({submit: error.message})
    }
  }

export default function AssessmentForm(){
    const classes = useStyles();

    return(
    
    <div className={classes.container}>
        <Formik
            initialValues={{
            topicName: "",
            question: [
                {
                sequence: Math.random(),
                question: "",
                questionWeights: "",
                textref: ""
                }
            ]
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
                    <Form noValidate autoComplete="off">
                        <TextField 
                            className={classes.field}
                            variant="outlined"
                            label = "Übungsname"
                            margin="normal"
                            name="topicName"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <FieldArray name="question">
                            {arrayHelpers  => (
                                <div>
                                    {values.question.map((p, index) => {
                                        const question = `question[${index}].question`;
                                        const touchedQuestion = getIn(touched, question);
                                        const errorQuestion = getIn(errors, question);

                                        const questionWeights = `question[${index}].questionWeights`;
                                        const touchedquestionWeights = getIn(touched, questionWeights);
                                        const errorquestionWeights = getIn(errors, questionWeights);
                                        
                                        const textref = `question[${index}].textref`;
                                        const touchedTextref = getIn(touched, textref);
                                        const errorTextref = getIn(errors, textref);
                                        return (
                                            <div key={p.sequence}>
                                                <TextField 
                                                className={classes.field}
                                                margin="normal"
                                                variant="outlined"
                                                label="Frage"
                                                name={question}
                                                value={p.question}
                                                required
                                                helperText={
                                                    touchedQuestion && errorQuestion
                                                    ? errorQuestion
                                                    : ""
                                                }
                                                error={Boolean(touchedQuestion && errorQuestion)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <TextField 
                                                className={classes.field}
                                                margin="normal"
                                                variant="outlined"
                                                label="Gewicht"
                                                name={questionWeights}
                                                value={p.questionWeights}
                                                required
                                                helperText={
                                                    touchedquestionWeights && errorquestionWeights
                                                    ? errorquestionWeights
                                                    : ""
                                                }
                                                error={Boolean(touchedquestionWeights && errorquestionWeights)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />

                                                <Box width={1000}>
                                                <TextField
                                                className={classes.field}
                                                margin="normal"
                                                variant="outlined"
                                                label="textref"
                                                name={textref}
                                                value={p.textref}
                                                required
                                                helperText={
                                                    touchedTextref && errorTextref
                                                    ? errorTextref
                                                    : ""
                                                }
                                                error={Boolean(touchedTextref && errorTextref)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                multiline
                                                rows="3"
                                                fullWidth 
                                                />
                                                </Box>
                                                
                                                
                                                <Button
                                                className={classes.button}
                                                margin="normal"
                                                type="button"
                                                color="secondary"
                                                variant="outlined"
                                                onClick={() => arrayHelpers.remove(index)}
                                                >
                                                    x
                                                </Button>
                                            </div>
                                        );
                                    })}
                                    <Button
                                        className={classes.button}
                                        type="button"
                                        variant="outlined"
                                        onClick={() =>
                                            arrayHelpers.push({ sequence: Math.random(), question: "", questionWeights:"", textref: "" })
                                        }
                                    >
                                        Neue Frage hinzufügen
                                    </Button>
                                </div>
                            )}
                        </FieldArray>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <Button
                            className={classes.button}
                            type="submit"
                            color="primary"
                            variant="contained"
                            // disabled={!isValid || values.people.length === 0}
                            >
                            Frage senden
                        </Button>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        {debug && (
                            <>
                                <pre style={{ textAlign: "left" }}>
                                <strong>Values</strong>
                                <br />
                                {JSON.stringify(values, null, 2)}
                                </pre>
                                <pre style={{ textAlign: "left" }}>
                                <strong>Errors</strong>
                                <br />
                                {JSON.stringify(errors, null, 2)}
                                </pre>
                            </>
                        )}
                
                    </Form>
                )}
            </Formik>
        </div>
    );
    
}