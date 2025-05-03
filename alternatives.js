console.log("Welcome to Recipe Alternatives!");

const OVERLAY_ID = "overlayText";

// Create an overlay near where the user right-clicked
function createOverlay(rect, text) {
  console.log(rect);

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.id = OVERLAY_ID;

  const fullText = `Hi Sowmya! Looking up alternatives for: ${text}...`;

  overlay.innerText = fullText;

  overlay.style.top = `${rect.bottom}px`;
  overlay.style.left = `${rect.left}px`;

  // TODO add button to close overlay

  document.body.appendChild(overlay);
}

function receiver(message) {
  console.log("received msg from bg script!");
  console.log(message.msgType);

  switch (message.msgType) {
    case "menuClicked":
      const selection = document.getSelection();
      console.log(selection);

      const range = selection.getRangeAt(0);
      const clientRects = range.getClientRects();

      createOverlay(clientRects[0], message.payload);

      return Promise.resolve({ response: document.title });
    case "queryCompleted":
      document.getElementById(OVERLAY_ID).innerText = message.payload;
      return Promise.resolve({ response: "ack" });
  }
}

browser.runtime.onMessage.addListener(receiver);
// console.log("Has listener?", browser.runtime.onMessage.hasListener(receiver));
