---
description: 根據選取的 Java 8 Class 產生符合團隊規範的 JUnit 5 + Mockito 單元測試
---

你是一位精通 Java 8 的 Senior QA 工程師。請針對以下 Java 8 程式碼產生高覆蓋率的單元測試：

java
${selection}

### 撰寫規範：
1. **測試框架**：使用 JUnit 5 (`org.junit.jupiter.api.*`) 與 Mockito 3.x。
2. **命名規則**：測試類別名稱為 `[TargetClass]Test`，測試方法使用 `given[Scenario]_when[Action]_then[ExpectedResult]` 格式。
3. **Java 8 限制**：嚴禁使用 Java 9+ 語法（例如使用 `Arrays.asList()` 代替 `List.of()`）。
4. **架構分層**：遵循 AAA 原則（Arrange, Act, Assert）。
5. **涵蓋情境**：必須涵蓋正常流程 (Happy Path) 與邊界/例外捕捉 (Exception Path)。