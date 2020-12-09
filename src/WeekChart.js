import {ChartItem} from "./ChartItem";
import React, {Component} from "react";
import {Button} from "@material-ui/core";


class WeekChart extends Component {
    // TODO decide if storing the date as a class variable is a bad idea
    currentDate = new Date("2012-02-06T08:00:00.000Z");

    constructor(props) {
        super();

        this.getPreviousWeek = this.getPreviousWeek.bind(this);
        this.getNextWeek = this.getNextWeek.bind(this);

        this.state = {
            weeklyProcessed: [],
        };
    }

    componentDidMount() {
        this.fetchWeekAroundDate(this.currentDate.toISOString().substr(0,10));
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
            });
    }

    getPreviousWeek = () => {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.fetchWeekAroundDate(this.currentDate.toISOString().substr(0,10));
    }

    getNextWeek = () => {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.fetchWeekAroundDate(this.currentDate.toISOString().substr(0,10));
    }

    render() {
        return (
            <div>
                {this.state.weeklyProcessed.map((data) => {
                    return (
                        <ChartItem key={data.id} {...data}/>
                    )
                })}
                <Button onClick={this.getPreviousWeek} variant={'outlined'}>PREV WEEK</Button>
                <Button onClick={this.getNextWeek} variant={'outlined'}>NEXT WEEK</Button>
            </div>
        )
    }
}

export default WeekChart;