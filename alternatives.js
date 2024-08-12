console.log("Welcome to Recipe Alternatives!");

function receiver(message) {
  console.log("received msg");
  console.log(message);

  console.log(document.getSelection());

  return true;
}

browser.runtime.onMessage.addListener(receiver);

console.log("Added listener");

// console.log("has listener: " + browser.runtime.onMessage.hasListener());
