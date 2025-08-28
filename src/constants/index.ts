export const CONTRACT_ABI = [
  "function createRedPacket(uint256 _count) external payable",
  "function claimRedPacket(uint256 _packetId) external",
  "function refundRedPacket(uint256 _packetId) external",
  "function getPacketInfo(uint256 _packetId) external view returns (address, uint256, uint256, uint256, uint256, bool)",
  "function hasClaimed(uint256 _packetId, address _user) external view returns (bool)",
  "function getCurrentPacketId() external view returns (uint256)",
  "event PacketCreated(uint256 indexed packetId, address indexed sender, uint256 totalAmount, uint256 totalCount)",
  "event PacketClaimed(uint256 indexed packetId, address indexed claimer, uint256 amount)",
  "event PacketRefunded(uint256 indexed packetId, address indexed sender, uint256 refundAmount)"
]

export const SEPOLIA_NETWORK = {
  chainId: 11155111,
  name: 'Sepolia',
  rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
}

export const NETWORK_STATUS = {
  CHECKING: '🔗 检查网络连接中...',
  METAMASK_CONNECTED: '✅ MetaMask 已连接',
  PUBLIC_RPC: '⚠️ 使用公共 RPC (仅限只读操作)',
  SEPOLIA_CONNECTED: '✅ 已连接到 Sepolia 测试网',
  WRONG_NETWORK: '❌ 请切换到 Sepolia 测试网',
  CONNECTION_FAILED: '❌ 网络连接失败'
}

export const STATUS_ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  loading: '⏳'
}

export const GAS_LIMITS = {
  CREATE_PACKET: 200000,
  CLAIM_PACKET: 150000,
  REFUND_PACKET: 100000
}

export const DEFAULT_VALUES = {
  PACKET_COUNT: 3,
  PACKET_AMOUNT: '0.003',
  PACKET_ID: 0
}
