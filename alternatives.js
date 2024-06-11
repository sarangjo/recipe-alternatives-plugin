console.log("Welcome to Recipe Alternatives!");

function receiver(message) {
  console.log("received msg");
  console.log(message);
}

browser.runtime.onMessage.addListener(receiver);
console.log(browser.runtime.onMessage.hasListener());
