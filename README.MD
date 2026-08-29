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

## Phase 1: 基礎核心實作（Foundation & Skills）

### Phase 1: 基礎核心實作（Foundation & Skills）

Unit 1: Prompt Files 與 System Instructions 基礎實力建構

- 學習目標：理解 Custom Agent 的基石，學會如何透過 
```.github/copilot-instructions.md 與 Prompt Files (.prompt.md) 為 AI 設定角色與標準作業流程。```
- 核心概念：
  - System Instructions：為整個 Workspace/專案設定全域 AI 行為規範（如：程式碼風格、繁體中文回應、特定框架規範）。
  - Prompt Files：針對特定任務或檔案設定 AI 行為，通常用於模組化與可重用的指令集。
- 實作任務 (Hands-on Lab)：
    - 在專案根目錄建立 ```.github/copilot-instructions.md```，設定團隊程式碼規範（如：命名原則、錯誤處理邏輯）。
    - 建立 ```.vscode/prompts/refactor-security.prompt.md```，定義一個專門進行「安全性與效能重構」的提問模板，使用 context 變數引導 Copilot 解析目前開啟的檔案。
- 產出物：第一個具備團隊專案記憶與標準範本的 VS Code 變更配置。