# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The intent of the code is to do this:

- When there is no input, use the partition key as the default output
- The input can be:
  - Case 1: An object with `partitionKey` as the output key
  - Case 2: Any other input which is then stringified and hashed.
- The output will always be a string. For `Case 1` above, any non-strings are converted to a string, except for a falsy value.
  > Quite possibly there should be an error thrown here when anything other than an integer is converted to a string.
- For any of the options, if the output is greater than the length, then it is hashed again.
  > It feels like this was trying to solve a different problem, which is specifically to hash the input if it was anything other than `Case 1`. I would want to validate the intent, and I am going to assume this is the case.

I avoid `let` definitions as much as possible.
