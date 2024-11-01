const { Given, When, Then } = require('cucumber');

public class StepDefinitions {
    @Given("{step}") // Template placeholder
    public void givenStep() {
        // Code for setup
    }

    @When("{step}") // Template placeholder
    public void whenAction() {
        // Code for action
    }

    @Then("{step}") // Template placeholder
    public void thenResult() {
        // Code for verification
    }
}
