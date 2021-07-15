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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))
function generateData(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
    var r= 4

    series.push([x, y, z, r]);
    baseval += 86400000;
    i++;
  }
  return series;
}
function data (source, target, ) {
    
}

export default function CnaGraph({importances,  cna_result }){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dimension, setdimension] = useState({source:'Document 1', target:'Document 2'});

  
  const handleChange1 = (event) => {
    setdimension(event.target.value);
  };

  
  console.log(cna_result)
  try {
    
    var edges = cna_result.data.edges
    var index = edges.find(e => (e.source == dimension.source && e.target == dimension.target))

    var filtered = {weights:index.types.map((type) =>{
      return type.weight*100
    }),
    labels:index.types.map((type) =>{
      return type.name
    })}

    

    var sourceChildren=importances.find(e => e.name == dimension.source)
    var targetChildren=importances.find(e => e.name == dimension.target)
    
    
    var state = {
          
      series: filtered.weights,
      options: {
        chart: {
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: filtered.labels,
        legend: {
          show: true,
          floating: true,
          fontSize: '12px',
          position: 'left',
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 3
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
                show: false
            }
          }
        }]
      },
    
    
    };
          
     
    return (
      <>
      <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="student">Dimension </InputLabel>
                <Select
                labelId="student"
                  value={dimension}
                  input={<Input/>}
                  onChange={handleChange1}
                >
                {edges.map((edge) =>{
                  return <MenuItem value={{source:edge.source, target:edge.target}}>{edge.source + " mit " + edge.target}</MenuItem>
                })}
                  
                </Select>
              </FormControl>

         
      </div>
      <div id="chart">
        <ReactApexChart  options={state.options} series={state.series} type="radialBar" height={390} />
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{dimension.source+ " hat die Wichtigkeitgrag " + sourceChildren.importance}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {sourceChildren.value}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>{dimension.target+ " hat die Wichtigkeitgrag " + targetChildren.importance}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {targetChildren.value}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
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


