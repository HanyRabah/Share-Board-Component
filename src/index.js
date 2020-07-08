import './inputTag.less';

/**
 * @const EMAIL_REG
 */
const EMAIL_REG = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

/**
 * @const ENTER_KEY
 */
const ENTER_KEY = "Enter";

/**
 * Validates email address.
 *
 * @param {String} value
 * @returns {Boolean}
 */
function isValid(value) {
  return EMAIL_REG.test(value.toLowerCase());
}

/**
 * Creates dom element.
 *
 * @param {String} tag
 * @param {Object} attributes
 * @returns {HTMLElement}
 */
 function createElement(tag, attributes) {
  const element = document.createElement(tag);

  for (let key in attributes) {
    if (key === "text") {
      element.appendChild(document.createTextNode(attributes[key]));
    } else {
      element[key] = attributes[key];
    }
  }

  return element;
}

/**
 * Create tag element with label and close button.
 *
 * @param {String} value
 * @returns {HTMLElement}
 */
function createTagElement(value) {
  const el = createElement("span", { className: "tag-item" });
  if (!isValid(value)) {
    el.classList.add("tag-item__invalid");
  }

  const label = createElement("span", {
    className: "tag-item__label",
    text: value,
  });

  const closeButtonEl = createElement("button", {
    type: "button",
    title: "Remove",
    className: "tag-item__close-button",
  });

  closeButtonEl.appendChild(document.createTextNode("✕"));

  el.appendChild(label);
  el.appendChild(closeButtonEl);

  return el;
}

/**
 * @class TagInput creates tagged input element with some awesome features.
 * @param {HTMLElement} element
 * @param {Object} options
 */
export default class TagInput {
  constructor(element, options = { placeholder: "add more people..." }) {
    if (typeof window === 'undefined') {
			throw new TypeError(
				'This plugin is only works in browser',
			);
    }
    
    this.element = element;
    this.options = options;
    this.data = this.options.data || [];

    if (!(element instanceof HTMLElement)) {
			throw new TypeError(`HTMLElement expected, ${element} given`);
		}
    
    this.inputElement = createElement("input", {
      className: "tag-input",
      placeholder: options.placeholder,
    });

    this.element.className = "tag-wrapper"
    this.element.append(this.inputElement);
    
    this.addEventListeners();

    if(this.data.length > 0){
      this.data.forEach(element => {
        this.createTagElement(element);
      });
    }
  }

  get emailCount() {
    return this.data.length;
  }

  addEventListeners() {
    this.element.addEventListener("click", this.handleTagInputClick);
    this.inputElement.addEventListener("keypress", this.handleInputKeypress);
    this.inputElement.addEventListener("input", this.handleInputInput);
    this.inputElement.addEventListener("blur", this.handleInputBlur);
  }

  handleTagInputClick = (event) => {
    this.inputElement.focus();

    this.removeTag(event);
  };

  removeTag({ target }) {
    if (!target.matches("button[type=button]")) {
      return null;
    }

    const tag = target.closest(".tag-item");
    this.data = this.data.filter((i) => {
      return i !== tag.firstChild.textContent

    });
    
    tag.remove();
  }

  handleInputKeypress = ({ currentTarget }) => {
    // check if keypress not Enter then return
    if (event.key !== ENTER_KEY) {
      return null;
    }
    // if enter key pressed then check if input is valid if not clear the field
    if(!this.validate(currentTarget.value)) {
      this.inputElement.value = "";
      // TODO: tell the user what happend by adding it to the UI
      throw 'item already exist or length less than 3 characters';
    }

    this.createTagElement(this.inputElement.value);
  };

  handleInputBlur = ({ currentTarget }) => {
    if (!this.validate(currentTarget.value)) {
      return null;
    }

    this.createTagElement(this.inputElement.value);
  };

  // @TODO: fix this naming
  handleInputInput = () => {
    const value = this.inputElement.value.split(",")

    if (value.length > 1) {
      value.filter(item => item != '')
      .forEach((tag) => {
        this.validate(tag)
        this.createTagElement(tag);
      })
    }
  };

  createTagElement( value ) {
    const tagEl = createTagElement(value);

    this.data.push(value);
    this.element.insertBefore(tagEl, this.inputElement);
    this.inputElement.value = "";
    this.inputElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  validate( value ) {
    const hasValidLength = value.length >= 3;
    const isExists = this.data.some((i) => i === value);

    return hasValidLength && !isExists;
  }
}
