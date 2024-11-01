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

        // Gherkin output from the Python script
        const gherkinSyntax = stdout.trim(); // Capture Gherkin output

        // Write the Gherkin syntax to gherkin.feature
        fs.writeFileSync(path.join(outputDir, 'gherkin.feature'), gherkinSyntax, 'utf8');

        // Process Gherkin output and separate steps
        const gherkinSteps = gherkinSyntax.split(/(?= Given | When | Then )/).map(step => step.trim());

        let stepDefinition = '';

        // Generate step definitions based on selected language
        if (language === 'java') {
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

            // Write the generated Step Definition to StepDefinitions.java
            fs.writeFileSync(path.join(outputDir, 'StepDefinitions.java'), stepDefinition, 'utf8');

        } else if (language === 'python') {
            stepDefinition = `from behave import given, when, then\n\n`;

            gherkinSteps.forEach(step => {
                if (step.startsWith('Given')) {
                    stepDefinition += `@given("${step.slice(6)}")\ndef given_step(context):\n    pass\n\n`;
                } else if (step.startsWith('When')) {
                    stepDefinition += `@when("${step.slice(5)}")\ndef when_action(context):\n    pass\n\n`;
                } else if (step.startsWith('Then')) {
                    stepDefinition += `@then("${step.slice(5)}")\ndef then_result(context):\n    pass\n\n`;
                }
            });

            // Write the generated Step Definition to StepDefinitions.py
            fs.writeFileSync(path.join(outputDir, 'StepDefinitions.py'), stepDefinition, 'utf8');

        } else if (language === 'js') {
            stepDefinition = `const { Given, When, Then } = require('cucumber');\n\n`;

            gherkinSteps.forEach(step => {
                if (step.startsWith('Given')) {
                    stepDefinition += `Given("${step.slice(6)}", function () {\n    // Code for setup\n});\n\n`;
                } else if (step.startsWith('When')) {
                    stepDefinition += `When("${step.slice(5)}", function () {\n    // Code for action\n});\n\n`;
                } else if (step.startsWith('Then')) {
                    stepDefinition += `Then("${step.slice(5)}", function () {\n    // Code for verification\n});\n\n`;
                }
            });

            // Write the generated Step Definition to StepDefinitions.js
            fs.writeFileSync(path.join(outputDir, 'StepDefinitions.js'), stepDefinition, 'utf8');
        }

        console.log(`Generated Gherkin syntax saved to ${outputDir}/gherkin.feature`);
        console.log(`Generated Step Definition saved to ${outputDir}/StepDefinitions.${language === 'java' ? 'java' : language === 'python' ? 'py' : 'js'}`);

        // Display generated Gherkin syntax and step definitions on the screen
        console.log("\nGenerated Gherkin syntax:\n");
        console.log(gherkinSyntax);
        console.log("\nGenerated Step Definition:\n");
        console.log(stepDefinition);

        // Commit the newly created feature file
        gitCommitFeatureFile();
    });
});

const gitCommitFeatureFile = () => {
    exec('git add src/output/gherkin.feature', (error, stdout, stderr) => {
        if (error) {
            console.error(`Git add error: ${error.message}`);
            return;
        }
        exec('git commit -m "Auto-commit: New feature file generated"', (error, stdout, stderr) => {
            if (error) {
                console.error(`Git commit error: ${error.message}`);
                return;
            }
            console.log("Feature file committed to version control.");
        });
    });
};
