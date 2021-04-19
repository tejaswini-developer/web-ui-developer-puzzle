import { $,$$, browser, ExpectedConditions } from 'protractor';
import {expect} from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  it('Then: I should see snackbar to undo adding to readlist', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    
    const form = await $('form');
    const input = await $('input[type="search"]');

    await input.sendKeys('java');

    
    let addToReadingList = await $$('[data-testing="add-book-to-readinglist"]')

    const undoAction = await $(".mat-snack-bar-container .mat-button-wrapper")
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');

   
    await addToReadingList[0].click();
    browser.waitForAngularEnabled(false);
    
    // Verify book is available back in search results after undo adding book to reading list ['want to read' button should be enabled]
    browser.wait(await ExpectedConditions.visibilityOf(undoAction), 4000);
    await undoAction.click();
    browser.waitForAngularEnabled(true);
    
    addToReadingList = await $$('[data-testing="add-book-to-readinglist"]');

    browser.wait(ExpectedConditions.elementToBeClickable(addToReadingList[0]), 2000);
  });

  it('Then: I should see snackbar to undo removing from readlist', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    
    const form = await $('form');
    const input = await $('input[type="search"]');

    await input.sendKeys('java');

    
    let addToReadingList = await $$('[data-testing="add-book-to-readinglist"]');

    const firstbookTitle = await $$('[data-testing="book-title"]');

    const undoAction = await $(".mat-snack-bar-container .mat-button-wrapper")
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');

    const text = await firstbookTitle[0].getText();

   
    await addToReadingList[0].click();
    browser.waitForAngularEnabled(false);

    await readingListToggle.click();
    browser.sleep(1000);
    
    // Verify book's 'want to read' button should be disabled, when the book removal from reading List is undone 
    const readingListBookTitle = await $$('[data-testing="reading-list-book-title"]');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        readingListBookTitle[0],
        text)
    );

    const removeFromReadingList = await $$('[data-testing="remove-from-readingList"]');
    await removeFromReadingList[0].click();
    browser.waitForAngularEnabled(false);

   
    browser.wait(await ExpectedConditions.visibilityOf(undoAction), 4000);
    await undoAction.click();
    browser.waitForAngularEnabled(true);
    await browser.sleep(1000);
    
    addToReadingList = await $$('[data-testing="add-book-to-readinglist"]');

    await browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(addToReadingList[0])), 2000);
  });
 
});
