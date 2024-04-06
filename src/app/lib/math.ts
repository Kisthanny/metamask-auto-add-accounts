export function integerToHex(integer: number) {
  // 使用toString方法将整数转换为十六进制字符串
  const hexString = integer.toString(16);
  // 添加 "0x" 前缀，并确保没有前导零
  return "0x" + hexString.replace(/^0+/, "");
}
