import React, {useEffect} from 'react';
import Chart from 'chart.js';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";
// import db from "./Database";

// Chart.default.pointStyle.;


export const ChartItem = (props) => {
    const {dataIn, dataOut, labels, id, title} = props;
    useEffect(() => {
        const ctx = document.getElementById(id);
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                offsetGridLines: false,
                datasets: [
                    {
                        label: "Count In",
                        data: dataIn,
                        borderWidth: 2,
                        borderColor: '#9c27b0',
                        fill: false,
                        pointStyle: 'rectRounded'
                    },
                    {
                        label: "Count Out",
                        data: dataOut,
                        borderWidth: 2,
                        borderColor: '#ffac33',
                        fill: false,
                        pointStyle: 'rectRounded'
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }],
                    yAxes: [
                        {
                            gridLines: {
                                display: false
                            },
                            // scaleLabel: {
                            //     display:true,
                            //     labelString: "Person Count",
                            //     fontSize: 15
                            //
                            // }
                        }
                    ]},
                    title: {
                        display: true,
                        text: title
                    },
                }
        });
    });
    // Return a grid item with paper styling
    return <Grid item xs={6}>
        <Paper>
            <canvas id={id} widht="400" height="200"></canvas>
            <Button onClick={alertPrevDay} variant={'outlined'}>PREV DAY</Button>
            <Button onClick={alertNextDay} variant={'outlined'}>NEXT DAY</Button>
        </Paper>
    </Grid>
}

const alertNextDay = () => {
    console.log('Something was logged');
}

const alertPrevDay = () => {
    alert('Next day!')
}
