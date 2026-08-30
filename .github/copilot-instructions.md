# 團隊開發與程式碼風格規範

## 1. 通用規範
- **回應語言**：預設一律使用繁體中文（Taiwan Traditional Chinese）回應與撰寫程式碼註解。
- **程式碼品質**：著重可讀性與 DRY 原則，需包含必要的 Javadoc 或 JSDoc。

## 2. Java 8 後端規範
- **語法限制**：**嚴禁使用 Java 9+ 語法**（禁止使用 `var` 關鍵字、`List.of()`、`Map.of()`、Record 等）。
- **集合處理**：優先使用 Java 8 Stream API 與 Lambda 表示式，但需維持好排版與可讀性。
- **Null 處理**：使用 `java.util.Optional` 或 `Objects.requireNonNull()`，嚴禁忽略 NullPointer 例外。
- **例外處理**：不直接捕捉 `Exception`，應定義具體的 Custom Exception 並透過全域機制（如 `@ControllerAdvice`）處理。

## 3. TypeScript 前端規範
- **型別嚴格度**：開啟 `strict` 模式，**嚴禁使用 `any` 型別**。無法確定型別時改用 `unknown` 並搭配 Type Guards。
- **介面定義**：資料結構一律優先使用 `interface` 宣告。
- **非同步處理**：一律使用 `async/await`，並顯式宣告回傳型別 `Promise`。