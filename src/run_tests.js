#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Path to the feature file
const featureFile = path.join(__dirname, 'src', 'output', 'gherkin.feature');

// Command to run Cucumber
const command = `npx cucumber-js ${featureFile}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing tests: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Cucumber stderr: ${stderr}`);
        return;
    }
    console.log(`Test Results:\n${stdout}`);
});
