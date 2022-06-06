//import { fireEvent, getByText } from ''
require("@testing-library/jest-dom/extend-expect");
const domEvents = require("@testing-library/dom");
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

const axios = require("axios");
const api = "http://covid19.mathdro.id/api/countries";

async function testCovid(coun) {
  const response = await axios.get(`${api}/${coun}`);
  console.log(response.data.confirmed.value);
  return response.data.confirmed.value;
}
async function testCovid1(coun) {
  const response = await axios.get(`${api}/${coun}`);
  console.log(response.data.deaths.value);
  return response.data.deaths.value;
}
async function testCovid2(coun) {
  const response = await axios.get(`${api}/${coun}`);
  console.log(response.data.recovered.value);
  return response.data.recovered.value;
}

let dom;
let container;
const { JSDOM } = jsdom;
describe("index.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("renders a text element", () => {
    expect(container.querySelectorAll(".enter-country div")).not.toBeNull();
    expect(
      domEvents.getByText(
        container,
        "Enter a country name to get more information"
      )
    ).toBeInTheDocument();
  });

  it("renders a button element", () => {
    expect(container.querySelector("button")).not.toBeNull();
    expect(domEvents.getByText(container, "Search")).toBeInTheDocument();
  });

  describe("search for covid cases", () => {
    test("should return the total no of cases", async () => {
      expect(await testCovid("india")).toBe(43029044);
    });
  });

  describe("search for covid death", () => {
    test("should return the total no of death", async () => {
      expect(await testCovid1("india")).toBe(521358);
    });
  });
  describe("search for covid recovered", () => {
    test("should return the total no of recovered", async () => {
      expect(await testCovid2("india")).toBe(0);
    });
  });
});
