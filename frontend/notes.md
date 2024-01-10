 # notes regarding web dev including JavaScript, React, NodeJS, JSX, HTML, CSS

when initializing or setting up JavaScript make sure NodeJS is added to path.

use Shift + 1 + Enter to auto populate the start of an .html file


is line break in HTML
```html
<br>
```


tag identifiers, used to label elements you want JavaScript to be able to easily access

```html
<form id="identifier">
```

assigning an id to a entity created from inputs in the form

i.e. getting a vehicle data form:

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


```html
<!DOCTYPE html>
<html>
  <head>
    <title>This is a title</title>
  </head>
  <body>
    <p>Hello world!</p>
  </body>
</html>
```