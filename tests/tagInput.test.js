import TagInput, { createElement } from '../src/index';

Element.prototype.scrollIntoView = jest.fn();

describe("TagInput", () => {
  it("Should render correctly", ()=> {
    // 1. setup (e.g. generate data, use mock data, other setup)
    const el = createElement('div', {id: 'input-tag'});
    const options = { placeholder: "testing", data: ["hello@gmail.com"] };
    // 2. call function/method
    const input = new TagInput(el, options);

    // 3. do assertsions or check
    expect(input).toEqual("hany");
  })
})
