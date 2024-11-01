Feature: Sample test for CI

  Scenario: Test the login functionality
    Given a user logs in
    When the user enters valid credentials
    Then the user is granted access
