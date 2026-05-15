import { showDialog_ } from "@common/showDialog";
import { getChildTabItemByTitle_ } from "@document/getChildTabByTitle";
import { getDateEventItems_ } from "@calendar/getDateEvents";
import { copyTabContent_ } from "@document/copyTabContent";
import { getEventData_ } from "@calendar/getEventData";

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
  const eventData = getEventData_(event);

  documentBody.replaceText("{{title}}", eventData.title);
  documentBody.replaceText("{{start}}", eventData.start);
  documentBody.replaceText("{{end}}", eventData.end);
  documentBody.replaceText("{{description}}", eventData.description);
  // TODO: リンク設定したテキストに置換
  documentBody.replaceText("{{calendarLink}}", eventData.calendarLink);
};
