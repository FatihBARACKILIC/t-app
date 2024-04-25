export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length == 11) return phoneNumber;
  else if (phoneNumber.length == 10) return `0${phoneNumber}`;

  return phoneNumber.substring(phoneNumber.length - 11);
}
