var fs = require('fs')
var readline = require('readline')

const rl = readline.createInterface({
    input: fs.createReadStream('w_data.dat')
});

var dataArr = []

rl.on('line', (line) => {
    // Potentially extracts day, minimum temperature, and maximum temperature from each line

    // Split lines on space delimiter and remove empty strings
    let lineData = line.split(' ').filter(function (x) {
        return x != ''
    });

    let day;
    let maxTemp;
    let minTemp;

    for (let i = 0; i < lineData.length; i++) {

        // To clean the numbers:
        let potential = parseInt(lineData[i].replace(/[^0-9]/, ''))

        /* Column 0: Day; Column 1: Max Temperature; Column 2: Minimum Temperature */
        if (i === 0) {
            day = potential
        }
        if (i === 1) {
            maxTemp = potential
        }
        if (i === 2) {
            minTemp = potential
        }
    }

    let dayObj = {
        day: day,
        maxTemp: maxTemp,
        minTemp: minTemp,
        spread: maxTemp - minTemp
    }

    if (!isNaN(dayObj.day) && dayObj.minTemp !== undefined && dayObj.maxTemp !== undefined) {
        dataArr.push(dayObj)
    }

})

rl.on('close', () => {
    // Finds the day with the minimum temperature spread, after the readstream closes

    let minSpread = dataArr[0].spread
    let minSpreadDay;

    for (let i = 0; i < dataArr.length; i++) {

        let daysSpread = dataArr[i].spread
        if (daysSpread < minSpread) {
            minSpread = daysSpread
            minSpreadDay = dataArr[i].day
        }

        if (dataArr[i].day === 30) {
            break;
        }
    }

    console.log("Day " + minSpreadDay + " of the month has the smallest temperature spread (with a spread of " + minSpread + ").")

})