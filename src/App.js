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



class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: [], dailyResponse: []};
    }

    // callAPI() {
    //     fetch("http://localhost:9000/api/counts")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }))
    // }
    fetchYearDailySums() {
        fetch("http://localhost:9000/api/counts/year/2012")
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
                this.setState({apiResponse: yearlyData});
            });
    }

    fetchSingleDayHourly() {
        fetch("http://localhost:9000/api/counts/day/2012-05-01")
            .then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                let datasets = [];
                console.log(res['count_in']);
                let dialyObj = {id: 0,
                    dataIn: res['count_in'],
                    dataOut: res['count_out'],
                    labels: res['labels'],
                    title: "Hourly Counts"};
                let weeklyObj = {
                    id: 1,
                    dataIn: [18094,19937,22110,25572,22937,24380,11848],
                    dataOut: [11969,12712,14287,15629,13706,14510,8173],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    title: "Daily Counts - One Week"
                }
                datasets.push(dialyObj, weeklyObj);

                this.setState({dailyResponse: datasets});
        });
    }

    componentDidMount() {
        this.fetchYearDailySums();
        this.fetchSingleDayHourly()
    }
    
    render() {
        return (
                <div>
                    <h1 align={'center'}>Store Visitor Count Dashboard</h1>
                    <Grid container spacing={2}
                          direction={'row'}
                          alignItems={'baseline'}>{this.state.dailyResponse.map((data) =>{
                        return <ChartItem key={data.id} {...data}/>
                    })}
                        <Grid item xs={12}>
                            <Paper>
                                {/*<CalendarGraphItem className={"flex-col-scroll"} data={yearlyData} />*/}
                                <CalendarGraphItem className={"flex-col-scroll"} data={this.state.apiResponse} />
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