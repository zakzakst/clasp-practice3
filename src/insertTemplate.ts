import { showAlert_ } from "./utils/document/showAlert";
import { showDialog_ } from "./utils/common/showDialog";
import { copyTabContent_ } from "./utils/document/copyTabContent";

type TabItem = {
  id: string;
  title: string;
};

const getTemplateTabItems = (): TabItem[] | undefined => {
  const tabs = DocumentApp.getActiveDocument().getTabs();
  const templateTab = tabs.find((tab) => tab.getTitle() === "テンプレート");

  if (!templateTab) {
    showAlert_("「テンプレート」タブが見つかりませんでした");
    return;
  }

  const childTabItems: TabItem[] = templateTab
    .getChildTabs()
    .map((childTab) => {
      return {
        id: childTab.getId(),
        title: childTab.getTitle(),
      };
    });

  return childTabItems;
};

const showInsertTemplateDialog_ = () => {
  showDialog_("insertTemplateDialog", "テンプレート選択");
};

const insertTemplate = (id: string) => {
  copyTabContent_(id);
};
