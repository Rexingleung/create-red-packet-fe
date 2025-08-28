# 红包合约验证工具

基于 React + TypeScript + TailwindCSS + Zustand 的红包智能合约验证工具。

## 功能特性

- 🔗 智能合约验证
- 💰 创建红包
- 🎁 抢红包
- 📊 事件日志查询
- 🔍 合约功能测试
- 👛 MetaMask 钱包集成

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **TailwindCSS** - 样式框架
- **Zustand** - 状态管理
- **Ethers.js** - Web3 交互
- **Vite** - 构建工具

## 项目结构

```
src/
├── components/         # 公共组件
│   ├── common/        # 通用组件
│   ├── contract/      # 合约相关组件
│   └── wallet/        # 钱包相关组件
├── hooks/             # 自定义钩子
├── store/             # Zustand 状态管理
├── types/             # TypeScript 类型定义
├── constants/         # 常量定义
└── utils/             # 工具函数
```

## 开始使用

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

## 使用指南

1. **连接钱包**: 确保安装了 MetaMask 并切换到 Sepolia 测试网
2. **输入合约地址**: 在合约验证区域输入红包合约地址
3. **验证合约**: 点击验证按钮检查合约部署状态
4. **测试功能**: 
   - 测试读取功能
   - 创建红包
   - 抢红包
   - 查询事件日志

## 环境要求

- Node.js >= 16
- MetaMask 浏览器插件
- Sepolia 测试网 ETH

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
