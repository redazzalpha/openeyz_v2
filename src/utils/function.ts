import { DateTime } from "luxon";

export function translateDate(timestamp: string): string {
    return DateTime.fromISO(timestamp)
      .setLocale("en")
      .toFormat("DD 'at' HH:mm");
  }
