export function generateFourDigitCode(): string {
  const randomNum = Math.floor(Math.random() * 10000);
  return randomNum.toString().padStart(4, "0");
}
