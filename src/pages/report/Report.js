import React, { useState, useEffect } from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PageHeader from '../../components/PageHeader';
import { makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';


import Question from './Question'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    root: {
        '& > *': {
          borderBottom: 'unset',
        },
      }
}))


  
export default function Report({ name }){
    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
            fetch('http://137.226.232.75:32445/readerbench/getReportJson/'+ name, {
            method: 'POST',
          }).then(res => res.json()).then((result) =>{
            console.log(result)
              setData(result)  
              setIsLoaded(true)
          },
          (error) => {
            setIsLoaded(true)
            setData(error)
          }
          );
    }, []);
    try {
      return(
        <>
            <PageHeader 
                title={"Ihre Ergebnisse zur Übung mit der Name "+ data.topic}
                subtitle="Ihre Ergebnisse"
                icon={<PostAddIcon fontSize="large"/>}
            />
              {data.data.map((index)=>{
                return(
                      <Question question={index}/>
                )
              })} 
            
            
        </>
        
    )
      
    } catch (error) {
      return(
        <>
           <div ><Box
                  p={2}
                  position="absolute"
                  top={400}
                  left="50%"
                  zIndex="tooltip"
                >
                <CircularProgress />
                  Loading Page
                </Box>
            </div>
               
        </>
        
    )
      
    }
    
}