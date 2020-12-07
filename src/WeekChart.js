import {ChartItem} from "./ChartItem";
import React, {Component} from "react";
import {Button} from "@material-ui/core";


class WeekChart extends Component {
    constructor(props) {
        super();
        this.state = {
            weeklyProcessed: [],
            currentDate: new Date("2012-02-06T08:00:00.000Z")
        };
    }

    componentDidMount() {
        this.fetchWeekAroundDate(this.state.currentDate.toISOString().substr(0,10));
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
                    title: `Daily Counts (Week of ${res['start_date']})`};
                let result = [];
                result.push(dailySingleWeek)
                this.setState({weeklyProcessed: result});
            }).then(() => console.log(this.state.weeklyProcessed));
    }

    render() {
        return (
            <div>
                {this.state.weeklyProcessed.map((data) => {
                    return (
                        <ChartItem key={data.id} {...data}/>
                    )
                })}
                <Button onClick={()=> {
                    let tmp_date = this.state.currentDate;
                    tmp_date.setDate(tmp_date.getDate() - 7)
                    this.fetchWeekAroundDate(tmp_date.toISOString().substr(0,10));
                }} variant={'outlined'}>PREV WEEK</Button>
                <Button onClick={()=> {
                    let tmp_date = this.state.currentDate;
                    tmp_date.setDate(tmp_date.getDate() + 7)
                    this.fetchWeekAroundDate(tmp_date.toISOString().substr(0,10));
                }} variant={'outlined'}>NEXT WEEK</Button>
            </div>
        )
    }
}

export default WeekChart;