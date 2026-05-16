import { showDialog_ } from "@common/showDialog";
import { copyTabContent_ } from "@document/copyTabContent";
import { showAlert_ } from "@document/showAlert";

type TabItem = {
  id: string;
  title: string;
};

const showInsertTemplateDialog_ = () => {
  showDialog_("insertTemplateDialog", "テンプレート選択");
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

const insertTemplate = (id: string) => {
  copyTabContent_(id);

  // マスタッシュで囲まれた箇所を削除
  const body = DocumentApp.getActiveDocument().getBody();
  body.replaceText("\\{\\{[^}]+\\}\\}", "");
};
