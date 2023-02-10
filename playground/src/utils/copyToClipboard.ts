export const copyToClipboard = (text: string) => {
  const input = document.createElement("input");
  input.setAttribute("aria-hidden", "true");
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};
