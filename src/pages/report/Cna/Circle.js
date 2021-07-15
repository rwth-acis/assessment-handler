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
}))

export default function Circle({dimension1, edges }){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dimension1, setDimension1] = useState({source:'Document 1', target:'Document 2'});

  
  const handleChange1 = (event) => {
    setDimension1(event.target.value);
  };

  
  console.log(cna_result)
  try {
     
    var edges = cna_result.data.edges
    var index = edges.find(e => (e.source == dimension1.source && e.target == dimension1.target))

    var filtered = {weights:index.types.map((type) =>{
      return type.weight*100
    }),
    labels:index.types.map((type) =>{
      return type.name
    })}
        
      
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
      <div id="chart">
        <ReactApexChart  options={state.options} series={state.series} type="radialBar" height={390} />
      </div>
      </>
        
    )
    
  } catch (error) {
    return(
      <>
         <div >
              <CircularProgress />
                Loading Page
          </div>
             
      </>
      
  )
    
  }
  
}


