# Lab: Dice rolling

* In a file named `dice.js`:
    * Export a `roll()` function from the `dice.js` module.
    * By default the `roll()` function should return a random number between 1 and and the default number of 6.
    * The default number of 6 should be determined by a "private" variable outside of and not in the roll function named `defaultFaces`.
    * The `roll()` function should accept one optional parameter that is greater than or equal to the number and should use that as the upper bound if the number is passed in.

* In a file named `roll.js`:
    * Require the `dice.js` file.
    * Confirm that the `roll()` method works without arguments.
    * Confirm that `roll(1000)` works as expected.
    * Confirm that `defaultFaces` is not exported from the `dice.js` module.

