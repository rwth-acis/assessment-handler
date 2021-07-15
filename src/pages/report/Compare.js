import React, { useState, useEffect } from 'react';
import { Paper,makeStyles, } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as d3 from 'd3';
import { Bar } from 'react-chartjs-2';


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


function Row({compare_result, row}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    try {
    return(
        <React.Fragment>
                        <TableRow className={classes.root}>
                            <TableCell>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.metric_id}
                            </TableCell>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.metric}</TableCell>
                            <TableCell align="right">{row.expert_metric}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box margin={1}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            Feedback
                                        </Typography>
                                        <Table size="small" aria-label="Compare">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Text</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                
                                                    <TableRow key={row.metric_id}>
                                                    <TableCell>{row.description}</TableCell>
                                                    </TableRow>
                                                
                                            </TableBody>
                                        </Table>
                                        
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                        </React.Fragment>
        
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
export default function Compare({ compare_result }){
    const classes = useStyles();
    console.log(compare_result)
   
    try {
        var res = compare_result.data.feedback.document
        const data = {
            labels: res.map(d => d.metric_id),
            datasets: [
              {
                label: 'Dein Score',
                data:  res.map(d => d.metric),
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Musterloeosung',
                data:  res.map(d => d.expert_metric),
                backgroundColor: 'rgb(54, 162, 235)',
              }
            ],
          };
          
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
        return (
            <>
                <Bar data={data} options={options} height={20} width={150} />
                <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Indiz</TableCell>
                        <TableCell>Bedeutung</TableCell>
                        <TableCell align="right">Dein Score</TableCell>
                        <TableCell align="right">Musterlösung</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {compare_result.data.feedback.document.map((row) => (
                        <Row compare_result={compare_result} row={row}/>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </>
          );
        
    } catch (error) {
        return(
            <>
               <div ><TableContainer component={Paper}>
                    <CircularProgress />
                      Loading Page Compare
                      </TableContainer>
                </div>
                   
            </>
            
        )
    }
    

    
}