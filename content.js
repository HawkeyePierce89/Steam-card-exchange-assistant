chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "getCards") {
        const tradeTemplate = `📱✔ [H] {have} [W] {want}`;
        const cards = Array.from(document.querySelectorAll(".badge_card_set_card"));
        const H = {};
        const W = {};

        cards.forEach((item, index) => {
            let textContent = item.querySelector(".badge_card_set_text").textContent.replace(/\s\s+/g, ' ').trim();

            if (item.classList.contains("owned") && !textContent.startsWith("(1)")) {
                H[index+1] = textContent.split(/\s(.+)/)[1];
            } else if (item.classList.contains("unowned")) {
                W[index+1] = textContent;
            }
        });

        if (Object.keys(H).length && Object.keys(W).length) {
            const tradeNameByValue = tradeTemplate.replace('{have}', Object.values(H).join(", ")).replace('{want}', Object.values(W).join(", "));
            const tradeNameByKey = tradeTemplate.replace('{have}', Object.keys(H).join(", ")).replace('{want}', Object.keys(W).join(", "));

            sendResponse({
                tradeNameByValue,
                tradeNameByKey,
            });
        } else {
            sendResponse({
                tradeError: `You don't have a cards for exchange`
            });
        }
    }
});
