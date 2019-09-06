const prettier = require("prettier");

const input = `{
  "license": "",
  "version": "",
  "devDependencies": {
    "B": "*",
    "A": "*"
  },
  "description": "",
  "dependencies": {
    "B": "*",
    "A": "*"
  },
  "scripts": {
    "test": "",
    "posttest": "",
    "start": "",
    "pretest": "",
    "build": "",
    "postbuild": "",
    "prebuild": "",
    "lint": ""
  },
  "peerDependencies": {
    "B": "*",
    "A": "*"
  },
  "author": "",
  "name": "",
  "optionalDependencies": {
    "B": "*",
    "A": "*"
  },
  "keywords": [
    "C",
    "B",
    "A"
  ]
}`;

const expected = JSON.stringify(
  {
    name: "",
    description: "",
    license: "",
    author: "",
    version: "",
    scripts: {
      prebuild: "",
      build: "",
      postbuild: "",
      lint: "",
      start: "",
      pretest: "",
      test: "",
      posttest: ""
    },
    optionalDependencies: {
      A: "*",
      B: "*"
    },
    dependencies: {
      A: "*",
      B: "*"
    },
    peerDependencies: {
      A: "*",
      B: "*"
    },
    devDependencies: {
      A: "*",
      B: "*"
    },
    keywords: ["A", "B", "C"]
  },
  null,
  2
);

describe("prettierPluginPackageJson", () => {
  it("plugin makes it prettier", () => {
    let output = prettier.format(input, {
      filepath: "package.json",
      parser: "json-stringify",
      plugins: ["."]
    });

    expect(output).toMatch(expected);
  });

  it("plugin makes it prettier after preprocess", () => {
    let output = prettier.format(input, {
      filepath: "package.json",
      parser: "json-stringify",
      plugins: ["."]
    });

    expect(output).toMatch(expected);
  });

  it("without the plugin, it's not prettier", () => {
    let output = prettier.format(input, {
      filepath: "package-lock.json",
      parser: "json-stringify"
    });

    expect(output).not.toMatch(expected);
  });

  it("ignores non package.json files", () => {
    let output = prettier.format(input, {
      filepath: "package-lock.json",
      parser: "json-stringify",
      plugins: ["."]
    });

    expect(output).not.toMatch(expected);
  });
});
