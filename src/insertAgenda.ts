import { showDialog_ } from "./utils/common/showDialog";
import { getChildTabItemByTitle_ } from "./utils/document/getChildTabByTitle";
import { getDateEventItems_ } from "./utils/calendar/getDateEvents";
import { copyTabContent_ } from "./utils/document/copyTabContent";

const showInsertAgendaDialog_ = () => {
  showDialog_("insertAgendaDialog", "カレンダー選択");
};

const getDateEventItems = (dateStr: string) => {
  const events = getDateEventItems_(dateStr);
  return events;
};

const insertAgenda = (id: string) => {
  const calendar = CalendarApp.getDefaultCalendar();
  const event = calendar.getEventById(id);
  const agendaTabItem = getChildTabItemByTitle_("テンプレート", "議事録");
  if (!event || !agendaTabItem) return;

  // テンプレートを挿入
  copyTabContent_(agendaTabItem.id);

  // イベント情報を反映
  const document = DocumentApp.getActiveDocument();
  const documentBody = document.getActiveTab().asDocumentTab().getBody();

  documentBody.replaceText("{{title}}", event.getTitle());
  documentBody.replaceText(
    "{{start}}",
    `${event.getStartTime().toLocaleDateString()} ${event.getStartTime().toLocaleTimeString()}`,
  );
  documentBody.replaceText(
    "{{end}}",
    `${event.getEndTime().toLocaleDateString()} ${event.getEndTime().toLocaleTimeString()}`,
  );
  // TODO: descriptionがhtmlタグの文字列で返ってくる、ハイパーテキストをGoogleドキュメントに落とし込む方法調べる
  documentBody.replaceText("{{description}}", event.getDescription() || "---");

  // 参考：https://wywy.jp/blogs/gas/2023-10-07-1
  const baseUrl = "https://calendar.google.com/calendar/event?eid=";
  const splitEventId = event.getId().split("@");
  const eventUrl = `${baseUrl}${Utilities.base64Encode(splitEventId[0] + " " + event.getOriginalCalendarId())}`;
  documentBody.replaceText("{{calendarLink}}", eventUrl || "---");
};
