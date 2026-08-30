---
description: 根據 Java 8 DTO 或 API 規格產出強型別 TypeScript API Service
---

請將選取的 Java 8 DTO 或資料結構轉化為 TypeScript API 服務函式：

java
${selection}

### 撰寫規範：
1. **型別定義**：為 Request Payload 與 Response Body 建立獨立的 TypeScript `interface`。
2. **嚴格型別**：完全禁止使用 `any`。
3. **錯誤處理**：實作 `try-catch` 區塊，並回傳強型別錯誤結果。
4. **回傳型別**：函數需明確宣告為 `Promise>`。