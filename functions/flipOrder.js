import kicked from "../global"


const tileSign = Java.type("net.minecraft.client.gui.inventory.GuiEditSign").class.getDeclaredField("field_146848_f");
const doneBtn = Java.type("net.minecraft.client.gui.inventory.GuiEditSign").class.getDeclaredField("field_146852_i");
tileSign.setAccessible(true);
doneBtn.setAccessible(true);
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText");

export function flipOrder(itemName) {
    //if(kicked) return;
    // if (Client.currentGui.get() !== null) return;
    new Thread(() => {
        ChatLib.say("/bz")
        Thread.sleep(700)
        Player.getContainer().click(50, false, "MIDDLE")
        Thread.sleep(700)
        for(let i = 0; i < Player.getContainer().getSize(); i++) {
            let item = Player.getContainer().getStackInSlot(i)
            if(item == null) {
                continue
            }
            if(item.getName().includes(itemName) && item.getName().includes("BUY") && item.getNBT().toString().includes("100%")) {
                Player.getContainer().click(i, false, "RIGHT")
                break
            } 
        }
        Thread.sleep(700)
        let item = ChatLib.removeFormatting(Player.getContainer().getStackInSlot(15).getNBT())
        const priceRegex = /- (\d{1,3}(,\d{3})*(\.\d+)?) coins/g;
        const matches = item.match(priceRegex);
        if (matches) {
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
          
        } else {
          console.log('No prices found in the input string.');
        }
    }).start()
}

