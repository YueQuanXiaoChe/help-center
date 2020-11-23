const packageJson = require("./package.json");

const getVersion = (param) => {
  return packageJson.dependencies[param].split("^")[1];
};
