import { menuInit_ } from "./utils/document/menuInit";

const onOpen = () => {
  menuInit_([
    {
      label: "テンプレート挿入",
      name: "showInsertTemplateDialog_",
    },
  ]);
};
