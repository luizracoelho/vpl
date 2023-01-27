import { To } from "react-router-dom";

export class Menu {
    text: string;
    description: string;
    route: To;
    onlyMenu: boolean;

    constructor(text: string, description: string, route: To, onlyMenu: boolean = false) {
        this.text = text;
        this.description = description;
        this.route = route;
        this.onlyMenu = onlyMenu;
    }
}