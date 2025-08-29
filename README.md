# 红包合约验证工具

基于 React + TypeScript + TailwindCSS + Zustand 的红包智能合约验证工具。

## 功能特性

- 🔗 智能合约验证
- 💰 创建红包
- 🎁 抢红包
- 💸 **退款红包** (防止资金锁定)
- 📊 事件日志查询
- 🔍 合约功能测试
- 👛 MetaMask 钱包集成
- 🛡️ **智能检测自转账防护**
- 📋 **我的红包管理**

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
│   │   ├── ContractVerification.tsx    # 合约验证
│   │   ├── FunctionTesting.tsx         # 功能测试
│   │   ├── RedPacketManager.tsx        # 红包管理
│   │   └── EventQuery.tsx              # 事件查询
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

### 1. 连接钱包
- 确保安装了 MetaMask 并切换到 Sepolia 测试网
- 点击"连接钱包"按钮进行连接

### 2. 验证合约
- 在合约验证区域输入红包合约地址
- 点击"验证合约"按钮检查合约部署状态

### 3. 测试功能

#### 🔧 功能测试区域
- **测试读取功能**: 验证合约的只读功能是否正常
- **创建红包**: 设置红包数量和总金额创建新红包
- **抢红包**: 输入红包ID领取红包（不能抢自己的红包）
- **退款红包**: 退回自己创建的未完成红包的剩余金额

#### 🎁 我的红包管理
- 查看自己创建的所有红包
- 显示每个红包的详细信息（总金额、剩余金额、数量等）
- 一键退款功能，快速取回剩余资金
- 红包状态实时显示（活跃/已完成）

#### 📊 事件日志查询
- 查询合约的所有历史事件
- 包括创建、领取、退款事件的详细记录

## 🆕 新增功能亮点

### 💸 智能退款系统
- **防止资金锁定**: 避免剩余红包无人领取导致资金永久锁定
- **智能检测**: 自动识别可退款的红包
- **权限控制**: 只有红包创建者可以退款
- **状态验证**: 检查红包是否还有剩余金额

### 🛡️ 自转账防护
- **智能检测**: 自动检测用户试图领取自己创建的红包
- **友好提示**: 提供清晰的错误信息和解决建议
- **多账户指导**: 引导用户使用不同账户进行完整测试

### 📋 红包管理面板
- **可视化管理**: 直观显示所有创建的红包
- **详细信息**: 展示红包的完整状态和统计信息
- **快速操作**: 一键退款，无需手动输入红包ID
- **实时更新**: 自动刷新红包状态

## 💡 使用技巧

### 多账户测试
1. 在 MetaMask 中创建多个账户
2. 用账户A创建红包
3. 切换到账户B来抢红包
4. 用账户A退款未完成的红包

### 最佳实践
- **创建红包前**: 确保有足够的测试ETH
- **抢红包时**: 注意不能抢自己创建的红包
- **退款时机**: 建议在红包创建后一段时间如无人领取再退款
- **Gas费用**: 预留足够的ETH用于支付交易费用

## ⚠️ 重要提示

1. **测试环境**: 本工具仅适用于 Sepolia 测试网
2. **资金安全**: 请勿在主网使用未经充分测试的合约
3. **私钥保护**: 妥善保管钱包私钥，不要分享给他人
4. **合约验证**: 使用前请确保合约地址正确且已正确部署

## 环境要求

- Node.js >= 16
- MetaMask 浏览器插件
- Sepolia 测试网 ETH
- 现代浏览器（Chrome、Firefox、Edge等）

## 故障排除

### 常见问题

**Q: 无法连接钱包**
A: 确保已安装MetaMask并解锁，检查是否切换到Sepolia测试网

**Q: 交易失败**
A: 检查账户ETH余额是否足够支付Gas费用

**Q: 不能抢红包**
A: 检查是否试图抢自己创建的红包，需要使用不同账户

**Q: 无法退款**
A: 确保是红包创建者且红包还有剩余金额

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License

## 更新日志

### v1.1.0 (最新)
- ✨ 新增红包退款功能
- ✨ 新增红包管理面板
- 🛡️ 新增自转账检测防护
- 🎨 改进用户界面和体验
- 📝 优化错误提示和帮助文档

### v1.0.0
- 🎉 基础功能发布
- 💰 支持创建和抢红包
- 📊 支持事件查询
- 🔗 MetaMask 钱包集成

## 合约验证流程

### 前置条件
- 已连接钱包（建议使用 MetaMask），并切换到 `Sepolia` 测试网
- 已部署并拿到红包合约地址

### 验证步骤（前端交互）
1. 在页面左侧/顶部导航进入“合约基本信息”模块（`ContractVerification`）
2. 输入合约地址（形如 `0x...`），点击“验证合约”
3. 系统将依次进行以下校验与只读调用：
   - 校验当前网络链 ID 是否为 `Sepolia`（`chainId=11155111`）
   - `provider.getCode(address)`：确认地址存在合约字节码
   - `new ethers.Contract(address, CONTRACT_ABI, provider)`：实例化合约对象
   - `contract.getCurrentPacketId()`：调用只读方法验证 ABI 与基础读取能力
4. 验证成功后，页面会：
   - 展示“当前红包ID”等信息
   - 在日志区域输出多条成功日志
   - 将合约实例与状态写入全局 Store（解锁创建/领取/退款/事件查询等功能）

### 是否消耗 Gas？
- 不消耗。上述步骤均为只读调用（`eth_call`），不会打包上链，不产生交易与 Gas 费用。
- 只有会修改链上状态的操作（如 `createRedPacket`、`claimRedPacket`、`refundRedPacket`）才会消耗 Gas。

### 常见失败原因与提示
- 网络不匹配：未切到 `Sepolia` 测试网 → 请切换网络
- 地址无代码：`provider.getCode(address)` 返回 `0x` → 地址不存在合约或未部署
- ABI 不匹配：`getCurrentPacketId()` 读取失败 → 检查导入的 ABI 是否与链上合约版本一致
- 钱包/Provider 未就绪：请先初始化 Provider 并连接钱包

### 验证流程图（SVG）

<div align="center">
<svg width="860" height="360" viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .box { fill:#ffffff; stroke:#4b5563; stroke-width:2; rx:8; ry:8; }
      .title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'; font-size:14px; fill:#111827; font-weight:600; }
      .text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'; font-size:12px; fill:#374151; }
      .arrow { stroke:#6b7280; stroke-width:2; marker-end:url(#arrowHead); }
      .note { font-size:12px; fill:#10b981; font-weight:600; }
      .warn { font-size:12px; fill:#ef4444; font-weight:600; }
    </style>
    <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#6b7280" />
    </marker>
  </defs>

  <!-- Step 1: 输入地址 & 点击验证 -->
  <rect class="box" x="20" y="30" width="220" height="70" />
  <text class="title" x="30" y="55">1) 输入地址并点击验证</text>
  <text class="text" x="30" y="78">组件: ContractVerification</text>
  <text class="text" x="30" y="96">校验地址格式 (0x...)</text>

  <!-- Arrow 1 -->
  <line class="arrow" x1="240" y1="65" x2="300" y2="65" />

  <!-- Step 2: 校验网络 -->
  <rect class="box" x="300" y="30" width="220" height="70" />
  <text class="title" x="310" y="55">2) 校验网络 (Sepolia)</text>
  <text class="text" x="310" y="78">provider.getNetwork()</text>
  <text class="text" x="310" y="96">chainId === 11155111</text>

  <!-- Arrow 2 -->
  <line class="arrow" x1="520" y1="65" x2="580" y2="65" />

  <!-- Step 3: 地址有无代码 -->
  <rect class="box" x="580" y="30" width="260" height="70" />
  <text class="title" x="590" y="55">3) 读取地址字节码</text>
  <text class="text" x="590" y="78">provider.getCode(address)</text>
  <text class="text" x="590" y="96">返回 '0x' 代表无合约</text>

  <!-- Arrow 3 down -->
  <line class="arrow" x1="710" y1="100" x2="710" y2="140" />

  <!-- Step 4: 实例化合约 -->
  <rect class="box" x="580" y="140" width="260" height="70" />
  <text class="title" x="590" y="165">4) 实例化合约对象</text>
  <text class="text" x="590" y="188">new ethers.Contract(address, ABI, provider)</text>

  <!-- Arrow 4 down -->
  <line class="arrow" x1="710" y1="210" x2="710" y2="250" />

  <!-- Step 5: 调用只读方法 -->
  <rect class="box" x="580" y="250" width="260" height="70" />
  <text class="title" x="590" y="275">5) 只读调用 (不消耗Gas)</text>
  <text class="text" x="590" y="298">contract.getCurrentPacketId()</text>
  <text class="text" x="590" y="316">验证 ABI 与读取能力</text>

  <!-- Summary box -->
  <rect class="box" x="20" y="220" width="520" height="100" />
  <text class="title" x="30" y="245">结果 & 状态更新</text>
  <text class="text" x="30" y="268">- 写入全局 Store: contract, currentPacketId, isVerified</text>
  <text class="text" x="30" y="288">- 输出日志: 成功/错误信息</text>
  <text class="note" x="30" y="308">提示: 只读流程，使用 eth_call，不消耗 Gas</text>

  <!-- Error branch from Step 2 (网络错误) -->
  <line class="arrow" x1="410" y1="100" x2="410" y2="130" />
  <text class="warn" x="280" y="130">若网络非 Sepolia → 显示错误并中止</text>

  <!-- Error note for Step 3 (无代码) -->
  <text class="warn" x="580" y="120">若返回 '0x' → 地址无合约/未部署</text>
</svg>
</div>
