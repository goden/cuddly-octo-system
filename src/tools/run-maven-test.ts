import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface MavenTestInput {
  testClass: string;
}

interface MavenTestResult {
  success: boolean;
  executedClass: string;
  summary: string;
  rawErrors?: string;
}

export async function runMavenTest(input: MavenTestInput): Promise<MavenTestResult> {
  const { testClass } = input;
  
  // 避免 Command Injection：限制 testClass 必須符合 Java 類別命名規格
  if (!/^[a-zA-Z0-9_]+$/.test(testClass)) {
    return {
      success: false,
      executedClass: testClass,
      summary: '非法類別名稱，僅允許英數字與底線。'
    };
  }

  const command = `mvn test -Dtest=${testClass}`;

  try {
    const { stdout } = await execAsync(command);
    return {
      success: true,
      executedClass: testClass,
      summary: `測試類別 ${testClass} 執行成功！所有測試案例皆順利通過。`
    };
  } catch (error: any) {
    // 擷取 stderr 或 stdout 中的 BUILD FAILURE 相關訊息
    const output = error.stdout || error.message || '';
    const failureLog = output
      .split('\n')
      .filter((line: string) => line.includes('[ERROR]') || line.includes('FAILURE!'))
      .slice(0, 15) // 僅保留前 15 行關鍵 Error，避免 Context 爆量
      .join('\n');

    return {
      success: false,
      executedClass: testClass,
      summary: `測試類別 ${testClass} 執行失敗。`,
      rawErrors: failureLog || '無法抓取詳細 Log，請確認本機環境配置了 JDK 8 與 Maven。'
    };
  }
}

// 供 CLI 測試使用
if (require.main === module) {
  const testClassArg = process.argv[2] || 'AppTest';
  runMavenTest({ testClass: testClassArg }).then((res) =>
    console.log(JSON.stringify(res, null, 2))
  );
}