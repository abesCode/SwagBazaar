import settings from "../settings";

register("chat", (e) => {
    if (!settings.ChatCleaner) return
    let message = new Message(EventLib.getMessage(e));
    if (message.toString().includes("Profile ID:") || message.toString().includes("parkour"))
        cancel(e);
})