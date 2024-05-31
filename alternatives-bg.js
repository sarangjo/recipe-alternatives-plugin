browser.menus.create({
  id: "log-selection",
  title: "Log deez nuts",
  contexts: ["selection"],
});

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      console.log("Looking up alternatives for: " + info.selectionText);
      break;
  }
});
