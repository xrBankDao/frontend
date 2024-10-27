import Swal from 'sweetalert2';

export function toastTrx(trxReturn) {
    
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: 'success',
    title: 'Transaction Success',
    html: `<a href="https://explorer.xrplevm.org/tx/${trxReturn.transactionHash}" target="_blank" style="color: #3085d6;">View Details</a>`
  });
}