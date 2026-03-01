# Nova Mini 前端视觉效果规范

> 本文档定义了 Nova Mini 项目的统一视觉效果标准，适用于所有前端开发工作。请严格遵循此规范以确保视觉一致性。

## 目录

1. [颜色系统](#颜色系统)
2. [动画与过渡](#动画与过渡)
3. [圆角系统](#圆角系统)
4. [阴影系统](#阴影系统)
5. [背景效果](#背景效果)
6. [边框系统](#边框系统)
7. [交互效果](#交互效果)
8. [字体与排版](#字体与排版)
9. [间距系统](#间距系统)
10. [Canvas 动画规范](#canvas-动画规范)
11. [滚动条样式](#滚动条样式)
12. [文本选择样式](#文本选择样式)
13. [特殊效果](#特殊效果)
14. [响应式断点](#响应式断点)
15. [Tailwind 配置](#tailwind-配置)

---

## 颜色系统

### 主色调（Copper 铜色系）

```css
/* 铜色系 - 主强调色 */
--copper-400: #F0A670;  /* 高亮/悬停状态 */
--copper-500: #E08E55;  /* 主强调色（最重要） */
--copper-600: #C07040;  /* 按钮/激活状态 */
--copper-900: #4A2510;  /* 深色变体 */
```

**Tailwind 类名**:
- `text-copper-400` / `bg-copper-400` / `border-copper-400`
- `text-copper-500` / `bg-copper-500` / `border-copper-500`
- `text-copper-600` / `bg-copper-600` / `border-copper-600`
- `text-copper-900` / `bg-copper-900` / `border-copper-900`

### 背景色（Midnight 午夜色系）

```css
/* 午夜色系 - 深色背景 */
--midnight-800: #1A1412;  /* 卡片/面板背景 */
--midnight-900: #0F0503;  /* 深色背景 */
--midnight-950: #050201;  /* 最深背景（主背景） */
```

**Tailwind 类名**:
- `bg-midnight-800` / `bg-midnight-900` / `bg-midnight-950`

### 白色透明度层级

```css
/* 白色半透明 - 用于背景和边框 */
white/5   → rgba(255, 255, 255, 0.05)  /* 背景层 */
white/10  → rgba(255, 255, 255, 0.10)  /* 悬停/边框 */
white/20  → rgba(255, 255, 255, 0.20)  /* 高亮边框 */
```

**使用场景**:
- `bg-white/5` - 默认背景
- `bg-white/10` - 悬停背景
- `border-white/10` - 边框
- `border-white/5` - 弱边框

### 灰色文本层级

```css
/* 灰色文本 - 从亮到暗 */
gray-200  → 主要文本
gray-300  → 次要文本
gray-400  → 图标/禁用状态
gray-500  → 占位符/提示文本
gray-600  → 最弱文本
```

**使用场景**:
- `text-gray-200` - 主要文本内容
- `text-gray-300` - 次要文本
- `text-gray-400` - 图标颜色/禁用文本
- `text-gray-500` - 占位符文本
- `text-gray-600` - 最弱提示文本

---

## 动画与过渡

### 过渡时长标准

| 时长 | Tailwind 类 | 使用场景 |
|------|------------|----------|
| 200ms | `duration-200` | 快速交互（按钮、图标） |
| 300ms | `duration-300` | 标准过渡（卡片、输入框） |
| 500ms | `duration-500` | 慢速过渡（背景、光效） |
| 700ms | `duration-700` | 页面级过渡 |
| 1000ms | `duration-1000` | 入场动画 |

### 缓动函数

```css
/* 标准缓动 */
transition: all 300ms ease-out;

/* 弹性缓动 - 用于入场动画 */
transition: all 800ms cubic-bezier(0.2, 0.8, 0.2, 1);

/* 模态缓动 - 用于弹窗 */
transition: all 400ms cubic-bezier(0.19, 1, 0.22, 1);
```

### 关键帧动画

#### fadeInUp（淡入上移）

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**使用方式**:
```jsx
style={{
  animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards`,
  animationDelay: `${100 + index * 80}ms`
}}
```

#### modalEnter（模态入场）

```css
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}
```

**使用方式**:
```jsx
style={{ animation: 'modalEnter 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards' }}
```

### 动画延迟策略

- **列表项错开**: `100ms + index * 80ms`
- **避免同时触发**: 使用递增延迟创建波浪效果

---

## 圆角系统

| 圆角大小 | Tailwind 类 | 使用场景 |
|---------|------------|----------|
| 8px | `rounded-lg` | 按钮、输入框 |
| 12px | `rounded-xl` | 卡片、图标容器 |
| 16px | `rounded-2xl` | 大卡片、模态框 |
| 24px | `rounded-3xl` | 特殊元素（Logo等） |
| 完全圆形 | `rounded-full` | 头像、徽章、指示器 |

**示例**:
```jsx
// 按钮
<button className="rounded-lg">...</button>

// 卡片
<div className="rounded-2xl">...</div>

// 头像
<div className="rounded-full">...</div>
```

---

## 阴影系统

### 阴影层级

| 阴影强度 | Tailwind 类 | 使用场景 |
|---------|------------|----------|
| 轻微 | `shadow-sm` | 悬浮提示、小元素 |
| 标准 | `shadow-lg` | 卡片、按钮 |
| 强调 | `shadow-2xl` | 模态框、重要元素 |
| 内阴影 | `shadow-inner` | 凹陷效果、输入框 |

### 铜色发光效果

```css
/* 弱发光 */
shadow-copper-500/30

/* 中等发光 */
shadow-[0_0_10px_rgba(224,142,85,0.6)]

/* 强发光 - 悬停效果 */
shadow-[0_0_40px_rgba(224,142,85,0.15)]

/* 输入框聚焦 */
shadow-[0_0_20px_rgba(224,142,85,0.1)]
```

**使用示例**:
```jsx
// 悬停光效
<div className="hover:shadow-[0_0_40px_rgba(224,142,85,0.15)]">...</div>

// 激活状态
<div className="shadow-[0_4px_12px_rgba(224,142,85,0.1)]">...</div>
```

---

## 背景效果

### 毛玻璃效果（Backdrop Blur）

| 模糊强度 | Tailwind 类 | 使用场景 |
|---------|------------|----------|
| 轻微 | `backdrop-blur-sm` | 侧边栏 |
| 标准 | `backdrop-blur-md` | 顶部栏 |
| 强 | `backdrop-blur-xl` | 模态框、菜单 |
| 极强 | `backdrop-blur-2xl` | Toast 提示 |

**使用示例**:
```jsx
// 侧边栏
<div className="bg-black/40 backdrop-blur-xl">...</div>

// 模态框
<div className="bg-[#1A1412]/95 backdrop-blur-xl">...</div>
```

### 渐变背景

```css
/* 卡片渐变 */
background: linear-gradient(to bottom, #1E1614, #0F0503);

/* 按钮激活渐变 */
background: linear-gradient(to bottom right, #E08E55, #C07040);

/* 图标激活渐变 */
background: linear-gradient(to bottom right, 
  rgba(224, 142, 85, 0.2), 
  rgba(74, 37, 16, 0.1)
);
```

**Tailwind 类名**:
- `bg-gradient-to-b from-[#1E1614] to-[#0F0503]`
- `bg-gradient-to-br from-copper-500 to-copper-600`
- `bg-gradient-to-br from-copper-500/20 to-copper-900/10`

### 环境光效

```jsx
// 铜色光晕（背景氛围）
<div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] 
  rounded-full bg-copper-900/10 blur-[120px]"></div>

// 蓝色光晕（辅助氛围）
<div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] 
  rounded-full bg-blue-900/5 blur-[100px]"></div>

// 脉冲效果（登录页）
<div className="bg-copper-900/20 blur-[150px] animate-pulse"></div>
```

---

## 边框系统

### 边框透明度

| 透明度 | Tailwind 类 | 使用场景 |
|-------|------------|----------|
| 透明 | `border-transparent` | 默认状态 |
| 5% | `border-white/5` | 基础边框 |
| 10% | `border-white/10` | 卡片边框 |
| 50% | `border-copper-500/50` | 激活/聚焦 |
| 100% | `border-copper-500` | 激活状态 |

### 特殊边框样式

```jsx
// 左侧激活指示条
<div className="border-l-2 border-copper-500">...</div>

// 右侧圆角指示器
<div className="absolute left-[-12px] h-8 w-1 bg-copper-500 
  rounded-r-full shadow-[0_0_10px_rgba(224,142,85,0.6)]"></div>
```

---

## 交互效果

### 悬停状态（Hover）

```jsx
// 背景变化
className="bg-white/5 hover:bg-white/10"

// 文本变化
className="text-gray-400 hover:text-white"

// 图标颜色
className="text-gray-500 hover:text-copper-400"

// 位移效果（卡片上浮）
className="hover:-translate-y-2"

// 缩放效果
className="hover:scale-105"  // 按钮
className="hover:scale-110"   // 图标容器
```

### 激活状态（Active）

```jsx
// 激活样式组合
className={`
  ${isActive 
    ? 'bg-gradient-to-br from-copper-500/20 to-black 
       border-copper-500/50 text-copper-400 
       shadow-[0_4px_12px_rgba(224,142,85,0.1)]' 
    : 'bg-white/5 border-white/5 text-gray-400'
  }
`}
```

### 聚焦状态（Focus）

```jsx
// 输入框聚焦
className="
  bg-white/5 border border-white/10 rounded-2xl
  focus:bg-white/10 
  focus:border-copper-500/50 
  focus:shadow-[0_0_20px_rgba(224,142,85,0.1)]
  transition-all duration-300
"
```

---

## 字体与排版

### 字体族

```css
font-family: 'Inter', sans-serif;
```

**Tailwind 配置**:
```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
}
```

### 字重

| 字重 | Tailwind 类 | 使用场景 |
|------|------------|----------|
| 300 | `font-light` | 标题、大文本 |
| 400 | `font-normal` | 正文（默认） |
| 500 | `font-medium` | 强调文本 |

### 字距（Letter Spacing）

| 字距 | Tailwind 类 | 使用场景 |
|------|------------|----------|
| 紧凑 | `tracking-tight` | 标题 |
| 标准 | `tracking-wide` | 副标题 |
| 宽松 | `tracking-widest` | 标签、大写文本 |

### 文本颜色

```jsx
// 主文本
className="text-white"        // 最重要文本
className="text-gray-200"      // 主要文本

// 次要文本
className="text-gray-300"     // 次要文本
className="text-gray-400"      // 图标/禁用

// 提示文本
className="text-gray-500"      // 占位符
className="text-gray-600"      // 最弱提示

// 强调文本
className="text-copper-400"    // 激活/高亮
```

---

## 间距系统

### 内边距（Padding）

| 大小 | Tailwind 类 | 使用场景 |
|------|------------|----------|
| 紧凑 | `p-2` / `px-3 py-2` | 小按钮、图标按钮 |
| 标准 | `p-4` / `px-4 py-3` | 按钮、输入框 |
| 宽松 | `p-6` / `p-8` | 卡片、模态框内容 |

### 外边距（Margin/Gap）

| 大小 | Tailwind 类 | 使用场景 |
|------|------------|----------|
| 小间距 | `gap-3` | 列表项、图标组 |
| 中间距 | `gap-4` | 表单元素 |
| 大间距 | `gap-8` | 卡片网格 |

**垂直间距**:
- `space-y-4` - 表单字段
- `space-y-6` - 内容区块

---

## Canvas 动画规范

### 流动线条配置

```javascript
const lines = [];
const numLines = 50;

for (let i = 0; i < numLines; i++) {
  lines.push({
    phase: Math.random() * Math.PI * 2,
    speed: 0.0001 + Math.random() * 0.0002,  // 极慢速度
    amplitude: 50 + Math.random() * 100,       // 振幅变化
    frequency: 0.002 + Math.random() * 0.003, // 频率变化
    offsetY: (Math.random() - 0.5) * 150      // Y轴偏移
  });
}

// 绘制样式
ctx.strokeStyle = `rgba(224, 142, 85, ${alpha})`; // Copper-500
ctx.lineWidth = 1;

// 动态透明度
const alpha = 0.05 + (Math.sin(time * 0.001 + i) + 1) * 0.1;
```

### 穿梭粒子配置

```javascript
const particles = [];
const numParticles = 35;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    lineIndex: Math.floor(Math.random() * numLines),
    t: Math.random(),  // 归一化位置 (0-1)
    speed: 0.0002 + Math.random() * 0.0005,
    size: 1.5 + Math.random() * 1.5,
    opacity: Math.random()
  });
}

// 发光效果
ctx.shadowBlur = 8;
ctx.shadowColor = '#F0A670'; // Copper-400

// 粒子颜色
ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // 白色核心
```

### X/Nexus 形状算法

```javascript
// 计算归一化X坐标
const normalizedX = (x - width / 2) / (width / 2);

// Envelope 函数：中心收缩，边缘展开
const envelope = 0.15 + (Math.pow(normalizedX, 2) * 4);

// Y位置计算
const y = (height / 2) + 
          (line.offsetY * envelope) + 
          Math.sin(x * line.frequency + time * line.speed + line.phase) * 
          (line.amplitude * envelope);
```

---

## 滚动条样式

```css
/* macOS 风格浮动滚动条 */

/* 滚动条宽度/高度 */
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

/* 轨道（透明） */
::-webkit-scrollbar-track {
  background: transparent;
}

/* 滑块（浮动效果） */
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 9999px;        /* 完全圆角 */
  border: 4px solid transparent; /* 透明边框创建间距 */
  background-clip: content-box;  /* 背景限制在边框内 */
  min-height: 40px;             /* 最小高度 */
  transition: background-color 0.2s ease;
}

/* 悬停状态 */
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* 激活/拖拽状态 */
::-webkit-scrollbar-thumb:active {
  background-color: rgba(255, 255, 255, 0.5);
}

/* 角落（双滚动条交汇处） */
::-webkit-scrollbar-corner {
  background: transparent;
}
```

**自定义滚动条类名**:
```jsx
<div className="overflow-y-auto custom-scrollbar">...</div>
```

---

## 文本选择样式

```css
::selection {
  background: rgba(224, 142, 85, 0.3); /* Copper-500 30% 透明度 */
  color: white;
}
```

**Tailwind 类名**:
```jsx
<div className="selection:bg-copper-500/30">...</div>
```

---

## 特殊效果

### Ping 动画（脉冲效果）

```jsx
// 悬停时的脉冲效果
{isHovered && (
  <span className="absolute inline-flex h-full w-full 
    rounded-2xl bg-copper-400 opacity-20 animate-ping"></span>
)}
```

### 状态指示器

```jsx
// 激活状态指示条（宽度过渡）
<div className={`
  h-1 rounded-full mt-3 transition-all duration-300 mx-auto
  ${isHovered 
    ? 'w-12 bg-copper-500' 
    : 'w-0 bg-transparent'
  }
`} />
```

### 通知徽章

```jsx
// 红色通知徽章
<div className="absolute top-0 right-0 translate-x-1 -translate-y-1 
  w-5 h-5 bg-red-500 rounded-full flex items-center justify-center 
  border-2 border-[#0F0503] z-20">
  <span className="text-[10px] font-bold text-white">{count}</span>
</div>
```

### 加载动画

```jsx
// 旋转加载
<Loader2 size={48} className="text-copper-500 animate-spin" />

// 脉冲加载
<div className="animate-pulse">...</div>
```

---

## 响应式断点

| 断点 | Tailwind 前缀 | 使用场景 |
|------|--------------|----------|
| 移动端 | 默认 | `grid-cols-2` |
| 平板 | `md:` | `md:grid-cols-3` |
| 桌面 | `lg:` | `lg:grid-cols-4` |

**示例**:
```jsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {/* 响应式网格 */}
</div>
```

---

## Tailwind 配置

### 完整配置示例

```javascript
// tailwind.config.js 或 index.html 中的 script 标签
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        copper: {
          400: '#F0A670',
          500: '#E08E55',  // 主强调色
          600: '#C07040',
          900: '#4A2510',
        },
        midnight: {
          800: '#1A1412',
          900: '#0F0503',  // 深背景
          950: '#050201',  // 最深背景
        }
      }
    }
  }
}
```

### 常用工具类组合

```jsx
// 标准卡片
className="bg-white/5 border border-white/10 rounded-2xl p-6 
  hover:bg-white/10 transition-all duration-300"

// 激活按钮
className="bg-copper-600 hover:bg-copper-500 text-white 
  px-6 py-2 rounded-lg shadow-lg shadow-copper-900/20 
  transition-colors"

// 输入框
className="bg-white/5 border border-white/10 rounded-2xl 
  py-4 px-4 text-white placeholder-gray-600 
  focus:bg-white/10 focus:border-copper-500/50 
  focus:shadow-[0_0_20px_rgba(224,142,85,0.1)] 
  transition-all duration-300"

// 模态框
className="bg-gradient-to-b from-[#1E1614] to-[#0F0503] 
  rounded-2xl shadow-2xl border border-white/5 
  backdrop-blur-xl"
```

---

## 使用原则

### 1. 一致性原则
- ✅ 统一使用规范中的颜色、圆角、阴影层级
- ✅ 保持动画时长和缓动函数的一致性
- ❌ 避免随意创建新的颜色值或样式

### 2. 性能优化
- ✅ 合理使用 `backdrop-blur`，避免过度使用
- ✅ 使用 CSS 过渡而非 JavaScript 动画
- ✅ Canvas 动画使用 `requestAnimationFrame`

### 3. 可访问性
- ✅ 确保文本对比度符合 WCAG 2.1 AA 标准
- ✅ 提供清晰的焦点状态
- ✅ 使用语义化的 HTML 结构

### 4. 响应式设计
- ✅ 使用 Tailwind 响应式前缀
- ✅ 测试不同屏幕尺寸
- ✅ 移动端优先设计

### 5. 动画原则
- ✅ 保持动画流畅，避免过长或过快
- ✅ 使用错开延迟创建层次感
- ✅ 提供减少动画的选项（可访问性）

---

## 快速参考

### 颜色速查

```
主色: copper-500 (#E08E55)
背景: midnight-950 (#050201)
文本: gray-200 / white
边框: white/10
激活: copper-400
```

### 常用组合

```
卡片: rounded-2xl bg-white/5 border-white/10 p-6
按钮: rounded-lg bg-copper-600 hover:bg-copper-500
输入: rounded-2xl bg-white/5 border-white/10 focus:border-copper-500/50
模态: rounded-2xl backdrop-blur-xl shadow-2xl
```

---

## 更新日志

- **v1.0.0** (2025-01) - 初始版本，基于 Nova Mini 项目提取

---

## 贡献指南

如需更新此规范，请：
1. 确保更改符合整体设计语言
2. 更新所有相关示例
3. 保持文档结构清晰
4. 添加更新日志条目

---

**文档版本**: 1.0.0  
**最后更新**: 2025-01  
**维护者**: Nova Mini 团队

