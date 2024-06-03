Feature: User Management

    This feature allows the registration and management of users in each tenant

    Scenario: User created succesfully
    Given a future user provides an email "fakeemail@fake.dev"
    And a password "5&nh4f0r73"
    When the data is submitted
    Then the user is registered in the database
    And the password is hashed

    Scenario: Validation error in user creation
    Given a future user provides an email "fakeemailfake.dev"
    And a password "5&nh4f0r73"
    When the data is submitted
    Then a validation error is returned with status 400