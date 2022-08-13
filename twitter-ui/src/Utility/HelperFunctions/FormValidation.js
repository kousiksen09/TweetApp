export function isValidEmail(email) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
}
export function validatePhoneNumber(input_str) {
  var re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

  return re.test(input_str);
}
export function isPasswordValid(email) {
  var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  if (passw.test(email)) {
    return true;
  }

  return false;
}
