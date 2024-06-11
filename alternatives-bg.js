browser.menus.create({
  id: "log-selection",
  title: "Log deez nuts",
  contexts: ["selection"],
});

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      handleSelection(info);
      break;
  }
});

function handleSelection(info) {
  console.log("Looking up alternatives for: " + info.selectionText);

  /*
  const selection = document.getSelection();
  console.log(selection);

  const range = selection.getRangeAt(0);
  const clientRects = range.getClientRects();

  console.log(clientRects);
  */

  browser.runtime.sendMessage({ payload: "clicked" });
}
