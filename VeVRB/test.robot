*** Settings ***
Library    SeleniumLibrary
Test Setup    Login
Test Teardown    Final Curtain   # Ensures the browser closes after each test case

*** Variables ***
${Login-URL}    http://localhost:9990/admin
${Browser}      Firefox

*** Test Cases ***
Valid Login
    [Setup]    None
    Open Sylius Browser
    Type In Username    sylius
    Type In Password    sylius
    Click Login
    Validate Entrance

Change Amount Of Fashion Web Store to FedEx
    Click Shipping Methods
    Search For Shipping Method    fedex
    Click Edit
    Update Field    9    sylius_shipping_method_configuration_FASHION_WEB_amount
    Click Save Changes
    Validate    Shipping method has been successfully updated.

Change Position of FedEx
    Click Shipping Methods
    Search For Shipping Method    fedex
    Click Edit
    Update Field    0    sylius_shipping_method_position
    Click Save Changes
    Validate    Shipping method has been successfully updated.
Create Shipping Method
    Click Shipping Methods
    Click Create
    Fill Necessary Fields
    Click Create Method
    Validate    Shipping method has been successfully created.
Create Duplicate Shipping Method
    Click Shipping Methods
    Click Create
    Fill Necessary Fields
    Click Create Method
    Validate    This form contains errors.
Edit and Create Rule
Delete Shipping Method
    Click Shipping Methods
    Search For Shipping Method    code
    Click Deletion
    Validate    Shipping method has been successfully deleted.
    
Change Amount Of Fashion Web Store With Invalid Valor
Create Unseccessfully Shipping Method
Archive Shipping Method
Unarchive Shipping Method

*** Keywords ***
Open Sylius Browser
    Open Browser    ${Login-URL}    ${Browser}
    Title Should Be    Sylius | Administration panel login

Type In Username
    [Arguments]    ${username}
    Input Text    id=_username    ${username}

Type In Password
    [Arguments]    ${password}
    Input Text    id=_password    ${password}

Click Login
    Click Button    css=.primary

Validate Entrance
    Title Should Be    Dashboard | Sylius

Login
    Open Browser    ${Login-URL}    ${Browser}
    Type In Username    sylius
    Type In Password    sylius
    Click Login
Click Shipping Methods
    Click Link    /admin/shipping-methods/
Search For Shipping Method
    [Arguments]    ${searchText}   
    Input Text    id=criteria_search_value    ${searchText}
    Click Button    css=.ui.blue.labeled.icon.button
Click Edit
    Click Element    xpath=(//*[contains(@class, 'ui labeled icon button ')])[last()]
    Wait Until Page Contains    Edit shipping method
Click Create
    Click Link    /admin/shipping-methods/new
Update Field
    [Arguments]    ${text}    ${field}
    Clear Element Text    ${field}
    Input Text    ${field}    ${text} 
Click Save Changes
    Click Button    id=sylius_save_changes_button
Click Create Method
    Click Button    css=*[class^="ui labeled icon primary button"]
Click Deletion
    ${deleteButtons}=    Get WebElements    css=*[class^="ui red labeled icon button"]
    Click Element    ${deleteButtons[-1]}
    Validate    Confirm your action
    ${confirmButtons}=    Get WebElements    id=confirmation-button
    Click Element    ${confirmButtons[-1]}
Validate
    [Arguments]    ${expectedMessage}
    Wait Until Page Contains    ${expectedMessage}
Fill Necessary Fields
    Update Field    code    sylius_shipping_method_code
    Update Field    name    sylius_shipping_method_translations_en_US_name
    Input Text    sylius_shipping_method_zone    Rest of the World    False
    Update Field    9    sylius_shipping_method_configuration_FASHION_WEB_amount
Final Curtain
    Delete All Cookies
    Close All Browsers



