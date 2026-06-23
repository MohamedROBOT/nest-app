Pipes have two typical use cases:

transformation: transform input data to the desired form (e.g., from string to integer)
validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception


The value parameter is the currently processed method argument (before it is received by the route handling method), and metadata is the currently processed method argument's metadata. The metadata object has these properties:

type ==> Indicates whether the argument is a body @Body(), query @Query(), param @Param(), or a custom parameter (read more here).
metatype ==> Provides the metatype of the argument, for example, String. Note: the value is undefined if you either omit a type declaration in the route handler method signature, or use vanilla JavaScript.
data ==> The string passed to the decorator, for example @Body('string'). It's undefined if you leave the decorator parenthesis empty.
