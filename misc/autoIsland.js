import kicked from "../global"

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