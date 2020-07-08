import { createElement, createTagElement } from '../src/index';
// TODO: fix export issue from library fro createElement

describe(".createElement", () => {
  it("should create an element with attribtues", () => {
    // 1. setup (e.g. generate data, use mock data, other setup)
    const name = "span";
    const attributes = { className: "tag", text: "hello" };

    // 2. call function/method
    const el = createElement(name, attributes);

    // 3. do assertsions or check
    expect(el.className).toEqual("tag");
    expect(el.tagName).toEqual("SPAN");
    expect(el.textContent).toEqual("hello");
  });

  it("should create an element with invalid attributes", () => {
    // 1. setup (e.g. generate data, use mock data, other setup)
    const name = "span";
    const attributes = { classNam: "tag", txt: "hello" };

    // 2. call function/method

    const el = createElement(name, attributes);

    // 3. do assertsions or check
    expect(el.className).toEqual("");
    expect(el.textContent).toEqual("");
    expect(el.tagName).toEqual("SPAN");
  });
});

describe(".createTagElement", () => {
  it("should create tag element with label and close button", () => {
    // 1. setup (e.g. generate data, use mock data, other setup)
    const value = "a@a.com";

    // 2. call function/method
    const el = createTagElement(value);

    // could cleanedup
    function handleClick() {
      this.dataset.value = "hany";
    }

    el.addEventListener("click", handleClick);
    el.click();

    // 3. do assertsions or check
    expect(el.className).toEqual("tag-item");
    expect(el.tagName).toEqual("SPAN");

    // label
    expect(el.querySelector("span").textContent).toEqual("a@a.com");

    // close button
    expect(el.querySelector("button").textContent).toEqual("✕");
    expect(el.querySelector("button").getAttribute("type")).toEqual("button");

    // click handler
    expect(el.dataset.value).toEqual("hany");
  });
});
