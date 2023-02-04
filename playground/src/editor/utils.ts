export const copyToClipboard = (text: string) => {
  const input = document.createElement("input");
  input.setAttribute("aria-hidden", "true");
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};

export const download = (
  content: string,
  fileName: string,
  type: string = "text/plain"
) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.setAttribute("download", fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
