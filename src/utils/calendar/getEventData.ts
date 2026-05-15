type EventData = {
  title: string;
  start: string;
  end: string;
  description: string;
  calendarLink: string;
};

export const getEventData_ = (
  event: GoogleAppsScript.Calendar.CalendarEvent,
): EventData => {
  const title = event.getTitle();
  const start = `${event.getStartTime().toLocaleDateString()} ${event.getStartTime().toLocaleTimeString()}`;
  const end = `${event.getEndTime().toLocaleDateString()} ${event.getEndTime().toLocaleTimeString()}`;

  // TODO: descriptionのサニタイズ
  const description = event.getDescription() || "";

  // 参考：https://wywy.jp/blogs/gas/2023-10-07-1
  const baseUrl = "https://calendar.google.com/calendar/event?eid=";
  const splitEventId = event.getId().split("@");
  const calendarLink = `${baseUrl}${Utilities.base64Encode(splitEventId[0] + " " + event.getOriginalCalendarId())}`;

  // TODO: 招待した人のリスト取得も対応する

  return {
    title,
    start,
    end,
    description,
    calendarLink,
  };
};
