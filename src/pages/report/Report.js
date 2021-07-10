import React, { useState, useEffect } from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PageHeader from '../../components/PageHeader';
import { Paper,makeStyles, CardHeader, Card, CardContent  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))
export default function Assessments({ name }){
    const classes = useStyles();
    const [data, setData] = useState(null);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
        try {
            fetch('http://137.226.232.75:32445/readerbench/getReportJson/'+ name, {
            method: 'POST',
          }).then(function(response) {
            console.log(response)
            if(response.ok){
                
            }
            else{
                alert("Fehler bei der Ermittlung der Ergebnisse");
            }
            return response.json();
          });
        } catch (error) {
            console.error(error);
        }
  
    });
    return(
        <>
            <PageHeader 
                title={"Ihre Ergebnisse zur Übung mit der Name "+ name}
                subtitle="Ihre Ergebnisse"
                icon={<PostAddIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
            <Card className={classes.root}>
                <CardHeader title="Feedback zu Schreibfähigkeiten und mehr mit Hilfe von Text-Indizes von Readerbench" />
                <CardContent>
                <div>
                    {name ? (
                        <div>
                        The <code>name</code> in the query string is &quot;{name}
                        &quot;
                        </div>
                    ) : (
                        <h3>There is no name in the query string</h3>
                    )}
                </div>
                </CardContent>
            </Card>
            
            </Paper>
            <Paper className={classes.pageContent}>
            <Card className={classes.root}>
                <CardHeader title="Vergleich mit der Korrektur unter Verwendung von CNA(Cohesion Network Graph)" />
                <CardContent>
                <div>
                    {name ? (
                        <div>
                        The <code>name</code> in the query string is &quot;{name}
                        &quot;
                        </div>
                    ) : (
                        <h3>There is no name in the query string</h3>
                    )}
                </div>
                </CardContent>
            </Card>
            
            </Paper>
            <Paper className={classes.pageContent}>
            <Card className={classes.root}>
                <CardHeader title="Vergleich der Schlüsselwörter" />  
                <CardContent>
                <div>
                    {name ? (
                        <div>
                        The <code>name</code> in the query string is &quot;{name}
                        &quot;
                        </div>
                    ) : (
                        <h3>There is no name in the query string</h3>
                    )}
                </div>
                </CardContent>
            </Card>
            
            </Paper>
            
        </>
        
    )
}