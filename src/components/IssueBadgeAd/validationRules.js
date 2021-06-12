export default function validate(values) {
  if (!values.title) {
    values.title = "";
  }
  if (!values.externalUrl) {
    values.externalUrl = "";
  }
  if (!values.imageUrl) {
    values.imageUrl = "";
  }
  if (!values.description) {
    values.description = "";
  }
  if (!values.validity) {
    values.validity = "";
  }
  if (!values.preReqs) {
    values.preReqs = "";
  }
  if (!values.backgroundColor) {
    values.backgroundColor = "";
  }

  let errors = {};
  if (values.title === "") {
    errors.title = "Title is required";
  }
  return errors;
}
