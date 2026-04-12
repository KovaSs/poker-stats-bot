export function escapeMarkdown(text: string): string {
  const specialChars = /[_*[\]()~`>#+\-=|{}.!]/g;
  return text.replace(specialChars, "\\$&");
}
