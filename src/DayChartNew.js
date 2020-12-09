import {ChartItem} from "./ChartItem";
import React, {useState, useEffect} from "react";
import {Button} from "@material-ui/core";

const initial_state = {
    id: 0,
    dataIn: [1],
    dataOut: [2],
    labels: ['1:00'],
    title: 'g'
}

// https://stackoverflow.com/questions/53219113/where-can-i-make-api-call-with-hooks-in-react
function DayChartNew(props){

    const [dailyProcessed, setDailyProcessed] = useState(initial_state);
    const [currentDate, setCurrentDate] = useState(new Date("2012-02-06T08:00:00.000Z"));

    const getPreviousDay = () => {
        setCurrentDate(new Date(currentDate).getDate() - 1);
    }

    const getNextDay = () =>{
        setCurrentDate(currentDate.getDate());
    }

    /* /api/counts/day/{date} */
    useEffect(() => {
        fetch(`http://localhost:9000/api/counts/day/${currentDate.toISOString().substr(0,10)}`)
            .then(res => res.json())
            .then(res => {
                let hourlySingleDay = {id: 0,
                    dataIn: res["count_in"],
                    dataOut: res["count_out"],
                    labels: res["labels"],
                    title: `Hourly Counts (${currentDate.toISOString().substr(0,10)})`};
                let result = [];
                result.push(hourlySingleDay);
                console.log('huh')
                setDailyProcessed(result);
            });
    });


        return (
            <div>
                <ChartItem key={dailyProcessed.id} {...dailyProcessed}/>
                <Button onClick={getPreviousDay} variant={'outlined'}>PREV DAY</Button>
                <Button onClick={getNextDay} variant={'outlined'}>NEXT DAY</Button>
            </div>
        )

}

export default DayChartNew;