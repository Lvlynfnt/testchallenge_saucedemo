Feature: Saucedemo.com Test Scenarios
I want to log in to Saucedemo.com Webapp

Scenario: TC001 - Verify if User can log in with valid credentials

Given User access the Saucedemo Webapp 
And User enters valid credentials
| username | pw |
| standard_user | secret_sauce |
Then User able to sign in successfully
And User log out

Scenario: TC002 - Verify if User can log in with invalid credentials

Given User access the Saucedemo Webapp 
And User enters invalid credentials
| username | pw | message |
| locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out. |

Scenario: TC003 - Verify if User can add all products in the Cart

Given User access the Saucedemo Webapp 
And User enters valid credentials
| username | pw |
| standard_user | secret_sauce |
Then User add to cart all products available
And User view Cart
And Verify if all item descriptions display correct details on Your Cart page

Scenario: TC004 - Verify if User can add random single item in the Cart

Given User access the Saucedemo Webapp 
And User enters valid credentials
| username | pw |
| standard_user | secret_sauce |
Then User add random single item
And User view Cart
And Verify if the single item description displays correct details on Your Cart page

Scenario: TC005 - Verify if User can check out and place his order successfully
Given User access the Saucedemo Webapp 
And User enters valid credentials
| username | pw |
| standard_user | secret_sauce |
Then User add to cart all products available
And User view Cart
And User check out
And User enters Check out Information details
Then Verify if Checkout Overview details are corect
And Verify if Amount computation are correct
Then User successfully made the order
And User go back to the Home page 