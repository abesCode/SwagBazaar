import kicked from "../global";
import settings from "../settings";

export function claimOrder(itemName) {
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
            if(item.getName().includes(itemName) && item.getName().includes("SELL") && item.getNBT().toString().includes("100%")) {
                Player.getContainer().click(i, false, "MIDDLE")
                Thread.sleep(1000)
                Client.currentGui.close()
                break
            } 
        }
    }).start()
}