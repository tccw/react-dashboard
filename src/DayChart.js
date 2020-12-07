import {ChartItem} from "./ChartItem";
import React, {Component} from "react";
import {Button} from "@material-ui/core";


class DayChart extends Component {
    constructor(props) {
        super();
        this.state = {
            dailyProcessed: [],
            currentDate: new Date("2012-02-06T08:00:00.000Z")
        };
    }
    
    componentDidMount() {
        this.fetchSingleDayHourly(this.state.currentDate.toISOString().substr(0,10));
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
                    title: `Hourly Counts (${this.state.currentDate.toISOString().substr(0,10)})`};
                let result = [];
                result.push(hourlySingleDay);
                this.setState({dailyProcessed: result} );
            });
    }

    render() {
        return (
            <div>
            {this.state.dailyProcessed.map((data) => {
                return (
                    <ChartItem key={data.id} {...data}/>
                )
            })}
                <Button onClick={() => {
                    let tmp_date = this.state.currentDate;
                    tmp_date.setDate(tmp_date.getDate() - 1)
                    this.fetchSingleDayHourly(tmp_date.toISOString().substr(0,10));
                }} variant={'outlined'}>PREV DAY</Button>
                <Button onClick={() => {
                    let tmp_date = this.state.currentDate;
                    tmp_date.setDate(tmp_date.getDate() + 1)
                    this.fetchSingleDayHourly(tmp_date.toISOString().substr(0,10));
                }} variant={'outlined'}>NEXT DAY</Button>
            </div>
        )
    }
}

export default DayChart;