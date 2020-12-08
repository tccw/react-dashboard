import {ChartItem} from "./ChartItem";
import React, {Component} from "react";
import {Button} from "@material-ui/core";


class DayChartOld extends Component {
    // TODO decide if storing the date as a class variable is a bad idea
    currentDate = new Date("2012-02-06T08:00:00.000Z");

    constructor(props) {
        super();

        this.getPreviousDay = this.getPreviousDay.bind(this);
        this.getNextDay = this.getNextDay.bind(this);

        this.state = {
            dailyProcessed: [],
        };
    }
    
    componentDidMount() {
        this.fetchSingleDayHourly(this.currentDate.toISOString().substr(0,10));
    }


    /* TODO: render will be called twice here (once on state change for date, once of state change for
             dailyProcessed which is not ideal. Fix so this re-renders only once */


    /* /api/counts/day/{date} */
    fetchSingleDayHourly(iso_date_string) {
        fetch("http://localhost:9000/api/counts/day/" + iso_date_string)
            .then(res => res.json())
            .then(res => {
                let hourlySingleDay = {id: 0,
                    dataIn: res["count_in"],
                    dataOut: res["count_out"],
                    labels: res["labels"],
                    title: `Hourly Counts (${this.currentDate.toISOString().substr(0,10)})`};
                let result = [];
                result.push(hourlySingleDay);
                this.setState({dailyProcessed: result} );
            });
    }

    getPreviousDay = () => {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.fetchSingleDayHourly(this.currentDate.toISOString().substr(0,10));
    }

    getNextDay = () => {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.fetchSingleDayHourly(this.currentDate.toISOString().substr(0,10));
    }


    render() {
        return (
            <div>
            {this.state.dailyProcessed.map((data) => {
                return (
                    <ChartItem key={data.id} {...data}/>
                )
            })}
                <Button onClick={this.getPreviousDay} variant={'outlined'}>PREV DAY</Button>
                <Button onClick={this.getNextDay} variant={'outlined'}>NEXT DAY</Button>
            </div>
        )
    }
}

export default DayChartOld;