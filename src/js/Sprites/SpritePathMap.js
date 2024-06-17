export var SpritePathMap = {
    player: createImage('../src/images/player.png'),
    grassblock: createImage('../src/images/grassblock.png'),
    dirtblock: createImage('../src/images/dirtblock.png'),
    itemslot: createImage('../src/images/itemslot.png'),
    activeitemslot: createImage('../src/images/activeitemslot.png'),
    wood: createImage('../src/images/wood.png'),
    rock: createImage('../src/images/rock.png'),
}

function createImage(path) {
    const img = new Image();
    img.src = path;

    return img;
}