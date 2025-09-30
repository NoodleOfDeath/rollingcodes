import {
  Locale,
  format as formatDate,
  formatDistance,
} from 'date-fns';
import ms from 'ms';

export type DurationString = `${number}${'d' | 'h' | 'M' | 'm' | 'ms' | 's' | 'w' | 'y'}`;

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const TIME_EXPR = /(\d\d?)\s*(a\.?m\.?|p\.?m\.?)|(\d\d?)[.:](\d\d?)(?:[.:](\d\d?))?(?:\s*(a\.?m\.?|p\.?m\.?))?(?:.*?(?:\s*\b(ACDT|ACS?T|AES?T|AKDT|AKS?T|BS?T|CES?T|CDT|CS?T|EDT|ES?T|IST|JS?T|MDT|MSK|NZS?T|PDT|PS?T|UTC))\b)?/i;

export const DATE_EXPR = /(\d\d?\s*(?:h(?:rs?|ours?)?|m(?:in(?:utes?)?)?|d(?:ays?)?|w(?:ks?|eeks?)?|months?|y(?:rs?|ears?)?))\s*ago|(?:(\d\d?)([-./])(\d\d?)\3(\d{4}|\d{2})|(\d{4})([-./])(\d\d?)\7(\d\d?)|(?:(\d\d?)(?:st|nd|rd|th)?\s*)?(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:\.)?(?:\s+(\d\d?)(?:st|nd|rd|th)?)?(?:[,\s]\s*(\d{4})?))(?:.*?(?:\s*\b(ACDT|ACS?T|AES?T|AKDT|AKS?T|BS?T|CES?T|CDT|CS?T|EDT|ES?T|IST|JS?T|MDT|MSK|NZS?T|PDT|PS?T|UTC))\b)?|(\d\d\d\d+)/i;

export function monthToString(month: number | string) {
  const m = parseInt(`${month}`);
  if (Number.isNaN(m)) {
    return month;
  }
  return new Date(`2023-${m}-07`).toLocaleString('en-US', { month: 'long' });
}

export function dateOrUndefined(date?: Date | string): Date | undefined {
  if (!date) {
    return undefined;
  }
  const d = typeof date === 'string' ? new Date(date) : date;
  return !Number.isNaN(d.valueOf()) && d.valueOf() > 0 ? d : undefined;
}

export function parseDate(context?: string) {
  if (!context) {
    return undefined;
  }
  const date = dateOrUndefined(context?.trim());
  if (date) {
    return date;
  }
  const dateMatches = context.match(DATE_EXPR);
  const timeMatches = context.match(TIME_EXPR);
  let year = String(new Date().getFullYear());
  let month = monthToString(new Date().getMonth() + 1);
  let day = String(new Date().getDate());
  let hour = 0, min = 0, sec = 0, amOrPm = '';
  let timezone = '';
  if (!dateMatches) {
    return undefined;
  }
  const [_0, relative, month1, _3, day1, year1, year2, _7, month2, day2, day3, month3, day4, year3, tz = '', timestamp] = dateMatches;
  if (relative) {
    return new Date(Date.now() - ms(relative
      .replace(/h(?:rs?|ours?)?/, 'h')
      .replace(/m(?:in(?:utes?)?)?/, 'm')
      .replace(/d(?:ays?)?/, 'd')
      .replace(/w(?:ks?|eeks?)?/, 'w')
      .replace(/months?/, 'months')
      .replace(/y(?:rs?|ears?)?/, 'y')));
  }
  const datetime = parseInt(timestamp);
  if (!Number.isNaN(datetime)) {
    return dateOrUndefined(new Date(datetime));
  }
  timezone = tz;
  year = year1 ?? year2 ?? year3 ?? String(new Date().getFullYear());
  month = monthToString(month1 ?? month2 ?? month3 ?? new Date().getMonth() + 1);
  day = day1 ?? day2 ?? day3 ?? day4 ?? String(new Date().getDate());
  if (timeMatches) {
    const [_0, hour1, amOrPm1, hour2, min1, sec1, amOrPm2, timezone2] = timeMatches;
    hour = !Number.isNaN(parseInt(hour1 ?? hour2)) ? parseInt(hour1 ?? hour2) : 0;
    min = !Number.isNaN(parseInt(min1)) ? parseInt(min1) : 0;
    sec = !Number.isNaN(parseInt(sec1)) ? parseInt(sec1) : 0;
    amOrPm = (amOrPm1 ?? amOrPm2 ?? '').replace(/\./g, '');
    if (timezone2) {
      timezone = timezone2;
    }
  }
  const dateMatch = [`${month} ${day}, ${String(year).length === 2 ? `20${year}` : year} ${hour}:${min}:${sec} ${amOrPm ? amOrPm : (hour < 12) ? 'am' : ''}`, timezone.replace(/^(A[CEK]|CE|NZ|[BCEJP])T$/i, ($0, $1) => `${$1}ST`)].join(' ');
  const parsedDate = dateOrUndefined(new Date(dateMatch));
  return parsedDate;
}

export function filterDates(dates: (Date | string | null | undefined)[], filterOutFutureDatesBy = '1d') {
  return dates.filter(Boolean).map((d) => typeof d === 'string' ? parseDate(d) : d).filter((date) => {
    return date != null && !Number.isNaN(date.valueOf()) && (date.valueOf() < Date.now() + ms(filterOutFutureDatesBy));
  });
}

export const DateSorter = (a?: Date | string | null, b?: Date | string | null) => { 
  const lhs = typeof a === 'string' ? parseDate(a) : a;
  const rhs = typeof b === 'string' ? parseDate(b) : b;
  return lhs && rhs ? lhs.valueOf() - rhs.valueOf() : 0;
};

export function sortDates(...dates: (Date | string | null | undefined)[]) {
  return filterDates(dates).sort(DateSorter);
}

export function minDate(...dates: (Date | string | null | undefined)[]) {
  const sortedDates = sortDates(...dates);
  if (sortedDates.length === 0) {
    return undefined;
  }
  return sortedDates[0];
}

export function maxDate(...dates: (Date | string | null | undefined)[]) {
  const sortedDates = sortDates(...dates);
  if (sortedDates.length === 0) {
    return undefined;
  }
  return sortedDates[sortedDates.length - 1];
}

export type FormatTimestampOptions = {
  format?: string, 
  relativeTo?: Date | string, 
  locale?: Locale
};

export function formatTimestamp(
  timestamp?: Date | string,
  {
    format, relativeTo, locale,
  }: FormatTimestampOptions = {}
) {
  if (!timestamp) {
    return null;
  }
  const date = new Date(timestamp);
  if (format) {
    return formatDate(date, format, { locale });
  }
  if (relativeTo) {
    return formatDistance(date, new Date(relativeTo), { addSuffix: true, locale });
  }
  return date.toLocaleDateString();
}

export type TimeAgoOptions = {
  from?: Date | number;
  defaultValue?: string;
};

export function durationToParts(duration?: DurationString) {
  if (!duration) {
    return {
      days: 0, hours: 0, minutes: 0, seconds: 0,
    };
  }
  const msDuration = ms(duration);
  const days = msDuration >= 86400000 ? Math.floor(msDuration / 86400000) : 0;
  const hours = msDuration - (days * 86400000) >= 3600000 ? Math.floor((msDuration - (days * 86400000)) / 3600000) : 0;
  const minutes = msDuration - (days * 86400000) - (hours * 3600000) >= 60000 ? Math.floor((msDuration - (days * 86400000) - (hours * 3600000)) / 60000) : 0;
  const seconds = msDuration - (days * 86400000) - (hours * 3600000) - (minutes * 60000) >= 1000 ? Math.floor((msDuration - (days * 86400000) - (hours * 3600000) - (minutes * 60000)) / 1000) : 0;
  return {
    days, hours, minutes, seconds, 
  };
}

export function timeAgo(date: Date, { from = Date.now(), defaultValue = 'just now' }: TimeAgoOptions = {}) {
  const diff = (typeof from === 'number' ? from : from.valueOf()) - date.valueOf();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor(diff / 1000);
  if (days > 0) {
    return `${days}d`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  if (seconds > 0) {
    return `${seconds}s`;
  }
  return defaultValue;
}

export function durationToHoursAndMinutes(duration: DurationString) {
  const msDuration = ms(duration);
  const hours = Math.floor(msDuration / 3600000);
  const minutes = Math.floor((msDuration % 3600000) / 60000);
  return { hours, minutes };
}