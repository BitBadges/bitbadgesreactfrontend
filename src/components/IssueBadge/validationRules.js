export default function validate(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.issuer) {
    errors.issuer = "issuer is required";
  }
  if (!values.recipients) {
    errors.recipients = "Recipients array is required";
  }
  return errors;
}
