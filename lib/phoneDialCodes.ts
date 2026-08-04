import worldDialCodes from "@/lib/data/worldDialCodes.json";

export interface IPhoneDialCode {
  iso: string;
  country: string;
  dialCode: string;
}

/** All world countries with dial codes (ISO → flag via flagcdn.com). */
export const PHONE_DIAL_CODES: IPhoneDialCode[] = worldDialCodes as IPhoneDialCode[];

export const DEFAULT_DIAL_CODE = "+880";

export function findDialCodeEntry(dialCode: string): IPhoneDialCode | undefined {
  return PHONE_DIAL_CODES.find((entry) => entry.dialCode === dialCode);
}
