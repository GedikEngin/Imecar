 # notes regarding web dev including JavaScript, React, NodeJS, JSX, HTML, CSS

when initializing or setting up JavaScript make sure NodeJS is added to path.

use Shift + 1 + Enter to auto populate the start of an .html file


### Linebreak

how to do a linebreak
```html
<br>
```

### Identifier (ID) and Form tags
identifier tags are used to label elements you want JavaScript to be able to easily access, it needs to be unique across the page. you can use them to create a class almost within a form

```html
<form id="identifier">
```

assigning an id to a form. which can be populated further later down the line


i.e. getting vehicle data using a form:

```html
<form id="vehicle-form" action="/tutorial/action.html">
  <fieldset>
    <legend>Vehicle Details</legend>

    <input type="text" placeholder="Make" name="make"><br /><br />
    <input type="text" placeholder="Model" name="model"><br /><br />
    <input type="text" placeholder="Age" name="age"><br /><br />

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
<input type="button" value="2" onclick="calc.display.value+='2'">
```


### CSS alignmnets

#### Flex
when using flex displays you can control the horizontal and vertical:

```css
/* horizontal */
target_entity{
  justify-content: center
}

/* vertical */
target_entity{
  alignt-items: center
}
```

it does matter on the element being used, for example inputs within myform are text datatypes, so you need to use:
/* alternative */
target_entity{
  text-align: center
}
```


### Symbols
<u> Division </u>
using ```&#247;``` will give you &#247;