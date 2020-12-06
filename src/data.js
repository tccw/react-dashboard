import React from "react";

export const datasets = [{
        id: 0,
        dataIn:[8,0,9,0,2,13,38,96,207,304,555,701,1224,2066,1803,1604,1764,1302,985,582,190,5,3,4],
        dataOut:[2,2,2,0,4,12,53,77,245,430,670,811,1365,1857,2263,2061,1637,1282,1143,639,124,4,5,1],
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        title: "Hourly Counts - Saturday"
    },{
        id: 1,
        dataIn: [18094,19937,22110,25572,22937,24380,11848],
        dataOut: [11969,12712,14287,15629,13706,14510,8173],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        title: "Daily Counts - One Week"
    }
]


// required header for google calendar graph data
export let yearlyData = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Person Count' }]]
for (let i = 0; i < 365; i++) {
    let date = new Date(2019, 0,1)
    date.setDate(date.getDate() + i)
    let num = Math.sin(i) + (2 * Math.random()) * 1e3;
    yearlyData.push([date, Math.floor(num)]);
}