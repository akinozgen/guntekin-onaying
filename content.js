// Define the text to be replaced and its replacement
const replaceText = {
  "Gültekin Uysal": "Güntekin Onay",
  "gültekin uysal": "güntekin onay",
  "gÜLTEKİN uYSAL": "gÜNTEKİN oNAY",
  "gultekin uysal": "güntekin onay",
  "Gultekin Uysal": "Guntekin Onay",
};

// Replace text in the given node
function replaceTextNode(node) {
  let text = node.nodeValue;

  // Replace any occurrences of the target text
  for (const [searchValue, replaceValue] of Object.entries(replaceText)) {
    text = text.replace(new RegExp(searchValue, "g"), replaceValue);
  }

  // Update the node's value if it has changed
  if (text !== node.nodeValue) {
    node.nodeValue = text;
  }
}

// Find all text nodes in the given element
function findAndReplaceText(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    replaceTextNode(walker.currentNode);
  }
}

// Replace text in newly added nodes
function handleNewNodes(nodes) {
  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      replaceTextNode(node);
    } else {
      findAndReplaceText(node);
    }
  });
}

// Watch for mutations to the document body
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    handleNewNodes(mutation.addedNodes);
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Replace text in the document body
findAndReplaceText(document.body);