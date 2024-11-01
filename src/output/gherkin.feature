from behave import given, when, then

@given('the user logs in to the system')
def given_givenAction(context):
    # Code for setup

@when('{step}')
def when_action(context):
    # Code for action

@then('{step}')
def then_result(context):
    # Code for verification


