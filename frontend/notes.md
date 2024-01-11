# notes regarding web dev including JavaScript, React, NodeJS, JSX, HTML, CSS

_if images are not available download md and convert to pdf_

---

when initializing or setting up JavaScript make sure NodeJS is added to path.

use Shift + 1 + Enter to auto populate the start of an .html file

<br/>

### Linebreak

how to do a linebreak

```html
<br />
```

### Identifier (ID) and Form tags

identifier tags are used to label elements you want JavaScript to be able to easily access, it needs to be unique across the page. you can use them to create a class almost within a form

```html
<form id="identifier"></form>
```

assigning an id to a form. which can be populated further later down the line

i.e. getting vehicle data using a form:

```html
<form id="vehicle-form" action="/tutorial/action.html">
	<fieldset>
		<legend>Vehicle Details</legend>

		<input type="text" placeholder="Make" name="make" /><br /><br />
		<input type="text" placeholder="Model" name="model" /><br /><br />
		<input type="text" placeholder="Age" name="age" /><br /><br />

		<button type="submit">Submit</button>
	</fieldset>
</form>
```

which would look like

<form id="vehicle-form" action="/tutorial/action.html">
  <fieldset>
    <legend>Vehicle Details</legend>
    <input type="text" placeholder="Make" name="make"><br /><br />
    <input type="text" placeholder="Model" name="model"><br /><br />
    <input type="text" placeholder="Age" name="age"><br /><br />
    <button type="submit">Submit</button>
  </fieldset>
</form>

this creates a form, which has id vehicle-form, that takes inputs and can be used easily with js to fetch from it

the action="/tutorial/action.html" is used to direct where the form data will be forwarded to, i.e. backend for processing or server for storage

there are plenty of different input types available, the default being text
https://www.w3schools.com/tags/tag_input.asp

they are referred by #id_name in CSS, i.e:

```css
#vehicle-form{
  ~
  ~
  ~
}
```

### OnClick

you can send signals in html using the onclick event attribute, you can specify the path and the action to do, i.e.

```html
<input type="button" value="2" onclick="calc.display.value+='2'" />
```

### CSS alignments

#### Flex

when using flex displays you can control the horizontal and vertical:

```css
/* horizontal */
target_entity {
	justify-content: center;
}

/* vertical */
target_entity {
	aligned-items: center;
}
```

it does matter on the element being used, for example inputs within myform are text data types, so you need to use:

```
/* alternative */
target_entity{
  text-align: center
}
```

## Course Based Notes

To access JavaScript Developer Console:
`CTRL + SHIFT + J`

Javascript is a programming language that is:

- high-level language
  - Do not need to worry about memory management or lower level interaction with system
- object-oriented
  - uses objects to store and created data types as well as relevant functions
- multi-paradigm
  - it allows the use of different styles of programming, such as imperative and functional programming

<br/>

Web development has 3 main areas

- content
  - the html aspect, acting as nouns
- presentation
  - the css aspect acting as adjectives
- programming language: building web applications
  - the JS (in this case) acting as the verbs

<br/>

JavaScript is very dynamic, it can be used on dynamic web apps as well as web servers. It can also be used to create native mobile and desktop apps.

<br>

Using it in embedded HTML (has to be the element before all other tags start closing). It is important to wrap the if condition in ( ) and the instructions to follow in curly brackets { }.

```html
<script>
	let((javascript = "good"));
	if (javascript === "good") {
		alert("js is good");
	}
	console.log(5 + 5);
</script>
```

<br>

### Symbols

<u> Division </u>
using `&#247;` will give you &#247;
