const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
};

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export default function validate(values) {
  if (!values.title) {
    values.title = "";
  }
  if (!values.recipients) {
    values.recipients = [];
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
  if (!values.backgroundColor) {
    values.backgroundColor = "";
  }

  
  let errors = {};
  if (values.title == "") {
    errors.title = "Title is required";
  }
  if (values.recipients.length === 0) {
    errors.recipients = "You must specify at least one recipient";
  }
  if (values.backgroundColor != "" && !isColor(values.backgroundColor)) {
    errors.backgroundColor = "Not a valid background color";
  }
  if (values.externalUrl != "" && !validURL(values.externalUrl)) {
    errors.externalUrl = "Not a validly formatted URL";
  }
  if (values.imageUrl != "" && !validURL(values.imageUrl)) {
    errors.imageUrl = "Not a validly formatted URL";
  }
  return errors;
}
