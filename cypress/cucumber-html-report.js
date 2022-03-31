const report = require("multiple-cucumber-html-reporter");
report.generate({
	jsonDir: "cypress/cucumber-json", // ** Path of .json file **//
	reportPath: "./cypress/cucumber-reports/",
    metadata:{
        browser: {
            name: 'chrome',
            version: '90'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Gamesys Test Challenge: Newspapers Login'},
            {label: 'Release', value: '1.0'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: 'Mar 16th 2022, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'Mar 16th 2022, 02:33 PM EST'}
        ]
    }
});