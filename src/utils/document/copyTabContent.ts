export const copyTabContent_ = (sourceTabId: string) => {
  const document = DocumentApp.getActiveDocument();

  const sourceBody = document.getTab(sourceTabId).asDocumentTab().getBody();

  const targetBody = document.getActiveTab().asDocumentTab().getBody();
  const numChildren = sourceBody.getNumChildren();

  for (let i = 0; i < numChildren; i++) {
    const element = sourceBody.getChild(i).copy();

    const type = element.getType();

    switch (type) {
      case DocumentApp.ElementType.PARAGRAPH:
        targetBody.appendParagraph(element);
        break;

      case DocumentApp.ElementType.LIST_ITEM:
        targetBody.appendListItem(element);
        break;

      case DocumentApp.ElementType.TABLE:
        targetBody.appendTable(element);
        break;
    }
  }
};
