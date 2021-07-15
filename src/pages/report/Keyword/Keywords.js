import React, { useRef,useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import * as d3 from 'd3';
import { HierarchyNode, treemap, tree, arc } from 'd3';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactApexChart from "react-apexcharts";
import Chart from 'react-apexcharts'
import Grid from '@material-ui/core/Grid';
import Graph from "react-graph-vis";
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    root: {
      width: 200,
    },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}))

function generateData(data,n){

  var nodes=[]
  var edges=[]
  data.nodeList.map((x)=>{
    nodes.push({
    id:x.displayName,
    value:x.degree,
    label:x.displayName})
  })
  nodes = nodes.sort((a, b) => (a.value > b.value) ? 1 : -1).slice(0,n)
  data.edgeList.map((x)=>{
    edges.push({
    from:x.sourceUri,
    value:x.score,
    to:x.targetUri})
  })
  return {
    nodes: nodes,
    edges:edges
  }
}
export default function Keywords({  keywords_result }){
  const classes = useStyles();
  const [n, setN] = useState(20);
  console.log(keywords_result)

  const handleChange = (event, newValue) => {
    setN(newValue);
  };
  try {
    const nodes=[]
    const edges =[]

    const graphExpert = generateData(keywords_result.expert.data,n);
    const graphStudent = generateData(keywords_result.student.data,n);
  
    const options =  {
      nodes: {
        shape: "dot",
        
      },
      edges: {
        color: "#429edb"
      },
      height: "500px",
      width: "400px"
    };
  
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
      }
    };  
     
    return (
      <>
      <div className={classes.root} justify = "center">
        <Typography id="discrete-slider" gutterBottom>
          Anzahl von wörter
        </Typography>
        <Slider
          value={n}
          onChange={handleChange}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
        />
      </div>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
            <Grid xs={6}  item>
            <Graph key={Math.random()} 
              graph={graphExpert}
              options={options}
              events={events}
              getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
            />
            </Grid>
            <Grid xs={6}  item>
            <Graph key={Math.random()} 
              graph={graphStudent}
              options={options}
              events={events}
              getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
            />
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
            <Grid xs={6}  item>
            
              <Typography variant="h6" >
                Ihre Text
              </Typography>
            </Grid>
            <Grid xs={6}  item>
              <Typography variant="h6" >
                Musterlösung
              </Typography>
            </Grid>
        </Grid>
      </Grid>
      
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


