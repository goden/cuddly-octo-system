import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface TSCheckInput {
  filePath: string;
}

interface TSCheckResult {
  passed: boolean;
  file: string;
  violations: string[];
}

export async function checkTsStrict(input: TSCheckInput): Promise<TSCheckResult> {
  const { filePath } = input;
  const violations: string[] = [];

  if (!fs.existsSync(filePath)) {
    return {
      passed: false,
      file: filePath,
      violations: [`檔案 ${filePath} 不存在。`]
    };
  }

  // 1. 檔案內文靜態掃描：禁止出現 ": any" 或 "as any"
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes(': any') || line.includes('as any')) {
      violations.push(`Line ${index + 1}: 違反團隊規範，禁止使用 any 型別 ('${line.trim()}')`);
    }
  });

  // 2. 呼叫 tsc 靜態型別檢查
  try {
    await execAsync(`npx tsc --noEmit ${filePath}`);
  } catch (error: any) {
    const tscErrors = (error.stdout || '')
      .split('\n')
      .filter((l: string) => l.includes('error TS'))
      .slice(0, 5);
    violations.push(...tscErrors);
  }

  return {
    passed: violations.length === 0,
    file: filePath,
    violations
  };
}

// 供 CLI 測試使用
if (require.main === module) {
  const fileArg = process.argv[2] || 'src/index.ts';
  checkTsStrict({ filePath: fileArg }).then((res) =>
    console.log(JSON.stringify(res, null, 2))
  );
}