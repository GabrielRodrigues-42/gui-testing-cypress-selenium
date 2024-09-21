const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('shipping methods', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it('change amount of fashion web store to fedex', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();

    // Type in value input to search for specify shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('fedex');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last shipping method
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Type 9 in amount field of fashion web store
    const inputAmount = await driver.findElement(By.id('sylius_shipping_method_configuration_FASHION_WEB_amount'));
    inputAmount.click();
    inputAmount.clear();
    inputAmount.sendKeys('9');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that shipping method has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipping method has been successfully updated.'));
  });

  it('test case 2: Change position of FedEx', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();
    // Type in value input to search for specify shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('fedex');
    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Click in edit of the last shipping method
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();
    // Type 0 in position field of fashion web store
    const inputAmount = await driver.findElement(By.id('sylius_shipping_method_position'));
    inputAmount.click();
    inputAmount.clear();
    inputAmount.sendKeys('0');
    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Assert that shipping method has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipping method has been successfully updated.'));

  });

  it('test case 3: Create Successfully', async () => {
    /// Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();

    // Click on Create button
    await driver.findElement(By.css('*[class^="ui labeled icon button  primary "]')).click();

    // Type in 'code' for the Code field
    const codeInput = await driver.findElement(By.id('sylius_shipping_method_code'));
    codeInput.click();
    codeInput.clear();
    codeInput.sendKeys('code');

    // Type in 'Name' for the Name field
    const nameInput = await driver.findElement(By.id('sylius_shipping_method_translations_en_US_name'));
    nameInput.click();
    nameInput.clear();
    nameInput.sendKeys('Name');

    // Select 'Rest of the World' in Zone dropdown
    const zoneSelect = await driver.findElement(By.id('sylius_shipping_method_zone'));
    await zoneSelect.sendKeys('Rest of the World');

    // Type '9' in the amount field of fashion web store
    const amountInput = await driver.findElement(By.id('sylius_shipping_method_configuration_FASHION_WEB_amount'));
    amountInput.click();
    amountInput.clear();
    amountInput.sendKeys('9');

    // Click on Save changes button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that shipping method has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipping method has been successfully created.'));
  });

  it('test case 4: Create Duplicate', async () => {
    /// Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();

    // Click on Create button
    await driver.findElement(By.css('*[class^="ui labeled icon button  primary "]')).click();

    // Type in 'code' for the Code field
    const codeInput = await driver.findElement(By.id('sylius_shipping_method_code'));
    codeInput.click();
    codeInput.clear();
    codeInput.sendKeys('code');

    // Type in 'Name' for the Name field
    const nameInput = await driver.findElement(By.id('sylius_shipping_method_translations_en_US_name'));
    nameInput.click();
    nameInput.clear();
    nameInput.sendKeys('Name');

    // Select 'Rest of the World' in Zone dropdown
    const zoneSelect = await driver.findElement(By.id('sylius_shipping_method_zone'));
    await zoneSelect.sendKeys('Rest of the World');

    // Type '9' in the amount field of fashion web store
    const amountInput = await driver.findElement(By.id('sylius_shipping_method_configuration_FASHION_WEB_amount'));
    amountInput.click();
    amountInput.clear();
    amountInput.sendKeys('9');

    // Click on Save changes button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that shipping method has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });

  it.skip('test case 5: Edit and Create Rule', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();

    // Type in value input to search for specify shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('code');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last shipping method
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();
    // Click in Add rule of the shipping method
    const ruleButtons = await driver.findElements(By.css('*[class^="ui labeled icon button"]'));
    await ruleButtons[ruleButtons.length - 1].click();
    const typeSelect = await driver.findElement(By.id('sylius_shipping_method_zone'));
    await typeSelect.sendKeys('Items total greater than or equal');
    console.log("3")
    // Type 9 in amount field of fashion web store
    await driver.sleep(1000)
    const inputAmount = await driver.findElement(By.name('sylius_shipping_method[rules][0][configuration][FASHION_WEB][amount]'));
    inputAmount.click();
    inputAmount.clear();
    inputAmount.sendKeys('100');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that shipping method has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipping method has been successfully updated.'));
  });

  it('test case 6: Delete Successfully', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();
    // Type in value input to search for specific shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('code');
    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Click in delete of the last shipping method
    const deleteButtons = await driver.findElements(By.css('*[class^="ui red labeled icon button"]'));
    await deleteButtons[deleteButtons.length - 1].click();
    // Confirm deletion
    const confirmButton = await driver.findElement(By.id('confirmation-button'));
    await confirmButton.click();
    // Assert that shipping method has been deleted
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipping method has been successfully deleted.'));
  });

  it('test case 7: Try to change amount of fashion web store to fedex with an invalid valor', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();

    // Type in value input to search for specify shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('fedex');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last shipping method
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Type 9 in amount field of fashion web store
    const inputAmount = await driver.findElement(By.id('sylius_shipping_method_configuration_FASHION_WEB_amount'));
    inputAmount.click();
    inputAmount.clear();
    await driver.sleep(1000);
    inputAmount.sendKeys('bakamitai');
    await driver.sleep(1000);

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Assert that shipping method has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });

  it('test case 8: Create Unsuccessfully due to missing valor', async () => {
    /// Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();

    // Click on Create button
    await driver.findElement(By.css('*[class^="ui labeled icon button  primary "]')).click();

    // Type in 'code' for the Code field
    const codeInput = await driver.findElement(By.id('sylius_shipping_method_code'));
    codeInput.click();
    codeInput.clear();
    codeInput.sendKeys('code');

    // Type in 'Name' for the Name field
    const nameInput = await driver.findElement(By.id('sylius_shipping_method_translations_en_US_name'));
    nameInput.click();
    nameInput.clear();
    nameInput.sendKeys('Name');

    // Select 'Rest of the World' in Zone dropdown
    const zoneSelect = await driver.findElement(By.id('sylius_shipping_method_zone'));
    await zoneSelect.sendKeys('Rest of the World');

    // Click on Save changes button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that shipping method has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });

  it('test case 9: Archive Successfully', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();
    // Type in value input to search for specific shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('ups');
    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Click in Archive of the last shipping method
    const archiveButtons = await driver.findElements(By.css('*[class^="ui brown labeled icon button"]'));
    await archiveButtons[archiveButtons.length - 1].click();
    // Confirm Archival
    const confirmButton = await driver.findElement(By.id('confirmation-button'));
    await confirmButton.click();
    // Assert that shipping method has been deleted
    assert(await driver.findElement(By.css("p:nth-child(2)")).getText() == "Shipping method has been successfully updated.")
    //const bodyText = await driver.findElement(By.tagName('body')).getText();
    //assert(bodyText.includes(' Shipping method has been successfully updated. '));
  });

  it('test case 10: Unarchive Successfully', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();
    // Select 'Rest of the World' in Zone dropdown
    const archivalSelect = await driver.findElement(By.id('criteria_archival'));
    await archivalSelect.sendKeys('Yes');
    // Type in value input to search for specific shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('ups');
    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Click in delete of the last shipping method
    const restoreButtons = await driver.findElements(By.css('*[class^="ui brown labeled icon button"]'));
    await restoreButtons[restoreButtons.length - 1].click();
    // Confirm deletion
    const confirmButton = await driver.findElement(By.id('confirmation-button'));
    await confirmButton.click();
    // Assert that shipping method has been deleted
    assert(await driver.findElement(By.css("p:nth-child(2)")).getText() == "Shipping method has been successfully updated.")
    //const bodyText = await driver.findElement(By.tagName('body')).getText();
    //assert(bodyText.includes(' Shipping method has been successfully updated. '));
  });

  it('test case 11: enable dhl_express', async () => {
    // Click in shipping methods in side menu
    await driver.findElement(By.linkText('Shipping methods')).click();

    // Type in value input to search for specify shipping method
    await driver.findElement(By.id('criteria_search_value')).sendKeys('dhl_express');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last shipping method
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Type 9 in amount field of fashion web store
    await driver.findElement(By.css(".toggle > .required")).click()


    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that shipping method has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipping method has been successfully updated.'));
  });

  

  // Implement the remaining test cases in a similar manner
});
