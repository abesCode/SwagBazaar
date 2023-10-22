import settings from "../settings";
import { send } from "../functions/send";
// register('chat', (e) => {
//     if(!settings.OrderAlerts) return  
//     let message = new Message(EventLib.getMessage(e));
//       let orderMessage = ChatLib.removeFormatting(message.getFormattedText())
//       send(`<@${settings.tag}> \n ${orderMessage}`, settings.url)
// }).setCriteria("was filled!").setContains();

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
      send(`Flipped ${itemName} for ${profit} coins profit \nProfit this session:${totalProfit}`, settings.url);
    }
})