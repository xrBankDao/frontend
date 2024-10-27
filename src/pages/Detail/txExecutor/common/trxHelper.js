import Web3 from 'web3';
import Swal from 'sweetalert2'

export async function sendTrax(transactionInfo){

  const web3 = new Web3(window.ethereum);

  const web3Return = await web3.eth
  .sendTransaction(transactionInfo)
  .once('transactionHash', (transactionHash) => {
    console.log('txHash', transactionHash);
    Toast.fire({
      icon: 'success',
      title: 'tx send',
    })
  })
  .once('receipt', (receipt) => {
      console.log('receipt', receipt);
  })
  .once('error', (error) => {
      console.log('error', error);
      alert("tx fail.");
  }).then((txHash) => {return txHash})
  .catch((error) => console.error(error));

  return web3Return;

}



const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  