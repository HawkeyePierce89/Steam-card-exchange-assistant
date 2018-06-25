chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, "getCards", ({tradeError, tradeNameByValue, tradeNameByKey}) => {
        if (tradeError) {
            document.querySelector(".content").textContent = tradeError;
        } else {
            document.querySelector(".tradeByName").textContent = tradeNameByValue;
            document.querySelector(".tradeByOrder").textContent = tradeNameByKey;

            new ClipboardJS('.btn-name', {
                text: function() {
                    return tradeNameByValue;
                }
            });

            new ClipboardJS('.btn-key', {
                text: function() {
                    return tradeNameByKey;
                }
            });
        }
    });
});
