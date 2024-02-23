export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length == 10) return phoneNumber;
  return phoneNumber.substring(phoneNumber.length - 10);
}
