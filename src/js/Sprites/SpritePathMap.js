export var SpritePathMap = {
    player: createImage('../src/images/player.png'),
    grassblock: createImage('../src/images/grassblock.png'),
    dirtblock: createImage('../src/images/dirtblock.png')
}

function createImage(path) {
    const img = new Image();
    img.src = path;

    return img;
}