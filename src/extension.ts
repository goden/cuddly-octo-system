import * as vscode from 'vscode';
import { runMavenTest } from './tools/run-maven-test';
import { checkTsStrict } from './tools/check-ts-strict';

export function activate(context: vscode.ExtensionContext) {
  // 1. 註冊 Maven 測試 Skill
  context.subscriptions.push(
    vscode.lm.registerTool('run_java8_maven_test', {
      async invoke(options, token) {
        const input = options.input as { testClass: string };
        const result = await runMavenTest(input);
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(JSON.stringify(result))
        ]);
      }
    })
  );

  // 2. 註冊 TypeScript Strict 檢測 Skill
  context.subscriptions.push(
    vscode.lm.registerTool('check_ts_strict_type', {
      async invoke(options, token) {
        const input = options.input as { filePath: string };
        const result = await checkTsStrict(input);
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(JSON.stringify(result))
        ]);
      }
    })
  );
}