# CLIDDY-OCTO-SYSTEM

本課程專為想要深度掌握 VS Code Custom Agent 的開發者設計。採用 「Task-Driven Learning（任務驅動學習）」 與 「做中學（Learning by Doing）」 的架構，從最基礎的指令與提示詞設定，演進到多 Agent 協作、Hook 自動化機制與 MCP 系統整合。

完成本課程後，你將能為個人或團隊打造高度自動化、符合專案領域知識（Domain Knowledge）的客製化 Copilot Agent 體系。

# 課程總覽與學習地圖

``` bash
【第一階段：基礎核心實作】
  ├── Unit 1: Instructions & Prompt Files (Java 8/TS 程式碼規範與情境範本)
  └── Unit 2: Agent Skills 模組化擴充 (TypeScript/Node.js 工具整合)

【第二階段：進階協作與深度技術】
  ├── Unit 3: 多 Agent 協作機制 (Java 後端與 TS 前端分工鏈)
  └── Unit 4: MCP (Model Context Protocol) 系統整合與技術深掘 [深度技術區]

【第三階段：生命週期控管與實戰】
  ├── Unit 5: GitHub Copilot Hooks 自動化審核機制 [深度技術區]
  └── Unit 6: 綜合實戰——Java 8 + TypeScript 全棧功能自動化開發體系
```

# Phase 1: 基礎核心實作（Foundation & Skills）

## Unit 1: Prompt Files 與 System Instructions 基礎實力建構
- 學習目標：理解 Custom Agent 的基石，學會如何透過 
```.github/copilot-instructions.md 與 Prompt Files (.prompt.md) 為 AI 設定角色與標準作業流程。```
- 核心概念：
  - System Instructions：為整個 Workspace/專案設定全域 AI 行為規範（如：程式碼風格、繁體中文回應、特定框架規範）。
  - Prompt Files：針對特定任務或檔案設定 AI 行為，通常用於模組化與可重用的指令集。
- 實作任務 (Hands-on Lab)：
    - 在專案根目錄建立 ```.github/copilot-instructions.md```，設定團隊程式碼規範（如：命名原則、錯誤處理邏輯）。
    - 建立 ```.vscode/prompts/refactor-security.prompt.md```，定義一個專門進行「安全性與效能重構」的提問模板，使用 context 變數引導 Copilot 解析目前開啟的檔案。
- 產出物：第一個具備團隊專案記憶與標準範本的 VS Code 變更配置。

## Unit 2: Agent Skills 模組化擴充
- 學習目標：學會將常用的指令、API 調用或腳本封裝成 Skills，讓 Copilot 能根據語意動態選用技能。
- 核心概念：
    - kill 的結構：定義輸入 (Input Parameters)、處理邏輯 (Execution) 與輸出結構 (Output Format)。
    - 工具選用 (Tool Calling)：Agent 如何判斷何時調用特定 Skill 來完成任務。
- 實作任務 (Hands-on Lab)：
    - 建立一個 check-bundle-size 技能：當使用者詢問「這個變更會影響打包大小嗎？」時，Agent 能觸發背景腳本檢查建置檔體積。
    - 建立一個 generate-db-migration 技能：根據 Schema 修改自動輸出資料庫 Migration 腳本。
- 產出物：具備自主呼叫本機腳本/工具能力的 Custom Agent。

# Phase 2: 進階協作與擴充（Multi-Agent & MCP）

## Unit 3: 多 Agent 協作機制 (Multi-Agent Workflows)
- 學習目標：告別「單一 Agent 處理所有事」的模式，學會定義專職 Agent（如：@planner, @coder, @reviewer）並建立流暢的切換與協作鏈。
- 核心概念：
    - Agent 職責分離 (SoC)：將複雜任務拆解給不同特化的 Agent。
    - Handoff & Sub-agent 呼叫：Agent 之間的上下文傳遞與接棒機制。
- 實作任務 (Hands-on Lab)：
    - 定義 @architect Agent：負責分析需求、輸出系統設計 Markdown。
    - 定義 @coder Agent：讀取 @architect 的 Markdown 規格書，產生高品質程式碼。
    - 實作任務接棒：嘗試以指令讓 @architect 設計完後自動呼叫 @coder 進行實作。
- 產出物：一套能在 VS Code Chat 中互相傳遞上下文、分工合作的 Agent 團隊。

## Unit 4: Model Context Protocol (MCP) 架構與技術深掘

MCP 是由 Anthropic 提出的開放標準，用於解決 LLM 與外部資料/工具之間的標準化溝通問題。在 VS Code Custom Agent 體系中，MCP 是讓 Agent 安全讀取企業級資料庫與 Java/TS 系統架構的核心通道。

1. MCP 通訊架構與傳輸層 (Transport Layer)
- JSON-RPC 2.0 協定：MCP 採用 JSON-RPC 2.0 作為訊息傳播標準。
- 傳輸機制 (Transports)：
    - Stdio Transport：VS Code 以子處理程序 (Subprocess) 啟動 MCP Server，透過 stdin/stdout 進行低延遲通訊（適合本機開發工具）。
    - SSE Transport (Server-Sent Events)：透過 HTTP + SSE 實現遠端 MCP Server 串接（適合跨服務或企業內部集中式 MCP 服務）。
    ``` bash
    +-----------------------------------------------------------------------+
    | VS Code Host (Copilot Custom Agent)                                   |
    |   |                                                                   |
    |   +-- JSON-RPC 2.0 (stdio / SSE) --> MCP Server (TypeScript / Java)  |
    |                                         |                             |
    |                                         +---> PostgreSQL / DB (Java 8)|
    |                                         +---> AST / Parser (TS / Java)|
    +-----------------------------------------------------------------------+
    ```

2. MCP 三大核心能力 (Capabilities)
| 原語 (Primitive) | 說明 | 應用情境 (Java 8/TS) |
|---|---|---|
| Resources | 提供唯讀的資料/上下文內容 (Read-only Data) |讀取專案內的 Java 8 DAO / Entity 設定、TypeScript Type Definitions、資料庫 Schema。|
| Prompts | 預先定義的提問模板與上下文組合 | 提供如「Java 8 遺留代碼重構至 Lambda / Stream API」的標準分析模板。 |
| Tools | LLM 可主動觸發的執行可執行函式 (Executable Functions) | 執行 mvn test、呼叫 Java AST 解析器、觸發 TypeScript Lint 與 Compile 檢查。 |

3. MCP TypeScript SDK 實作範例

使用 @modelcontextprotocol/sdk 建構一個能解析 Java 8 Class 結構的 MCP Tool：

``` typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const server = new Server(
  { name: "java8-analyzer-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 註冊 Tool
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "analyze_java8_class",
      description: "解析 Java 8 檔案的 Class 結構與依賴關係",
      inputSchema: {
        type: "object",
        properties: {
          filePath: { type: "string", description: "Java 檔案絕對路徑" }
        },
        required: ["filePath"]
      }
    }
  ]
}));

// 處理 Tool 執行邏輯
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "analyze_java8_class") {
    const filePath = String(request.params.arguments?.filePath);
    // 可呼叫 Java AST 模組或執行內部腳本解析
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ status: "success", parsedMethods: ["findAll()", "findById(Long id)"] })
        }
      ]
    };
  }
  throw new Error("Tool not found");
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
run();
```

4. VS Code 設定檔整合 (.vscode/mcp.json)

``` json
{
  "mcpServers": {
    "java-backend-mcp": {
      "command": "node",
      "args": ["${workspaceFolder}/tools/mcp-server/dist/index.js"],
      "env": {
        "JAVA_HOME": "/usr/lib/jvm/java-8-openjdk"
      }
    }
  }
}
```


# Phase 3: 自動化與企業實務（Hooks & Capstone Project）

## Unit 5: GitHub Copilot Hooks 自動化生命週期與質量守門

Hooks 是嵌入在 AI 生成流程（Generation Lifecycle）中的攔截與自動化機制。透過 Hooks，我們能強制讓 Agent 生成的 Java 8 或 TypeScript 程式碼通過語法檢查、資安掃描，並自動注入上下文。

1. Hooks 生命週期流轉 (Lifecycle Sequence)
``` mermaid
[使用者提問] 
    │
    ▼
┌──────────────────────────┐
│  Pre-Generation Hook     │ ──> 注入現有 Git Diff / TypeScript 型別檔
└──────────────────────────┘
    │
    ▼
[ LLM 接收 Prompt 並產生程式碼 ]
    │
    ▼
┌──────────────────────────┐
│  Post-Generation Hook    │ ──> 執行 tsc --noEmit / Java 語法審核
└──────────────────────────┘
    │
    ├─► 語法檢驗通過 ──> 輸出至 VS Code 編輯器
    └─► 語法檢驗失敗 ──> 觸發 Auto-Fix 重新交給 LLM 修正
```

2. Pre-Generation Hook (語境擴充與自動注入)
- 目的：在 Prompt 送出前，自動掃描並加入相關 Context（例如：將當前開啟的 TypeScript interface 定義或 Java 8 DTO 帶入）。
- 應用情境：撰寫 TypeScript 前端時，自動尋找同名的 Java 8 API Response DTO 並將其作為 Prompt 的輸入參數。

3. Post-Generation Hook (語法與資安守門員)
- 目的：攔截 LLM 生成的 Code Block，並使用靜態分析工具進查。
- 技術檢驗規則 (Quality Gates)：
    1. Java 8 相容性檢查：禁止使用 Java 9+ 語法（如 List.of()、var 關鍵字），確保編譯通過。
    2. TypeScript Strict Type 檢查：不允許產生 any 型別。
    3. 機密資訊過濾：使用 Regex 攔截潛在硬編碼 API Key / DB Password。

4. Node.js (TypeScript) 撰寫 Post-Generation Hook 邏輯範例
``` typescript
// hooks/post-generation-check.ts
import * as fs from 'fs';
import { execSync } from 'child_process';

interface HookPayload {
  generatedCode: string;
  languageId: string;
}

export async function main() {
  const inputPayload: HookPayload = JSON.parse(fs.readFileSync(0, 'utf-8'));

  // 1. 檢驗 Java 8 語法規範
  if (inputPayload.languageId === 'java') {
    if (inputPayload.generatedCode.includes('var ') || inputPayload.generatedCode.includes('List.of(')) {
      console.error(JSON.stringify({
        status: 'rejected',
        reason: '檢測到非 Java 8 語法（使用了 var 或 List.of），請重新重構為 Java 8 標準語法。'
      }));
      process.exit(1);
    }
  }

  // 2. 檢驗 TypeScript 規範
  if (inputPayload.languageId === 'typescript') {
    if (inputPayload.generatedCode.includes(': any')) {
      console.error(JSON.stringify({
        status: 'rejected',
        reason: '違反嚴格型別規範：禁止使用 ": any"，請定義具體 Interface 或 Generic 型別。'
      }));
      process.exit(1);
    }
  }

  console.log(JSON.stringify({ status: 'approved' }));
  process.exit(0);
}

main();
```

## Unit 6: 綜合實戰——終極專案：自動化 Code Review 與 Feature 開發體系
- 學習目標：綜合全課所學，從零建構一套完整可用於實際工作流程的客製化 Agent 系統。
- 專案目標：打造一套 「需求到 PR 一站式 AI 助手」。
- 系統架構與實作步驟：
    1. 配置 MCP：連接 GitHub 及專案專屬資料庫。
    2. 編寫 Agents：
        - @planner：讀取 GitHub Issue，產出 Task Breakdown。
        - @implementer：調用 Prompt Files 與 Skills 產生程式碼與單元測試。
        - @reviewer：透過 Hook 執行 post-check，自動產出 Code Review 報告。
    3. 自動化測試與優化：實際給定一個 Feature Issue，測試整個 Multi-Agent 體系能否順利完成交付。
- 結業產出：一套可直接應用於個人或企業專案的 VS Code Custom Agent 設定檔與腳本庫。

# 課程學習建議與環境準備
1. 環境需求：
    - VS Code (最新版本)
    - GitHub Copilot 訂閱帳號 (具備 Custom Agent / MCP 支援權限)
    -  Node.js / Python 環境（用於撰寫自訂 Skills 與 MCP Server/Hooks 腳本）
2. 學習節奏：建議每週完成 1~2 個 Unit，每個 Unit 都包含「30% 觀念理解 + 70% 實作練習」。