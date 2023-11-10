import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

//Convertir un timestamp a MM/DD/YYYY
export function toFormatDate(timestamp) {

  if (timestamp === null) return null;

  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Get the individual date components
  const month = date.getMonth() + 1; // Month is zero-based (0 = January)
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date as MM/DD/YYYY
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

export function showAlert(msg, icon, focus = '') {
  onFocus(focus);
  const MySwal = withReactContent(Swal)

  MySwal.fire({
    title: msg,
    icon: icon,

  })
}

function onFocus(foco) {
  if (foco !== '') {
    document.getElementById(foco).focus();
  }
}

