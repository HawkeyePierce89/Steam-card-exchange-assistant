chrome.storage.local.get("tradeNameByValue", function(result) {
    chrome.tabs.query({'active': true, 'currentWindow': true}, () => {
        document.querySelector(".tradeByName").textContent = result.tradeNameByValue;
    });

    new ClipboardJS('.btn-name', {
        text: function() {
            return result.tradeNameByValue;
        }
    });

    if (!result.tradeNameByValue) {
        chrome.storage.local.get("tradeError", function(result) {
            chrome.tabs.query({'active': true, 'currentWindow': true}, () => {
                document.querySelector(".content").textContent = result.tradeError;
            });
        });
    } else {
        chrome.storage.local.get("tradeNameByKey", function(result) {
            chrome.tabs.query({'active': true, 'currentWindow': true}, () => {
                document.querySelector(".tradeByOrder").textContent = result.tradeNameByKey;
            });

            new ClipboardJS('.btn-key', {
                text: function() {
                    return result.tradeNameByKey;
                }
            });
        });
    }
});
