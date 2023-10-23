import kicked from "../global"
import settings from "../settings";
const tileSign = Java.type("net.minecraft.client.gui.inventory.GuiEditSign").class.getDeclaredField("field_146848_f");
const doneBtn = Java.type("net.minecraft.client.gui.inventory.GuiEditSign").class.getDeclaredField("field_146852_i");
tileSign.setAccessible(true);
doneBtn.setAccessible(true);
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText");

export function placeOrder(path) {
    
    // if(kicked) return;
    // if (Client.currentGui.get() !== null) return;
    new Thread(() => {
        ChatLib.say("/bz")
        Thread.sleep(700)
        for(let i = 1; i < path.length; i++) {
            Player.getContainer().click(path[i], false, "MIDDLE")
            Thread.sleep(700)
        }
        Player.getContainer().click(15, false, "MIDDLE")
        Thread.sleep(700)
        Player.getContainer().click(16, false, "MIDDLE")
        if (Client.currentGui.getClassName() === "GuiEditSign") {
            Thread.sleep(700)
            let currentTileSign = tileSign.get(Client.currentGui.get());
            currentTileSign.field_145915_a[0] = new ChatComponentText(path[0].toString());
            Thread.sleep(700)
            currentTileSign.func_70296_d();
            Thread.sleep(700)
            Client.getMinecraft().func_147108_a(null);
        }

        Thread.sleep(1000)
        Player.getContainer().click(12, false, "MIDDLE")

        Thread.sleep(1000)
        Player.getContainer().click(12, false, "MIDDLE")

        Thread.sleep(1000)
        Player.getContainer().click(13, false, "MIDDLE")

    }).start()
}