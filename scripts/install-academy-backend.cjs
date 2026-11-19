const fs = require("node:fs");
const path = require("node:path");

// This bounded installer only adds the reviewed Academy files and route.
const target = path.resolve("D:/Work/monsoonback");
const source = path.resolve(__dirname, "../docs/academy-backend");
const files = ["models/academyLead.js", "controllers/academy.js", "services/academyLeadHandler.js", "tests/academyLead.test.js"];
const routePath = path.join(target, "routes/product.js");
const original = fs.readFileSync(routePath, "utf8");
const importLine = 'const academyController = require("../controllers/academy");';
const routeLine = 'router.post("/academyLeads", academyController.submitAcademyLead);';
let routes = original;
if (!routes.includes(importLine)) {
  const anchor = 'let productController = require("../controllers/website")';
  if (!routes.includes(anchor)) throw new Error("Route import anchor changed; inspect before installing.");
  routes = routes.replace(anchor, anchor + "\n" + importLine);
}
if (!routes.includes(routeLine)) {
  if (routes.includes('"/academyLeads"') || routes.includes("'/academyLeads'")) throw new Error("Academy endpoint already exists; inspect before installing.");
  if (!routes.includes("module.exports = router")) throw new Error("Router export anchor changed.");
  routes = routes.replace("module.exports = router", routeLine + "\nmodule.exports = router");
}
const contents = files.map(file => ({ file, text: fs.readFileSync(path.join(source, file), "utf8") }));
for (const { file, text } of contents) {
  const destination = path.join(target, file);
  if (fs.existsSync(destination) && fs.readFileSync(destination, "utf8") !== text) throw new Error("Refusing to overwrite different existing file: " + file);
}
if (process.argv.includes("--check")) {
  console.log("Ready: add four Academy files and POST /api/academyLeads to D:/Work/monsoonback. No existing handlers or credentials will be changed.");
} else {
  for (const { file, text } of contents) {
    const destination = path.join(target, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, text);
  }
  if (routes !== original) fs.writeFileSync(routePath, routes);
  console.log("Installed Academy model, controller, handler, tests and route in D:/Work/monsoonback.");
}
