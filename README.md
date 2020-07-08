# Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [REquirements](#requirements)
* [Setup](#setup)
* [Library Usage](#library-usage)
* [Library API](#library-api)
* [Demo](#demo)


#General Info 

Building a multi tag input library to be able to use it in different projects

Email Tag get created by pressing Enter, entering comma, or by losing focus on the
input field. A Tag can be deleted when you click on the [x] icon.

css is injected in the head when the library file run so no need to include any external css files.

<b>Why rollup.js?</b> 
As this is a small piece of code, so rollup.js is good when creating library as I will not use a lot of features in webpack


#Technologies
 - ES6
 - Vanilla Javascript
 - babel
 - rollup.js
 - less
 - jest
 - npm


#Requirements

-   [x] Multiple component per page
-   [x] Pure javascript, no library dependencies
-   [x] Cross Browser support
-   [x] unit-tests


#Setup

install dependencies:

```sh
npm install
```

build library

```sh
npm run build
```

Run rollup watch to update the build when any change happen

```sh
npm run dev
```

Run test

```sh
npm run test
```


#Library Usage

```html
<body>
	<div id="emails-input"></div>
	<!-- include the library file  -->
	<script src='./library.min.js'></script>
	<!-- specify element and load the library will passing the element   -->
	<script>
		var tagInputEl = document.getElementById('emails-input');
		const tagInputClass = new EmailsInput(tagInputEl);
	</script>
</body>
```

passing options

```html
<body>
	<div id="emails-input"></div>
	<!-- include the library file  -->
	<script src='./library.min.js'></script>
	<!-- specify element and load the library will passing the element   -->
	
	<script>
		var tagInputEl = document.getElementById('emails-input');
		var myOptions = {
			placeholder: 'type in an email', 
			data: ['john@domain.com'], // prefills emails
		};
		const tagInputClass = new EmailsInput(tagInputEl);
	</script>
</body>
```

#Library API

### EmailEditor

```javascript
new EmailsInput(element: HTMLElement, options: object)
```

### EmailEditor with options

```javascript
new EmailsInput(divEl, {
	placeholder: 'add more people...',
	data: ['email@domain.name'],
});
```

## Methods

### emailCount()

This method get total number of emails in the input

```javascript

const tagInputClass = new EmailsInput(element: HTMLElement, options: object)

alert(tagInputClass.emailCount);
```

### createTagElement()

This method add new email.

```javascript
const tagInputClass = new EmailsInput(element: HTMLElement, options: object)

tagInputClass.createTagElement('mail@domain.com');

```

#Demo
