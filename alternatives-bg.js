console.log("Welcome to the Recipe Alternatives background script!");
console.log(
  "Here, we add a menu item to the right-click menu, and register the callback where we send a message to our main script when clicked."
);

browser.menus.create({
  id: "log-selection",
  title: "Look up alternatives",
  contexts: ["selection"],
});

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      handleSelection(info);
      break;
  }
});

async function sendMessageToBrowserScript(message) {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });

  for (const tab of tabs) {
    try {
      const response = await browser.tabs.sendMessage(tab.id, message);
      const title = response.response;
      console.log("Document title:", title);
      return title;
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
}

async function handleSelection(info) {
  const text = info.selectionText;

  console.log("Looking up alternatives for: " + text);

  try {
    const documentTitle = await sendMessageToBrowserScript({
      msgType: "menuClicked",
      payload: text,
    });

    console.log("Message sent, overlay created, now querying HuggingFace...");

    await makeQuery(text, documentTitle);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

const token = ""; /* Replace with contents of api_key.txt */

async function makeQuery(query, documentTitle) {
  console.log("Hello from makeQuery", query);

  const response = await fetch("https://router.huggingface.co/novita/v3/openai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `What are some ideas to replace the ingredient ${query} in a recipe titled "${documentTitle}"?`,
        },
      ],
      model: "deepseek/deepseek-v3-0324",
      stream: false,
    }),
  });

  const resJson = await response.json();

  console.log(resJson);

  const topResponse = resJson?.choices?.[0]?.message?.content;

  const res = await sendMessageToBrowserScript({
    msgType: "queryCompleted",
    payload: topResponse,
  });

  console.log("Response forwarded to content script. Got ack: ", res);
}
