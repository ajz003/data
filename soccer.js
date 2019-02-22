var fs = require('fs')
var readline = require('readline')

const rl = readline.createInterface({
    input: fs.createReadStream('soccer.dat')
});

var dataArr = []

rl.on('line', (line) => {
    // Potentially extracts team name, 'for' score, and 'against' score from each line

    // Split lines on space delimiter and remove empty strings
    let lineData = line.split(' ').filter(function (x) {
        return x != ''
    });

    let scoreFor;
    let scoreAgainst;
    let teamName;

    for (let i = 0, j = 0; i < lineData.length; i++) {
        // To clean the numbers:
        let potential = parseInt(lineData[i].replace(/[^0-9]/, ''))

        if (i === 1) {
            teamName = lineData[i]
        }
        if (i === 6) {
            scoreFor = potential
        }
        if (i === 8) {
            scoreAgainst = potential
        }
    }

    let scoreObj = {
        teamName: teamName,
        scoreFor: scoreFor,
        scoreAgainst: scoreAgainst,
        spread: Math.abs(scoreFor - scoreAgainst)
    }

    if (scoreObj.teamName !== undefined && scoreObj.scoreFor !== undefined && scoreObj.scoreAgainst !== undefined) {
        dataArr.push(scoreObj)
    }

})

rl.on('close', () => {
    // Finds the team with the minimum temperature spread, after the readstream closes

    let minSpread = dataArr[0].spread
    let minSpreadTeam;

    for (let i = 0; i < dataArr.length; i++) {
        let teamsSpread = dataArr[i].spread
        if (teamsSpread < minSpread) {
            minSpread = teamsSpread
            minSpreadTeam = dataArr[i].teamName
        }
    }

    console.log(minSpreadTeam + " has the smallest difference in 'for' and 'against' goals (" + (minSpread) + ").")

})