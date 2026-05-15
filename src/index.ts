import { menuInit_ } from "@document/menuInit";

const onOpen = () => {
  menuInit_([
    {
      label: "テンプレート挿入",
      name: "showInsertTemplateDialog_",
    },
    {
      label: "カレンダーから議事録テンプレート挿入",
      name: "showInsertAgendaDialog_",
    },
  ]);
};
