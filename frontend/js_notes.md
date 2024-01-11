# Notes for JavaScript syntax

### JavaScript embedded to HTML

Alert is used to force a pop up window in the browser.

```JS
alert("Hello world!")
```

![example image](image.png)

or use following to return the url

```js
alert(location.hostname);
```

![example image](image-1.png)

<br>
<br>

Using it in embedded HTML (has to be the element before all other tags start closing). It is important to wrap the if condition in ( ) and the instructions to follow in curly brackets { }.

```html
<script>
	let((javascript = "good"));
	if (javascript === "good") {
		alert("js is good");
	}
</script>
```

This will output the math operation into the browser console.

```html
<script>
	let javascript = "good";
	if (javascript === "good") {
		alert("js is good");
	}

	console.log(10 + 31 - 1);
</script>
```

<br>

#### JavaScript syntax

_Encompasses the grammatical rules and structure governing the correct arrangement of symbols, keywords, and operators in JavaScript code, including the declaration of variables, defining functions, and other related constructs._

declaring a variable:

```js
let var1 = "john";
```

#### JavaScript functions & methods

_Includes defining functions, parameters, return values, function expressions, and the concept of scope. Methods involve creating and using functions associated with objects or classes, defining specific behaviors within an object-oriented context._

#### JavaScript control flow

_Covers concepts like if statements, switch statements, loops (for, while), and managing the flow of program execution._

#### Objects and Arrays:

_Explores working with objects and arrays, including creating, manipulating, and accessing properties and elements._

#### Error Handling:

Involves understanding and implementing error handling mechanisms, such as try-catch blocks.

#### DOM Manipulation:

_Focuses on interacting with the Document Object Model (DOM), including selecting elements, modifying content, and handling events._

#### Asynchronous JavaScript:

_Covers concepts like callbacks, Promises, and async/await for handling asynchronous operations._

#### Modules and Scope:

_Discusses the use of modules for organizing code and the concept of scope in JavaScript._

#### ES6+ Features:

_Highlights features introduced in ECMAScript 2015 (ES6) and later, such as arrow functions, template literals, and destructuring._

#### Regular Expressions:

_Introduces the use of regular expressions for pattern matching and string manipulation._

#### AJAX and Fetch API:

_Explores making asynchronous requests to servers using technologies like AJAX and the Fetch API._
