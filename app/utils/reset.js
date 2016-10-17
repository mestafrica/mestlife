export default function reset(identifier, value=null) {
  return document.querySelector(identifier).value = value;
}
