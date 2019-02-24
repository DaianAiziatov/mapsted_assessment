## MAPSTED Test Case #7

### INPUT:
The application should receive as an input a string of values separated by comma (the values could be strings or numbers)

#### OUTPUT:
The application shows to the user all the sorting steps (i.e., it should display, in order, the sequence of changes made to the input string or numbers).
For example, suppose our input is: “5, 3, 7, 9, 6”. One possible set of outputs, in order, might be:

- 5, 3, 7, 9, 6
- 3, 5, 7, 9, 6
- 3, 5, 6, 7, 9

### LIMITS:
- Input size is 1 to 500 values.
- Numeric values are integer size.
- String values are up to 10 characters long.

## Solution

1. Client web page has been done by React framework.
2. Serverside is implemented by C# core

API accepts POST to /api/sort with JSON in body with format:

``
{
  userInput: "",
  sortType: "bubble/quick",
  valuesType: "int/double/string"
}
``

## Demo

Give server some time to wake up.

[DEPLOYED VERSION ON HEROKU](https://mapsted-assessment.herokuapp.com)

