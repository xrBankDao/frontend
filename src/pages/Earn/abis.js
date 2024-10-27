export const jugAbi = [
    "function base() public view returns (uint256)",
    "function drip(bytes32 ilk) public",
    "function ilks(bytes32 ilk) public view returns (uint256 duty, uint256 rho)",
    "function rho() public view returns (uint256)"
  ]

export const spotAbi = [
    "function ilks(bytes32 ilk) public view returns (address pip, uint256 mat)",
    "function par() public view returns (uint256)",
    "function live() public view returns (uint256)",
    "function poke(bytes32 ilk) external",
    "function file(bytes32 ilk, bytes32 what, address pip_) external",
    "function file(bytes32 what, uint data) external",
    "function file(bytes32 ilk, bytes32 what, uint data) external",
    "function cage() external"
  ]

// Vat Contract ABI
export const vatAbi = [
    "function debt() public view returns (uint256)",
    "function vice() public view returns (uint256)",
    "function Line() public view returns (uint256)",
    "function live() public view returns (uint256)",
    "function hope(address usr) public",
    "function init(bytes32 ilk) public",
    "function file(bytes32 what, uint256 data) public",
    "function file(bytes32 ilk, bytes32 what, uint256 data) public",
    "function dai(address usr) public view returns (uint256)",
    "function ilks(bytes32 ilk) public view returns (uint256 Art, uint256 rate, uint256 spot, uint256 line, uint256 dust)",
    "function debt() public view returns (uint256)",
    "function urns(bytes32 ilk, address usr) public view returns (uint256 ink, uint256 art)",
    "function gem(bytes32 ilk, address usr) public view returns (uint256)" // 추가된 gem 함수
    ];

export const cdpManagerAbi = [
  "function first(address) view returns (uint256)",
  "function ilks(uint256) view returns (bytes32)",
  "function urns(uint256) view returns (address)"
];