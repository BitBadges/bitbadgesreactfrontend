export default function validate(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.issuer) {
    errors.issuer = "issuer is required";
  }
  if (!values.recipient) {
    errors.recipient = "recipient is required";
  }
  if (!values.backgroundColor) {
    errors.backgroundColor = "backgroundColor is required";
  }
  
  return errors;
}
