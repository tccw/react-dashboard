import React from "react";
import Chart from "react-google-charts";

// https://developers.google.com/chart/interactive/docs/gallery/calendar
// https://cal-heatmap.com/
export const CalendarGraphItem = (props) => {
    const {data} = props;
    return (<Chart
            width={1000}
            height={200}
            chartType="Calendar"
            loader={<div>Loading Chart</div>}
            data = {data}
            options={{
                title: 'Person Counts'
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    )
}