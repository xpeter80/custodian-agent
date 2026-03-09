## Custodian 智能托管平台 Demo

本项目是一个资产托管智能平台 Demo，包含 **FastAPI 后端** 与 **React + Vite 前端**，模拟清算指令识别、头寸智能预估、核算对账分析、投资监督管理等场景，并内置“人工滞留指令监控”等智能体能力。

- **后端**：`backend/`（FastAPI，使用本地虚拟环境 `backend/.venv`）
- **前端**：`frontend/`（Vite + React + Tailwind）

---

## 功能概览

- **清算指令识别**
  - OCR / 指令识别结果展示
  - 指令明细、状态、预警列表

- **头寸智能预估**
  - 总体头寸预测指标卡片
  - **基金明细表**：基金代码、基金名称、头寸预估、应付金额、偏差、状态

- **人工滞留指令监控**
  - 独立 Tab 展示滞留指令监控
  - 20 分钟预警、60 分钟严重告警（基于后端 mock 规则）
  - 汇总指标、基金维度统计、逐笔指令明细

- **核算对账分析 / 投资监督管理**
  - 差错归因分析、科目映射优化（前端示意 + mock 数据）
  - 投资监督规则命中示意

- **智能体状态**
  - Dashboard 中的“系统状态”已改为 **“智能体状态 / Agent Status”**

---

## 目录结构（简要）

```text
backend/
  main.py                # 入口，仅 create app
  app/
    __init__.py          # FastAPI app 工厂与路由挂载
    config.py            # 配置与 Settings
    instructions/        # 清算指令识别相关 API
    monitoring/
      manual_stuck.py    # 人工滞留指令监控 API（/api/monitor/manual-stuck/list）
    chat/                # Chat / 智能体对话相关路由
    supervision/         # 投资监督相关 mock 数据 & 路由
  .venv/                 # 后端虚拟环境（Python 3.12）

frontend/
  src/
    pages/
      Dashboard.jsx
      InstructionRecognition.jsx   # 清算指令 + 人工滞留监控 Tab
      PositionEstimation.jsx       # 头寸智能预估 + 基金明细
      Reconciliation.jsx
      InvestmentSupervision.jsx
    components/
      Sidebar.jsx
      Header.jsx
      MetricCard.jsx
      StatusBadge.jsx
    data/mockData.js               # 前端 mock 数据（含基金与监控数据）
    i18n/                          # 多语言文案（中/英）
  vite.config.js                   # 含 /api → http://localhost:8000 代理
```

---

## 环境准备

### 1. 后端（FastAPI）

进入 `backend/` 创建并使用虚拟环境（项目中已存在 `.venv`，如需重新创建可按下述命令）：

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

启动后端服务：

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000
```

健康检查：

- `GET /api/health` → `{"status": "ok"}`
- `GET /` → 简单运行检查

### 2. 前端（Vite + React）

```bash
cd frontend
npm install
npm run dev
```

前端通过 `vite.config.js` 中的代理将 `/api` 请求转发至 `http://localhost:8000`，确保后端 8000 端口已启动后再访问前端（通常为 `http://localhost:5173`）。

---

## 关键接口（示例）

- **人工滞留指令监控**
  - `GET /api/monitor/manual-stuck/list`
  - 返回字段示例：
    - `summary`：整体滞留统计
    - `fundSummary`：按基金聚合的滞留情况
    - `items`：逐笔滞留指令列表（含滞留时长、等级等）

前端在 `InstructionRecognition.jsx` 中的 **“人工滞留指令监控” Tab** 调用该接口，并展示指标卡片、基金统计和指令明细。

---

## 本地 MySQL & MCP（后续拓展）

当前 Demo 主要使用 mock 数据。若引入真实数据库：

- 按约定优先使用 **本地 MySQL**，并通过 **MySQL MCP** 访问。
- 有数据库结构变更时，请在项目根目录的 `sql/` 目录下新增变更脚本。

---

## 开发约定

- 前后端均尽量采用 **面向对象 + 可复用组件** 思路，避免无必要的新实体。
- 新增依赖时，优先通过 `user-context7` MCP 查询最新用法与最佳实践。
- 有较大改动（尤其是智能体逻辑、监控规则、数据库变更）时，请在本地完整自测（后端接口 + 前端交互）。

