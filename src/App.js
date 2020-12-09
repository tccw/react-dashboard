import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import {ChartItem} from "./ChartItem";
import {CalendarGraphItem} from "./CalendarGraphItem";
import {Button} from "@material-ui/core";
import DayChartOld from "./DayChartOld";
import DayChartNew from "./DayChartNew";
import WeekChart from "./WeekChart";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));


class App extends Component {
    constructor(props) {
        super(props); // al react components with a constructor call super() first

        this.state = {
            fullYearProcessed: [],
            dailyProcessed: [],
            weeklyProcessed: [],
            currentDate: new Date("2012-02-06T08:00:00.000Z")
        };
    }

    componentDidMount() {
        this.fetchYearDailySums('2012');
    }

    /* /api/counts/year/{year} */
    fetchYearDailySums(year) {
        fetch("http://localhost:9000/api/counts/year/" + year)
            .then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                let yearlyData = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Person Count' }]]
                let dates = res["dates"];
                let c_in = res["in_sum"];
                let c_out = res["out_sum"];

                for (let i = 0; i < dates.length; i++ ) {
                    yearlyData.push([new Date(dates[i] + 'T08:00:00.000Z'), c_in[i]]);
                }
                this.setState({fullYearProcessed: yearlyData});
            });
    }

    // TODO: why are charts rendering on top of each other with each button click?
    // https://github.com/chartjs/Chart.js/issues/920
    // https://www.xspdf.com/resolution/52736792.html
    // https://www.odoo.com/forum/help-1/how-to-solve-hover-issue-when-using-chart-js-163875
    // TODO Switch to Rechart. Chartjs not worth it.
    render() {
        return (
                <div>
                    <Grid container spacing={2} direction={'row'} alignItems={'baseline'}>
                        <Grid item xs={6}>
                            <Paper>
                                <DayChartOld/>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <WeekChart/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <CalendarGraphItem className={"flex-col-scroll"} data={this.state.fullYearProcessed} />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
        )
    }
}

export default App;
