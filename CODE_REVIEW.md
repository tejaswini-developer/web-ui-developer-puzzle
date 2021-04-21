## Problems or Code Smells in App

1. While using 'ngFor' use 'trackBy' function to add unique identifier for each item. So that when a particular element changes Angular will know and make DOM chnages only for that element. -- implemented in reading-list & Book-search component - Performance improved compared to previous behaviour - implemented in chore/code-review branch
2. In Storage.service.ts, error handling is not implemented in readFromStorage() function while accessing an item in localstorage. Error should be caught and return meaning full message to user or initialize state accordingly. And also while setting item in local storage need to add error handling to catch storage full errors and display meaning full message to user
3. Publisher name for 'Eloquent JavaScript' book is displayed empty in search list. This gives poor user experience empty cases to be handled to display explanatory messages like 'Publisher not mentioned'.
4. In total-count component unused ngOnInit() hook is defined that caused uneccesary implementation of OnInit interface. It is good practise to get rid of unused code causing uneccesary implementing of interface.
5. Displaying books list in book-search component can be optimised by using async pipe which can automatically unsubscribe from the observable. -- implemented in chore/code-review branch
6. Explicit date format function not needed in book-search component we can make use of date pipe and format book published date -- implemented in chore/code-review branch

## Improvements

1. Project Structure needs to be improved, every folder intern has src folder in it, which is not necessary. Instead inside src folder we can have components organised.

## Accessibility

# Automated scan

1. Buttons do not have an acessible name, screen renders announce it as 'button', making it unsuable for users who rely on screen readers.
2. Background and foreground colors do not have a sufficient contrast ratio. Low-contrast text is difficult or imposible for many users to read -- modified Header text (Okreads and readingList) and test "Try searching for a topic, for example "JavaScript"" font color to black to improve contrast ratio.
3. Aria-label is not mentioned for "search" button icon and also in search input. Buttons and input controls and all other controls, custom controls should be given meaningful label via aria-label or aria-labelledby to ensure accessible experience -- added aria-label to buttons and input search box in code.
4. All the images should have alt text, to self describe images. In case, the images should be skipped by screen readers alt attribute can be assigned empty example: alt="" -- added alt for images in code.
5. Modified styling of "Java script" text to be highlighted as underlined, so that it stands out as link, differentiable from other text.

Initial Accessibility score with Lighthouse is 87. Implemented above changes and improved score to 100.

# Tests

1. 2 unit test cases were failing. They are fixed
2. No lint and e2e test cases failure

Executing e2e was failing in my Mac, fixed library. Now working fine.
