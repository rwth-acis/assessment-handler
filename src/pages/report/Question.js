import React, { useState, useEffect } from 'react';

import { Paper,makeStyles, CardHeader, Card, CardContent  } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


import Compare from './Compare'
import Cna from './Cna/Cna'
import Keywords from './Keyword/Keywords'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    root: {
        '& > *': {
          borderBottom: 'unset',
        },
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
}))


  
export default function Question({ question }){
    const classes = useStyles();
    const [cna_result, setCna_result] = useState({});
    const [compare_result, setCompare_result] = useState({});
    const [keywords_result, setKeywords_result] = useState({});
    const [cnaImportances, setCnaImportances] =useState([]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
        setCompare_result(question.compare_result);
        setCna_result(question.cna_result);
        setKeywords_result(question.keyword_result);
        var elements=[];
        var object =   question.cna_result.data.children
        object.forEach((obj)=>{
        elements.push({
            name: obj.name,
            importance: obj.importance,
            value:obj.value
        })
        obj.children.forEach((obj2) =>{
            elements.push({
            name: obj2.name,
            importance: obj2.importance,
            value: obj2.value
            })
            obj2.children.forEach((obj3) => {
            elements.push({
                name: obj3.name,
                importance: obj3.importance,
                value: obj3.value
            })
            })
        })

        })
        setCnaImportances(elements)
  
    },[]);

    return(
        <>
            <Paper className={classes.pageContent}>
            <Card className={classes.root}>
                <CardHeader title="Vergleich mit der Korrektur unter Verwendung von CNA(Cohesion Network Graph)" />
                <CardContent>
                    <div>
                    <Typography variant="h7" >
                        Dieser Teil analysiert die Koh??sion von 2 gew??hlte Textes (Default sind "Dokument 1 mit Document 2" welche Ihre Text  und die musterl??sung sind) auf 4 Hauptebenen
                    </Typography>
                    <List dense={true}>
                        <ListItem>
                        <ListItemText
                            primary="(LEXICAL_OVERLAP: CONTENT_OVERLAP)"
                            secondary={true ? 'Hier wird gepr??ft, ob die verwendeten W??rter identisch sind oder nicht. Ein gro??er Wert des Attributs vet bedeutet, dass fast'+
                            ' die gleichen W??rter verwendet werden' : null}
                        />
                        </ListItem>
                        <ListItem>
                        <ListItemText
                            primary="LEXICAL_OVERLAP: TOPIC_OVERLAP"
                            secondary={true ? 'besteht in der ??berpr??fung der Unterschiede der verwendeten Begriffe. Indem Sie zwei Textteile ausw??hlen, k??nnen Sie ??berpr??fen,'+
                            ' ob sie die gleichen Begriffe verwenden.' : null}
                        />
                        </ListItem>
                        <ListItem>
                        <ListItemText
                            primary="LEXICAL_OVERLAP: ARGUMENT_OVERLAP"
                            secondary={true ? 'vergleicht, wie zwei Teile des Textes aufgebaut sind, insbesondere' 
                            +'die Beziehungen zwischen Ihren W??rtern. Hier geht es um die Verben, Adjektive usw., die Sie zur Formulierung Ihrer Argumente verwenden' : null}
                        />
                        </ListItem>
                        <ListItem>
                        <ListItemText
                            primary="SEMANTIC: WORD2VEC(wiki)"
                            secondary={true ? 'Die semantische Koh??sion vergleicht die  umfasst die ??berpr??fung der Dom??nen, zu denen die in einem Text verwendeten W??rter geh??ren.'+
                             'Indem du zwei Textteile w??hlst, kannst du dann herausfinden, '+
                        'ob die W??rter in den Teilen W??rter aus derselben Dom??ne verwenden . Wie gro?? der wert ist bestimmt ob die verwendete Begriffe zur derselben Dom??ne geh??ren.' : null}
                        />
                        </ListItem>
                    </List>
                        
                    </div>
                    <Cna importances={cnaImportances} cna_result={cna_result}/>
                </CardContent>
            </Card>
            
            </Paper>
            <Paper className={classes.pageContent}>
            <Card className={classes.root}>
                <CardHeader title="Vergleich der Schl??sselw??rter" />  
                <CardContent>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText
                                primary=""
                                secondary={true ? 'In diesem Teil werden deine Begriffe und ihre Association mit denen in der Musterl??sung verglichen. So kannst du sich ein Bild davon machen,'+
                                ' welche Begriffe von dir erwartet wurden und welche du verwendet hast.'+
                            'Wenn sich die von dir am h??ufigsten verwendeten Begriffe von denen der Musterl??sung unterscheiden, bedenken Sie, dass es sich m??glicherweise um Synonyme handelt. '+
                            'Wenn sie es nicht sind, dann unterscheiden sich deine Begriffe von der Begriffe der Musterl??sung.' : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary=""
                                secondary={true ? ' Au??erdem erkl??ren diese W??rter auch den Score der drei oben vorgestellten lexikalischen Dimensionen.'+ 
                                '(LEXICAL_OVERLAP: CONTENT_OVERLAP, LEXICAL_OVERLAP: TOPIC_OVERLAP, LEXICAL_OVERLAP: ARGUMENT_OVERLAP).': null}
                            />
                        </ListItem>
                    </List>
                    
                    <Keywords keywords_result={keywords_result}/>
                </CardContent>
            </Card>
            
            </Paper>
            <Paper className={classes.pageContent}>
            <Card className={classes.root}>
                <CardHeader title="Feedback zu Schreibf??higkeiten und mehr mit Hilfe von Text-Indizes von Readerbench" />
                <CardContent>
                <List dense={true}>
                        <ListItem>
                            <ListItemText
                                primary=""
                                secondary={true ? 'Die folgende Tabelle zeigt die Unterschiede zwischen Ihrem Text und der L??sung anhand verschiedener Anhaltspunkte,'+ 
                                'von denen die meisten mit deinem Schreibstil zu tun haben. Wenn Du dir die Tabelle ansiehst, wirst du Verbesserungsvorschl??ge finden' : null}
                            />
                        </ListItem>
                    </List>
                    <Compare compare_result={compare_result}/>
                </CardContent>
                
            </Card>
            
            </Paper>
            
            
        </>
        
    )
}