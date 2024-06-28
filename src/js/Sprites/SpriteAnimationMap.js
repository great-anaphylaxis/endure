export var SpriteAnimationMap = {
    playerwalkingright: createAnimation("playerwalkingright", 7),
    playerwalkingleft: createAnimation("playerwalkingleft", 7),
    playeridleleft: createAnimation("playeridleleft", 1),
    playeridleright: createAnimation("playeridleright", 1),
    playerattackleft: createAnimation("playerattackleft", 10),
    playerattackright: createAnimation("playerattackright", 10),
}

function createAnimation(prefix, lastIndex) {
    let animationArray = []
    for (let i = 0; i <= lastIndex; i++) {
        //bro
        animationArray.push(createImage(`../src/images/${prefix}/${prefix}_${i}.png`))
    }

    return animationArray;
}

function createImage(path) {
    const img = new Image();
    img.src = path;

    return img;
}