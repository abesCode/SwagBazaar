import kicked from "../global"

const tileSign = Java.type("net.minecraft.client.gui.inventory.GuiEditSign").class.getDeclaredField("field_146848_f");
const doneBtn = Java.type("net.minecraft.client.gui.inventory.GuiEditSign").class.getDeclaredField("field_146852_i");
tileSign.setAccessible(true);
doneBtn.setAccessible(true);
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText");

export function cleaner() {
    // if(kicked) return
    // if(Client.currentGui !== null) return
    new Thread(() => {
        ChatLib.command("bz")
        Thread.sleep(600)
        Player.getContainer().click(50, false, "MIDDLE")
        Thread.sleep(700)
        let soldOrders = 0
        for(let i = 0; i < Player.getContainer().getSize(); i++) {
            let item = Player.getContainer().getStackInSlot(i)
            if(item == null) {
            continue
            }
            if(item.getName().includes("SELL") && item.getNBT().toString().includes("100%")) {
            soldOrders++
            } 
        }
        Thread.sleep(700)
        for(let i = 0; i < soldOrders; i++) {
            ChatLib.command("bz")
            Thread.sleep(700)
            Player.getContainer().click(50, false, "MIDDLE")
            Thread.sleep(700)
            for(let i = 0; i < Player.getContainer().getSize(); i++) {
                let item = Player.getContainer().getStackInSlot(i)
                if(item == null) {
                    continue
                }
                if(item.getName().includes("SELL") && item.getNBT().toString().includes("100%")) {
                    Player.getContainer().click(i, false, "MIDDLE")
                }
            Thread.sleep(700)
            }
        }
        Thread.sleep(1000)
        let filledOrders = 0
        for(let i = 0; i < Player.getContainer().getSize(); i++) {
            let item = Player.getContainer().getStackInSlot(i)
            if(item == null) {
                continue
            }
            if(item.getName().includes("BUY") && item.getNBT().toString().includes("100%")) {
                filledOrders++
            } 
        }
        Thread.sleep(1000)
        for(let i = 0; i < filledOrders; i++) {
            ChatLib.command("bz")
            Thread.sleep(700)
            Player.getContainer().click(50, false, "MIDDLE")
            Thread.sleep(700)
            for(let i = 0; i < Player.getContainer().getSize(); i++) {
                let item = Player.getContainer().getStackInSlot(i)
                if(item == null) {
                    continue
                }
                if(item.getName().includes("BUY") && item.getNBT().toString().includes("100%")) {
                    Player.getContainer().click(i, false, "RIGHT")
                    break
                }
            }
            Thread.sleep(700)
            let item = ChatLib.removeFormatting(Player.getContainer().getStackInSlot(15).getNBT())
            //console.log(item.toString())
            const priceRegex = /- (\d{1,3}(,\d{3})*(\.\d+)?) coins/g;

            // Find all matches of prices in the input string
            const matches = item.match(priceRegex);
            
            const prices = matches.map(match => parseFloat(match.replace(/- | coins/g, '').replace(/,/g, '')))

            const lowestPrice = Math.min(...prices);
            Player.getContainer().click(15, false, "MIDDLE")
            Thread.sleep(700)
            if (Client.currentGui.getClassName() === "GuiEditSign") {
                let currentTileSign = tileSign.get(Client.currentGui.get());
                currentTileSign.field_145915_a[0] = new ChatComponentText(lowestPrice.toString());
                Thread.sleep(700)
                currentTileSign.func_70296_d();
                Thread.sleep(700)
                Client.getMinecraft().func_147108_a(null);
            }
            Thread.sleep(1000)
            Client.currentGui.close()
        } 
        
      
        Client.currentGui.close()
    }).start()
}