export class Item {
    static areTheSameItems(item1, item2) {
        if (item1.name === item2.name) {
            return true;
        }

        return false;
    }

    constructor(name) {
        this.name = name;
        this.count = 1;
    }
}