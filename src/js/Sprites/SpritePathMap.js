export var SpritePathMap = {
    player: createImage('../src/images/player.png'),
    grassblock: createImage('../src/images/grassblock.png'),
    dirtblock: createImage('../src/images/dirtblock.png'),
    itemslot: createImage('../src/images/itemslot.png'),
    activeitemslot: createImage('../src/images/activeitemslot.png'),
    wood: createImage('../src/images/wood.png'),
    stone: createImage('../src/images/stone.png'),
    playerinventorybutton: createImage('../src/images/playerinventorybutton.png'),
    playerutility: createImage('../src/images/playerutility.png'),
    playerutilitybutton: createImage('../src/images/playerutilitybutton.png'),
    maingroup: createImage('../src/images/maingroup.png'),
    disabledmaingroup: createImage('../src/images/disabledmaingroup.png'),
    background1: createImage('../src/images/background1.png'),
    rock: createImage('../src/images/rock.png'),
    tree: createImage('../src/images/tree.png'),
}

function createImage(path) {
    const img = new Image();
    img.src = path;

    return img;
}