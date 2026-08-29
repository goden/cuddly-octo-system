# CLIDDY-OCTO-SYSTEM

本課程專為想要深度掌握 VS Code Custom Agent 的開發者設計。採用 「Task-Driven Learning（任務驅動學習）」 與 「做中學（Learning by Doing）」 的架構，從最基礎的指令與提示詞設定，演進到多 Agent 協作、Hook 自動化機制與 MCP 系統整合。

完成本課程後，你將能為個人或團隊打造高度自動化、符合專案領域知識（Domain Knowledge）的客製化 Copilot Agent 體系。

# 課程總覽與學習地圖

``` bash
【第一階段：基礎核心實作】
  ├── Unit 1: Instructions & Prompt Files 基礎打造
  └── Unit 2: Agent Skills 模組化擴充

【第二階段：進階協作與擴充】
  ├── Unit 3: 多 Agent 協作與切換機制 (Multi-Agent Workflows)
  └── Unit 4: MCP Registry 系統整合與工具串接

【第三階段：自動化與企業實務】
  ├── Unit 5: GitHub Copilot Hooks 自動化生命週期
  └── Unit 6: 綜合實戰——打造自動化代碼審查與架構師 Agent 體系
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

## Unit 4: MCP Registry 系統整合與外部生態串接
- 學習目標：理解 Model Context Protocol (MCP)，學會從 MCP Registry 導入現成生態系統，並將 Custom Agent 連接到資料庫、GitHub API 或第三方 SaaS。
- 核心概念：
    - MCP 架構：Host (VS Code)、Client 與 Server (MCP Provider) 之間的溝通原理。
    - MCP Registry 與 Local Config：如何在 VS Code 輕鬆安裝與管理 MCP Server。
- 實作任務 (Hands-on Lab)：
    - 設定 .vscode/mcp.json，串接 PostgreSQL / SQLite MCP Server 與 GitHub MCP Server。
    - 讓 Agent具備「查詢真實資料庫 Schema」與「直接讀取線上 GitHub Issue」的能力。
- 產出物：具備讀取實體系統數據、打破 AI 資訊孤島的完全體 Agent。