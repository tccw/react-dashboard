import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import {ChartItem} from "./ChartItem";
import {CalendarGraphItem} from "./CalendarGraphItem";
import {Button} from "@material-ui/core";

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


class App_Refactor extends Component {
    constructor(props) {
        super(props); // al react components with a constructor call super() first

        // this.onChangeDate = this.onChangeDate.bind(this);
        // this.onChangeWeek = this.onChangeWeek.bind(this);

        this.state = {
            fullYearProcessed: [],
            dailyProcessed: [],
            weeklyProcessed: [],
            currentDate: new Date("2012-02-06T08:00:00.000Z")
        };
    }

    componentDidMount() {
        this.fetchYearDailySums('2012');
        this.fetchSingleDayHourly(this.state.currentDate.toISOString().substr(0,10));
        this.fetchWeekAroundDate(this.state.currentDate.toISOString().substr(0.,10));
    }

    // function handleClick() {
    //     let tmp_date = this.state.currentDate;
    //     tmp_date.setDate(tmp_date.getDate() + 1)
    //     this.fetchSingleDayHourly(tmp_date.toISOString().substr(0,10));
    // }
    // onChangeDate() {
    //     this.fetchSingleDayHourly();
    // }
    //
    // onChangeWeek() {
    //     this.fetchWeekAroundDate();
    // }

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

    /* /api/counts/day/{date} */
    fetchSingleDayHourly(iso_date_string) {
        fetch("http://localhost:9000/api/counts/day/" + iso_date_string)
            .then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                let hourlySingleDay = {id: 0,
                    dataIn: res["count_in"],
                    dataOut: res["count_out"],
                    labels: res["labels"],
                    title: "Hourly Counts"};
                let result = [];
                result.push(hourlySingleDay);
                this.setState({dailyProcessed: result} );
        });
    }

    /* /api/counts/week/{date} */
    fetchWeekAroundDate(iso_date_string) {
        fetch("http://localhost:9000/api/counts/week/" + iso_date_string)
            .then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                let dailySingleWeek = {id: 1,
                    dataIn: res["count_in"],
                    dataOut: res["count_out"],
                    labels: res["labels"],
                    title: "Daily Counts"};
                let result = [];
                result.push(dailySingleWeek)
                this.setState({weeklyProcessed: result});
            }).then(() => console.log(this.state.weeklyProcessed));
    }

    // TODO: why are charts rendering on top of each other with each button click?
    render() {
        return (
                <div>
                    <h1 align={'center'}>Store Visitor Count Dashboard</h1>
                    <Grid container spacing={2} direction={'row'} alignItems={'baseline'}>
                        <Grid item xs={6}>
                            <Paper>
                                <Button onClick={() => {
                                    let tmp_date = this.state.currentDate;
                                    tmp_date.setDate(tmp_date.getDate() + 1)
                                    this.fetchSingleDayHourly(tmp_date.toISOString().substr(0,10));
                                }} variant={'outlined'}>NEXT DAY</Button>
                                {this.state.dailyProcessed.map((data) => {
                                    return (
                                        <ChartItem key={data.id} {...data}/>
                                    )
                                })}
                                {/*Why doesn't the below work?*/}
                                {/*<ChartItem key={this.state.dailyProcessed.id} {...this.state.dailyProcessed}/>*/}
                                {/*<Button onClick={this.onChangeDate()} variant={'outlined'}>PREV DAY</Button>*/}
                                {/*<Button onClick={this.onChangeDate()} variant={'outlined'}>NEXT DAY</Button>*/}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <Button onClick={()=> {
                                    let tmp_date = this.state.currentDate;
                                    tmp_date.setDate(tmp_date.getDate() + 7)
                                    this.fetchWeekAroundDate(tmp_date.toISOString().substr(0,10));
                                }} variant={'outlined'}>NEXT WEEK</Button>
                                {this.state.weeklyProcessed.map((data) => {
                                    return <ChartItem key={data.id} {...data}/>
                                })}
                                {/*<ChartItem key={this.state.weeklyProcessed.id} {...this.state.weeklyProcessed}/>*/}
                                {/*<Button onClick={this.onChangeDate()} variant={'outlined'}>PREV WEEK</Button>*/}
                                {/*<Button onClick={this.onChangeDate()} variant={'outlined'}>NEXT WEEK</Button>*/}
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

export default App_Refactor;

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