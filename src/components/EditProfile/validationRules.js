export default function validate(values) {
  let errors = {};
  if (!values.pageTitle) {
    errors.pageTitle = "Page title is required";
  }
  if (!values.pageNum) {
    errors.pageNum = "Page number is required";
  } else if (isNaN(Number(values.pageNum)) || Number(values.pageNum) < 0) {
    errors.pageNum = "Page number is invalid";
  }
  return errors;
}
