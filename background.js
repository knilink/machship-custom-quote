var rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostContains: '.machship.com' }
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};
chrome.runtime.onInstalled.addListener(function (details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('options.html'), 'selected': true});
});
