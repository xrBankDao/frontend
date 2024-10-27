import Web3 from 'web3';

export function formatUnits(value, unit) {
    const web3 = new Web3();
    let convertedValue;
  
    if (unit === 'ray') {
        convertedValue = web3.utils.fromWei(value, 'gether'); // 10^27 단위로 변환
    } else if (unit === 'rad') {
      convertedValue = web3.utils.fromWei(value, 'mether'); // 10^18 단위로 변환
    } else if (unit === 'ether') {
        convertedValue = web3.utils.fromWei(value, 'ether'); // 10^18 단위로 변환
    } else if (unit === 'wei') {
        convertedValue = value; // 'wei'는 변환 없이 사용
    } else {
        throw new Error(`Unsupported unit: ${unit}`);
    }
  
    return convertedValue.toString();
  }