/**
 * Format event date range for display
 * Matches the existing formatEventDate logic from events-api.ts
 *
 * @param startDate - Start date string (YYYY-MM-DD format)
 * @param endDate - End date string (YYYY-MM-DD format)
 * @returns Formatted date string (e.g., "October 9-10, 2025" or "October 9, 2025")
 */
export function formatEventDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  if (start.toDateString() === end.toDateString()) {
    // Same day event
    return start.toLocaleDateString('en-US', options);
  } else if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    // Same month, different days (e.g., "October 9-10, 2025")
    return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    // Different months, same year (e.g., "October 9 - November 10, 2025")
    const startStr = start.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    const endStr = end.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return `${startStr} - ${endStr}`;
  } else {
    // Different years
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  }
}

/**
 * Replace {{date}} placeholder in text content with formatted event date range
 *
 * @param content - The text content containing {{date}} placeholder
 * @param startDate - Event start date string (YYYY-MM-DD format)
 * @param endDate - Event end date string (YYYY-MM-DD format)
 * @returns Content with {{date}} replaced by formatted date range
 *
 * @example
 * ```typescript
 * const content = "The event will take place on {{date}}.";
 * const result = replaceDatePlaceholder(content, "2025-10-09", "2025-10-10");
 * // Result: "The event will take place on October 9-10, 2025."
 * ```
 */
export function replaceDatePlaceholder(
  content: string,
  startDate: string | null | undefined,
  endDate: string | null | undefined
): string {
  // If no content or no dates, return original content
  if (!content || !startDate || !endDate) {
    return content;
  }

  try {
    const formattedDate = formatEventDateRange(startDate, endDate);
    // Replace all occurrences of {{date}} with the formatted date
    return content.replace(/\{\{date\}\}/g, formattedDate);
  } catch (error) {
    console.error('Error formatting date:', error);
    return content; // Return original content on error
  }
}