import {
    @ButtonProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @TextProperty,
    @SwitchProperty,
    @SliderProperty,
    @Vigilant,
} from '../Vigilance/index';

@Vigilant("Swagflipper")
class settings {
    constructor() {
        this.initialize(this)
        this.setCategoryDescription("Bazaar flipper","Bazaar settings")
        this.setCategoryDescription("General","General QOL Settings")
    }
    
    @SwitchProperty({
        name: "Bazaar flipper",
        description:"flipper",
        category: "Bazaar flipper",
    })
    flippa = false;
    
    @TextProperty({
        name: "Time between placing orders",
        description: "Time in miliseconds between placing orders (doesnt work rn dw abt it)",
        category: "Bazaar flipper",
    })
    orderDelay = ""
    
    @SwitchProperty({
        name: "Auto island",
        description:"Goes back to your island while afking",
        category: "General",
    })
    autoIsland = false;
    
    @SwitchProperty({
        name: "Chat cleaner",
        description:"Removes various spam from chat",
        category: "General",
        subcategory: "QOL",
    })
    ChatCleaner = false;
    
    @SwitchProperty({
        name: "Order fill/sell alerts",
        description:"Alerts you when bz orders are filled",
        category: "Bazaar flipper",
    })
    OrderAlerts = false;
    
    @TextProperty({
        name: "Discord alerts url",
        description: "Webhook url for various webhook alerts",
        category: "Bazaar flipper",
        subcategory: "QOL"
    })
    url = ""
    
    @TextProperty({
        name: "Discord alerts id",
        description: "User id for discord alert pings",
        category: "Bazaar flipper",
        subcategory: "QOL"
    })
    tag = ""

}


export default new settings