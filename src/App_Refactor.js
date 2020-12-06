import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {ChartItem} from "./ChartItem";
import Paper from "@material-ui/core/Paper";
import {CalendarGraphItem} from "./CalendarGraphItem";

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

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


class App extends Component {
    constructor(props) {
        super(props); // al react components with a constructor call super() first

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeWeek = this.onChangeWeek.bind(this);

        this.state = {
            fullYearProcessed: [],
            dailyProcessed: [],
            weeklyProcessed: []
        };
    }

    componentDidMount() {
        this.fetchYearDailySums();
        this.fetchSingleDayHourly();
    }

    onChangeDate() {
        this.fetchSingleDayHourly();
    }

    onChangeWeek() {
        this.fetchWeekAroundDate();
    }


    fetchYearDailySums() {
        fetch("http://localhost:9000/api/counts/full_year")
            .then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                let yearlyData = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Person Count' }]]
                let dates = res['dates'];
                let c_in = res['in_sum'];
                let c_out = res['out_sum'];

                for (let i = 1; i < dates.length; i++ ) {
                    yearlyData.push([new Date(dates[i]), c_in[i]]);
                }
                this.setState({fullYearProcessed: yearlyData});
            });
    }

    fetchSingleDayHourly(iso_date_string) {
        fetch("http://localhost:9000/api/counts/day/?date=" + iso_date_string)
            .then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                let dailyObj = {id: 0,
                    dataIn: res['count_in'],
                    dataOut: res['count_out'],
                    labels: res['labels'],
                    title: "Hourly Counts"};

                this.setState({dailyProcessed: dailyObj});
        });
    }

    fetchWeekAroundDate(iso_date_string) {
        fetch("http://localhost:9000/api/counts/week/?date=" + iso_date_string)
            .then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                
            })
    }

    
    render() {
        return (
                <div>
                    <h1 align={'center'}>Store Visitor Count Dashboard</h1>
                    <Grid container spacing={2} direction={'row'} alignItems={'baseline'}>
                        <Grid item xs={6}>
                            <ChartItem key={this.state.dailyProcessed.id} {...this.state.dailyProcessed}/>
                        </Grid>
                        <Grid>
                            <ChartItem key={this.state.weeklyProcessed.id} {...this.state.weeklyProcessed}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                {/*<CalendarGraphItem className={"flex-col-scroll"} data={yearlyData} />*/}
                                <CalendarGraphItem className={"flex-col-scroll"} data={this.state.fullYearProcessed} />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
        )
    }
}

export default App;

// render() {
//     return (
//         <div>
//             <div>
//                 <h1>{this.state.apiResponse}</h1>
//             </div>
//             <Grid container spacing={2}
//                   direction={'row'}
//                   alignItems={'baseline'}>{datasets.map((data) =>{
//                 return <ChartItem key={data.id} {...data}/>
//             })}
//                 <Grid item xs={12}>
//                     <Paper>
//                         <CalendarGraphItem className={"flex-col-scroll"} data={yearlyData} />
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }