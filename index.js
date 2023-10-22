import settings from "./settings";
import { 
    potato, 
    coco, 
    sugar, 
    carrot, 
    cactus, 
    magma, 
    slimeball, 
    wart, 
    fish, 
    gaba, 
    sludge, 
    redstone, 
    pumpkin, 
    melon} from "./paths";
import { flipOrder } from "./functions/flipOrder";
import { placeOrder } from "./functions/placeOrder";
import { cleaner } from "./functions/cleaner";
import { claimOrder } from "./functions/claimOrder";
import { send } from "./functions/send";

ChatLib.chat("&9Swagflipper loaded &kloaded");
register('command', () => { settings.openGUI(); }).setName('swagflippa');
register('command', () => { settings.openGUI(); }).setName('swag');
//register('command', () => { cleaner(); }).setName('testcommand');
const items = [ 
    potato, 
    coco, 
    sugar, 
    carrot, 
    cactus, 
    magma, 
    slimeball, 
    wart, 
    fish, 
    sludge, 
    redstone, 
    pumpkin, 
    melon
]

let maxOrders = false
register("chat", () => {
    maxOrders = true
    Client.currentGui.close()
}).setChatCriteria("21 Bazaar orders").setContains();

let sellQueue = []
register("chat", (e) => {
    if(!settings.flippa) return
    if(kicked) return
    let message = new Message(EventLib.getMessage(e));
    message = ChatLib.removeFormatting(message.getFormattedText())
    const regex = /x\s(.*?)\swas/; // Define a regular expression pattern to match text between 'x' and 'was'
    const match = message.match(regex); // Use the match() method to find the matching text
    const item = match[1];
    if(Client.currentGui.get() !== null) {
        sellQueue.push(item)
        return
    }
    claimOrder(item)
    maxOrders = false
}).setCriteria("Your Sell Offer for").setContains();

let buyQueue = []
register("chat", (e) => {
    if(!settings.flippa) return
    if(kicked) return
    let message = new Message(EventLib.getMessage(e));
    message = ChatLib.removeFormatting(message.getFormattedText())
    const regex = /x\s(.*?)\swas/; // Define a regular expression pattern to match text between 'x' and 'was'
    const match = message.match(regex); // Use the match() method to find the matching text
    const item = match[1];
    if(Client.currentGui.get() !== null) {
        buyQueue.push(item)
        return
    }
    flipOrder(item)
}).setCriteria("Your Buy Order for").setContains();

let lastOrderTime = new Date().getTime()
let lastOrderCheck = new Date().getTime()

let lastCleanTime = new Date().getTime()
let lastCleanCheck = new Date().getTime()

register("Tick", () => {
    if(!settings.flippa) return
    lastOrderCheck = new Date().getTime()
    lastCleanCheck = new Date().getTime()
    let currentTime = new Date().getTime();
    if(lastOrderCheck - lastOrderTime > 300000) {
        if(maxOrders) return
        let randomItem = items[Math.floor(Math.random()*items.length)];
        placeOrder(randomItem)
        lastOrderTime = new Date().getTime()
    } else if(lastCleanCheck - lastCleanTime > 700000) {
        cleaner();
        lastCleanTime = new Date().getTime()
    } 

})

let kicked = false
register("chat", () => {
    if(!settings.autoIsland) return
    new Thread(() => {
        kicked = true
        Thread.sleep(5000)
        ChatLib.command("is")
        Thread.sleep(5000)
        kicked = false
    }).start()
}).setChatCriteria("Evacuating to Hub...").setContains();

register("chat", () => {
    new Thread(() => {
        kicked = true
        Thread.sleep(5000)
        ChatLib.command("play skyblock")
        Thread.sleep(5000)
        kicked = false
    }).start()
}).setChatCriteria("kick occurred").setContains();

register("chat", (e) => {
    if (!settings.ChatCleaner) return
    let message = new Message(EventLib.getMessage(e));
    if (message.toString().includes("Profile ID:") || message.toString().includes("parkour"))
        cancel(e);
})

let totalProfit = 0
register('chat', (e) => {
    if(!settings.OrderAlerts) return
    let message = new Message(EventLib.getMessage(e));
    message = ChatLib.removeFormatting(message.getFormattedText())
    if (message.toString().includes("Order Flipped!")) {
      const regex = /x (.*?) for ([\d,]+) coins/;
      const match = message.match(regex);
      const itemName = match[1]; 
      const numberString = match[2]; 
      const profit = parseFloat(numberString.replace(/,/g, ''));
      totalProfit += profit
      send(`Flipped ${itemName} for ${profit} coins profit \nProfit this session:${Number(totalProfit).toLocaleString()}`, settings.url);
    }
})

const display = new Display();
display.setAlign("left")
display.setBackgroundColor(Renderer.BLACK);
display.setLine(1, ` Time until next order: ${(lastOrderCheck - 300000) / 1000}s`)
display.setLine(2, ` Total profit this session: ${totalProfit}`)

register("Tick", () => {
    let currentTime = new Date().getTime();
    let timeRemaining = lastOrderTime + 300000 - currentTime;
    display.setLine(1, ` Time until next order: ${Math.round(timeRemaining / 1000)}s`)
    display.setLine(2, ` Time until next clean: ${Math.round((lastCleanTime + 700000 - currentTime) / 1000)}s`)
    display.setLine(3, ` Total profit this session: ${totalProfit}`)
});

register("Tick", () => {
    if(Client.currentGui.get() !== null) return
    if(sellQueue.length !== 0) {
        for(let i = 0; i < sellQueue.length; i++) {
            claimOrder(sellQueue[i])
            sellQueue.shift()
            maxOrders = false
        }
    }
    if(buyQueue.length !== 0) {
        for(let i = 0; i < buyQueue.length; i++) {
            flipOrder(buyQueue[i])
            buyQueue.shift()
            maxOrders = false
        }
    }
});