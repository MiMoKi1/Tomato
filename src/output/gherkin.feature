from behave import given, when, then

# Example function for generating Gherkin syntax
def generate_gherkin():
    gherkin_content = "Given the user logs in to the system\n"  # Replace this with your generated content
    
    # Write to gherkin.feature with LF line endings
    with open('src/output/gherkin.feature', 'w', newline='\n') as f:
        f.write(gherkin_content)

@given('the user logs in to the system')
def given_givenAction(context):
    # Code for setup
    generate_gherkin()  # Call the function to generate Gherkin file
    
@when('{step}')
def when_action(context):
    # Code for action

@then('{step}')
def then_result(context):
    # Code for verification


