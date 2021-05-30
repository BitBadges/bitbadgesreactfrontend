export default function validate(values) {
  let errors = {};
  if (!values.numHodlers) {
    errors.numHodlers = "Num Hodlers is required";
  }
  if (isNaN(Number(values.numHodlers)) || Number(values.numHodlers) <= 0) {
    errors.numHodlers = "Not a valid number";
  }
  return errors;
}
