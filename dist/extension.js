"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));

// src/tools/run-maven-test.ts
var import_child_process = require("child_process");
var import_util = require("util");
var execAsync = (0, import_util.promisify)(import_child_process.exec);
async function runMavenTest(input) {
  const { testClass } = input;
  if (!/^[a-zA-Z0-9_]+$/.test(testClass)) {
    return {
      success: false,
      executedClass: testClass,
      summary: "\u975E\u6CD5\u985E\u5225\u540D\u7A31\uFF0C\u50C5\u5141\u8A31\u82F1\u6578\u5B57\u8207\u5E95\u7DDA\u3002"
    };
  }
  const command = `mvn test -Dtest=${testClass}`;
  try {
    const { stdout } = await execAsync(command);
    return {
      success: true,
      executedClass: testClass,
      summary: `\u6E2C\u8A66\u985E\u5225 ${testClass} \u57F7\u884C\u6210\u529F\uFF01\u6240\u6709\u6E2C\u8A66\u6848\u4F8B\u7686\u9806\u5229\u901A\u904E\u3002`
    };
  } catch (error) {
    const output = error.stdout || error.message || "";
    const failureLog = output.split("\n").filter((line) => line.includes("[ERROR]") || line.includes("FAILURE!")).slice(0, 15).join("\n");
    return {
      success: false,
      executedClass: testClass,
      summary: `\u6E2C\u8A66\u985E\u5225 ${testClass} \u57F7\u884C\u5931\u6557\u3002`,
      rawErrors: failureLog || "\u7121\u6CD5\u6293\u53D6\u8A73\u7D30 Log\uFF0C\u8ACB\u78BA\u8A8D\u672C\u6A5F\u74B0\u5883\u914D\u7F6E\u4E86 JDK 8 \u8207 Maven\u3002"
    };
  }
}
if (require.main === module) {
  const testClassArg = process.argv[2] || "AppTest";
  runMavenTest({ testClass: testClassArg }).then(
    (res) => console.log(JSON.stringify(res, null, 2))
  );
}

// src/tools/check-ts-strict.ts
var fs = __toESM(require("fs"));
var import_child_process2 = require("child_process");
var import_util2 = require("util");
var execAsync2 = (0, import_util2.promisify)(import_child_process2.exec);
async function checkTsStrict(input) {
  const { filePath } = input;
  const violations = [];
  if (!fs.existsSync(filePath)) {
    return {
      passed: false,
      file: filePath,
      violations: [`\u6A94\u6848 ${filePath} \u4E0D\u5B58\u5728\u3002`]
    };
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  lines.forEach((line, index) => {
    if (line.includes(": any") || line.includes("as any")) {
      violations.push(`Line ${index + 1}: \u9055\u53CD\u5718\u968A\u898F\u7BC4\uFF0C\u7981\u6B62\u4F7F\u7528 any \u578B\u5225 ('${line.trim()}')`);
    }
  });
  try {
    await execAsync2(`npx tsc --noEmit ${filePath}`);
  } catch (error) {
    const tscErrors = (error.stdout || "").split("\n").filter((l) => l.includes("error TS")).slice(0, 5);
    violations.push(...tscErrors);
  }
  return {
    passed: violations.length === 0,
    file: filePath,
    violations
  };
}
if (require.main === module) {
  const fileArg = process.argv[2] || "src/index.ts";
  checkTsStrict({ filePath: fileArg }).then(
    (res) => console.log(JSON.stringify(res, null, 2))
  );
}

// src/extension.ts
function activate(context) {
  context.subscriptions.push(
    vscode.lm.registerTool("run_java8_maven_test", {
      async invoke(options, token) {
        const input = options.input;
        const result = await runMavenTest(input);
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(JSON.stringify(result))
        ]);
      }
    })
  );
  context.subscriptions.push(
    vscode.lm.registerTool("check_ts_strict_type", {
      async invoke(options, token) {
        const input = options.input;
        const result = await checkTsStrict(input);
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(JSON.stringify(result))
        ]);
      }
    })
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
