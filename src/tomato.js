#!/usr/bin/env node

const { exec } = require('child_process');
const figlet = require('figlet');
const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');

// Ensure the output directory exists
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Display ASCII art with the title "TOMATO"
figlet('TOMATO', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);

    const userInput = prompt('Please provide a sentence to convert: ');
    const language = prompt('Select target language (java/python/js): ');

    exec(`python src/gherkin_generator.py "${userInput}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Python script stderr: ${stderr}`);
            return;
        }

        // Output the Gherkin syntax
        console.log("Generated Gherkin syntax:\n", stdout);

        // Process Gherkin output and separate steps
        const gherkinSteps = stdout.trim().split(/(?= Given | When | Then )/).map(step => step.trim());

        let stepDefinition = '';

        // Generate step definitions based on selected language
        if (language === 'python') {
            let pythonTemplate = fs.readFileSync('src/templates/python_step_definition.txt', 'utf-8');

            gherkinSteps.forEach(step => {
                let stepType = '';
                if (step.startsWith('Given')) stepType = 'given';
                else if (step.startsWith('When')) stepType = 'when';
                else if (step.startsWith('Then')) stepType = 'then';

                let specificStepDefinition = pythonTemplate
                    .replace(`@${stepType}('{step}')`, `@${stepType}('${step.slice(stepType.length + 1).trim()}')`)
                    .replace(`def ${stepType}_step(context)`, `def ${stepType}_${stepType}Action(context)`);

                stepDefinition += specificStepDefinition + '\n\n';
            });
        } else if (language === 'java') {
            stepDefinition = `
import io.cucumber.java.en.*;

public class StepDefinitions {
`;

            gherkinSteps.forEach(step => {
                if (step.startsWith('Given')) {
                    stepDefinition += `
    @Given("${step.slice(6)}")
    public void givenStep() {
        // Code for setup
    }
`;
                } else if (step.startsWith('When')) {
                    stepDefinition += `
    @When("${step.slice(5)}")
    public void whenAction() {
        // Code for action
    }
`;
                } else if (step.startsWith('Then')) {
                    stepDefinition += `
    @Then("${step.slice(5)}")
    public void thenResult() {
        // Code for verification
    }
`;
                }
            });
            stepDefinition += `}\n`;
        } else if (language === 'js') {
            stepDefinition = `const { Given, When, Then } = require('cucumber');\n\n`;

            gherkinSteps.forEach(step => {
                if (step.startsWith('Given')) {
                    stepDefinition += `Given('${step.slice(6).trim()}', function () {\n    // Code for setup\n});\n\n`;
                } else if (step.startsWith('When')) {
                    stepDefinition += `When('${step.slice(5).trim()}', function () {\n    // Code for action\n});\n\n`;
                } else if (step.startsWith('Then')) {
                    stepDefinition += `Then('${step.slice(5).trim()}', function () {\n    // Code for verification\n});\n\n`;
                }
            });
        } else {
            stepDefinition = `// Generated step definitions for ${language} are not yet implemented.`;
        }

        console.log(`Generated Step Definition in ${language}:\n`);
        console.log(stepDefinition);

        // Write the generated Gherkin steps to a file in the output directory
        fs.writeFileSync(path.join(outputDir, 'gherkin.feature'), stepDefinition, 'utf8');

        // Commit the newly created feature file
        gitCommitFeatureFile();
    });
});

const gitCommitFeatureFile = () => {
    exec('git add src/output/gherkin.feature && git commit -m "Auto-commit: New feature file generated"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Git commit error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Git commit stderr: ${stderr}`);
            return;
        }
        console.log("Feature file committed to version control.");
    });
};
