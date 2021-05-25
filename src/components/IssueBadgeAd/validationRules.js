export default function validate(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.backgroundColor) {
    errors.backgroundColor = "backgroundColor is required";
  }
  return errors;
}
