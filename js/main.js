let pauseVar = false;
function loaded()
{
    
    
    const canvas = document.getElementById("game");
    let heal = document.getElementById("heal"),
        scor = document.getElementById("score"),
        gameWave = document.getElementById("wave"),
        enemyD = document.getElementById("ships_destroyed"),
        cash = document.getElementById("cash"),
        superPhase = document.getElementById("superPhase");

    let game = canvas.getContext("2d");
    game.clearRect(0, 0, 600, 600);

    let x = 300,
        y = 530,
        d = 10,
        baseHealth = 200,
        score = 0,
        wave = 1,
        ed = 0,
        gover = false,
        money = 0,
        armorSPh = 0,
        shooting = false,
        repeatShoot = false;
    heal.innerHTML = baseHealth;

    function ship()
    {
        let shipI = new Image();
        shipI.src = "./img/enterprise.png";
        shipI.onload = () =>
        {
            game.drawImage(
                shipI,
                x - 21, y - 21
            );
        }
        if(x > 600)
        {
            x = 1;
            ship();
        }
        else if(x < 0)
        {
            x = 599;
            ship();
        }
    }

    class Bullet
    {
        constructor(x1, y1)
        {
            this.x = x1;
            this.y = y1;
        }

        shootT1()
        {
            game.beginPath();

            game.moveTo(this.x, this.y - 21);
            game.lineTo(this.x, 0);
            game.lineWidth = 2;
            game.strokeStyle = "red";

            game.stroke();
            setTimeout(
                () =>
                {
                    game.clearRect(this.x - 1, 0, 2, 509)
                    ship();
                },
                15
            );
        }

        shootT2()
        {
            game.beginPath();

            game.moveTo(this.x, this.y - 21);
            game.lineTo(this.x, 0);
            game.lineWidth = 2;
            game.strokeStyle = "yellow";

            game.stroke();
            setTimeout(
                () =>
                {
                    game.clearRect(this.x - 1, 0, 2, 509)
                    ship();
                },
                15
            );
        }
    }

    class EnemyShip
    {
        constructor(x1, y1)
        {
            this.x = x1;
            this.y = y1;
            this.health = 100;
        }

        go()
        {
            let posx = this.x, posy = this.y, health = this.health, enemysht;
            let exp = this.explode;
            function gameover()
            {
                if(gover == true)
                {
                    setTimeout(
                        () =>
                        {
                            alert("Você perdeu!\n\nScore: " + score + "\nHordas suportadas: " + parseInt(wave) + "\nInimigos destruidos: " + parseInt(ed));
                            location.reload();
                        },
                        1000
                    );
                }
            }
            function shipe()
            {
                if(health > 0)
                {
                    if(posy < 579)
                    {
                        setTimeout(
                            () =>
                            {
                                if(!pauseVar)
                                {
                                    game.clearRect(posx - 32, posy - 30, 60, 60);
                                    ship();

                                    posy += d - 1;

                                    clearInterval(enemysht);
                                    if(repeatShoot)
                                    {
                                        enemysht = setInterval(
                                            () =>
                                            {
                                                if(posx >= x - 21 && posx <= x + 21 && posy < y && repeatShoot && shooting)
                                                {
                                                    health -= 1;
                                                }
                                            },
                                            10
                                        );
                                    }
                                    

                                    if(baseHealth <= 0)
                                    {
                                        posy = 580;
                                        gover = true;
                                        gameover();
                                        exp(posx, posy);
                                    }

                                    let enemy = new Image(42, 42);
                                    enemy.src = "./img/NaveInimiga.png";
                                    enemy.onload = () =>
                                    {
                                        game.drawImage(
                                            enemy,
                                            posx - 21, posy - 30
                                        );
                                    }
                                }
                                    
                                shipe();
                            },
                            500 - (wave * 12)
                        );
                    }
                    else
                    {
                        baseHealth -= health;
                        exp(posx, posy);
                    }
                }
                else
                {
                    score += 10;
                    money += 5;
                    ed += 1;
                    exp(posx, posy);
                }
            }
            function colision()
            {
                if(health > 0)
                {
                    setTimeout(
                        () =>
                        {
                            if(posy >= y - 40 && posy < y + 20 && posx >= x - 35 && posx <= x + 35 && !pauseVar)
                            {
                                health -= 20;
                            }
                            colision();
                        },
                        500
                    );
                }
                else
                {
                    exp(posx, posy);
                }
            }

            document.addEventListener("keydown", shoot);
            document.addEventListener("keyup", shoot2);

            function shoot(e)
            {
                if(e.code == "ArrowDown" && !repeatShoot && !pauseVar)
                {
                    if(posx >= x - 21 && posx <= x + 21 && posy < y)
                    {
                        health -= 5;
                    }
                }
            }
            function shoot2(e)
            {
                if(e.code == "ArrowUp" && armorSPh > 0 && !pauseVar)
                {
                    if(posx >= x - 21 && posx <= x + 21 && posy < y)
                    {
                        health -= 100;
                    }
                }
            }

            colision();
            shipe();
        }

        explode(x2, y2)
        {
            setTimeout(
                () =>
                {
                    game.clearRect(x2 - 32, y2 - 30, 62, 60);
                },
                50
            );
            ship();
            scor.innerHTML = score;
            heal.innerHTML = baseHealth;
            enemyD.innerHTML = parseInt(ed);
            gameWave.innerHTML = parseInt(wave);
            cash.innerHTML = `$${money.toFixed(2)}`;
            setTimeout(
                () =>
                {
                    let animation = setTimeout(animat, 150), frame = 1;// frame min: 1 e max: 4

                    function animat()
                    {
                        game.clearRect(x2 - 32, y2 - 30, 60, 60);
                        let img = new Image(42, 42);
                        switch (frame) {
                            case 1:
                                img.src = "./img/explosion/spaceship/NaveInimigaF1.png";
                                break;
                            case 2:
                                img.src = "./img/explosion/spaceship/NaveInimigaF2.png";
                                break;
                            case 3:
                                img.src = "./img/explosion/spaceship/NaveInimigaF3.png";
                                break;
                            case 4:
                                img.src = "./img/explosion/spaceship/NaveInimigaF4.png";
                                break;
                                
                        
                            default:
                                clearTimeout(animation);
                                break;
                        }
                        img.onload = () =>
                        {
                            game.drawImage(
                                img,
                                x2 - 21, y2 - 30
                            );
                        }
                        if(frame <= 4)
                        {
                            if(frame == 4)
                            {
                                setTimeout(
                                    () =>
                                    {
                                        game.clearRect(x2 - 32, y2 - 30, 62, 60);
                                    },
                                    300
                                )
                            }
                            frame++;
                            setTimeout(animat, 150);
                        }
                    }
                },
                50
            );
        }

    }

    class Asteroid
    {
        constructor(x1, y1)
        {
            this.x = x1;
            this.y = y1;
            this.h = 200;
        }

        go()
        {
            let posx = this.x,
                posy = this.y,
                health = this.h,
                enemysht,
                exp = this.explode;
            function fly()
            {
                if(health > 0)
                {
                    if(posy < 579)
                    {
                        setTimeout(
                            () =>
                            {
                                if(!pauseVar)
                                {
                                    game.clearRect(posx - 32, posy - 32, 75, 65);
                                    ship();

                                    let img = new Image();
                                    img.src = "./img/asteroide.png";
                                    img.onload = () =>
                                    {
                                        game.drawImage(
                                            img,
                                            posx - 21, posy - 30
                                        );
                                    };

                                    clearInterval(enemysht);
                                    if(repeatShoot)
                                    {
                                        enemysht = setInterval(
                                            () =>
                                            {
                                                if(posx >= x - 21 && posx <= x + 21 && posy < y && repeatShoot && shooting)
                                                {
                                                    health -= 1;
                                                }
                                            },
                                            10
                                        );
                                    }

                                    posy += d - 3;
                                }

                                fly();
                            },
                            1000
                        );
                    }
                    else
                    {
                        baseHealth -= health;
                        exp(posx, posy);
                    }
                }
                else
                {
                    score += 15;
                    money += 7;
                    exp(posx, posy);
                }
            }
            document.addEventListener("keydown", shoot);
            document.addEventListener("keyup", shoot2);

            function shoot(key)
            {
                if(key.code == "ArrowDown" && !pauseVar)
                {
                    if(posx >= x - 21 && posx <= x + 21 && posy < y)
                    {
                        health -= 5;
                    }
                }
            }
            function shoot2(key)
            {
                if(key.code == "ArrowUp" && armorSPh > 0 && !pauseVar)
                {
                    if(posx >= x - 21 && posx <= x + 21 && posy < y)
                    {
                        health -= 100;
                    }
                }
            }
            fly();
        }

        explode(x2, y2)
        {
            setTimeout(
                () =>
                {
                    game.clearRect(x2 - 32, y2 - 32, 75, 75);
                },
                50
            );
            ship();
            scor.innerHTML = score;
            heal.innerHTML = baseHealth;
            enemyD.innerHTML = parseInt(ed);
            gameWave.innerHTML = parseInt(wave);
            cash.innerHTML = `$${money.toFixed(2)}`;
            setTimeout(
                () =>
                {
                    let animation = setTimeout(animat, 150), frame = 1;// frame min: 1 e max: 4

                    function animat()
                    {
                        let img = new Image(42, 42);
                        switch (frame) {
                            case 1:
                                img.src = "./img/explosion/asteroid/explosaoF1.png";
                                break;
                            case 2:
                                img.src = "./img/explosion/asteroid/explosaoF2.png";
                                break;
                            case 3:
                                img.src = "./img/explosion/asteroid/explosaoF3.png";
                                break;
                            case 4:
                                img.src = "./img/explosion/asteroid/explosaoF4.png";
                                break;
                                
                        
                            default:
                                clearTimeout(animation);
                                break;
                        }
                        img.onload = () =>
                        {
                            game.drawImage(
                                img,
                                x2 - 21, y2 - 30
                            );
                        }
                        if(frame <= 4)
                        {
                            if(frame == 4)
                            {
                                setTimeout(
                                    () =>
                                    {
                                        game.clearRect(x2 - 32, y2 - 30, 62, 60);
                                    },
                                    300
                                )
                            }
                            frame++;
                            setTimeout(animat, 150);
                        }
                    }
                },
                50
            );
        }
    }

    ship();
    let enemySpawn, asteroidSpawn, shootLoop;

    document.addEventListener("keydown", eventKBD);

    document.getElementById("unpause").addEventListener(
        "click",
        (click) =>
        {
            pauseVar = false;
            pause(false);
        }
    );

    document.addEventListener(
        "keyup",
        (key) =>
        {
            if(key.code == "ArrowUp" && armorSPh > 0 && !pauseVar)
            {
                armorSPh -= 1;
                superPhase.innerHTML = armorSPh;
                ship();
                let b = new Bullet(x, y);
                b.shootT2();
            }
            else if(key.code == "ArrowDown")
            {
                shooting = false;
            }
            else if(key.code == "KeyR")
            {
                if(repeatShoot)
                {
                    repeatShoot = false;
                    clearInterval(shootLoop)
                }
                else
                {
                    repeatShoot = true;
                    shootLoop = setInterval(shootRpt, 10)
                }
            }
        }
    );
    function shootRpt()
    {
        if(shooting)
        {
            game.clearRect(x - 32, y - 30, 60, 60);
            ship();
            let b = new Bullet(x, y);
            b.shootT1();
        }
    }

    function eventKBD(key)
    {
        if((key.code == "KeyA" || key.code == "ArrowLeft") && !pauseVar)
        {
            x -= d;
            game.clearRect(x - 30, y - 30, 65, 65);
            ship();
        }
        else if((key.code == "KeyD" || key.code == "ArrowRight") && !pauseVar)
        {
            x += d;
            game.clearRect(x - 32, y - 30, 65, 65);
            ship();
        }
        else if(key.code == "ArrowDown" && !pauseVar)
        {
            if(repeatShoot)
            {
                shooting = true;
            }
            else
            {
                game.clearRect(x - 32, y - 30, 60, 60);
                ship();
                let b = new Bullet(x, y);
                b.shootT1();
            }
        }
        else if(key.code == "KeyC" && !pauseVar)
        {
            game.clearRect(0, 0, 600, 600);
            ship();
        }
        else if(key.code == "KeyE" && !pauseVar)
        {
            ship();
            let e = new EnemyShip((40 + Math.random() * (560 - 40)), 50), a = new Asteroid((40 + Math.random() * (560 - 40)), 50);
            e.go();
            a.go()
            wave += 0.1;
        }
        else if(key.code == "KeyI" && !pauseVar)
        {
            clearInterval(enemySpawn);
            clearInterval(asteroidSpawn);
            enemySpawn = setInterval(
                () =>
                {
                    if(!pauseVar)
                    {
                        let enemy = new EnemyShip((40 + Math.random() * (560 - 40)), 50);
                        enemy.go();
                        wave += 0.1;
                    }
                },
                3000
            );
            asteroidSpawn = setInterval(
                () =>
                {
                    if(!pauseVar)
                    {
                        let asteroid = new Asteroid((40 + Math.random() * (560 - 40)), 50);
                        asteroid.go();
                    }
                },
                7500
            );
        }
        else if(key.code == "KeyP" && !pauseVar)
        {
            pause(true);
            pauseVar = true;
        }
    }

    heal.innerHTML = baseHealth;
    scor.innerHTML = score;
    enemyD.innerHTML = parseInt(ed);
    gameWave.innerHTML = parseInt(wave);
    cash.innerHTML = `$${money.toFixed(2)}`;
    superPhase.innerHTML = armorSPh;

    document.getElementById("health").addEventListener(
        "click",
        (click) =>
        {
            if(money >= 10)
            {
                money -= 10;
                baseHealth += 20;
                heal.innerHTML = baseHealth;
                cash.innerHTML = `$${money.toFixed(2)}`;
            }
            else
            {
                alert("Você não tem dinheiro suficiente.")
            }
        }
    );
    document.getElementById("armorPhase").addEventListener(
        "click",
        (click) =>
        {
            if(money >= 25)
            {
                money -= 25;
                armorSPh += 5;
                superPhase.innerHTML = armorSPh;
                cash.innerHTML = `$${money.toFixed(2)}`;
            }
            else
            {
                alert("Você não tem dinheiro suficiente.")
            }
        }
    );
    document.getElementById("stopShipSpawn").addEventListener(
        "click",
        (click) =>
        {
            clearInterval(enemySpawn);
            clearInterval(asteroidSpawn);
        }
    );


}
function store(show)
{
    let store_ = document.getElementById("store");
    if(show)
    {
        store_.classList.remove("hidden");
        store_.classList.add("visible");
    }
    else
    {
        store_.classList.add("hidden");
        store_.classList.remove("visible");
    }
}
function help(show)
{
    if(!pauseVar)
    {
        let help = document.getElementById("help");
        if(show)
        {
            help.classList.add("visible");
            help.classList.remove("hidden");
        }
        else
        {
            help.classList.add("hidden");
            help.classList.remove("visible");
        }
    }
}
function pause(show)
{
    if(!pauseVar)
    {
        let paused = document.getElementById("pause");
        if(show)
        {
            paused.classList.add("visible");
            paused.classList.remove("hidden");
        }
        else
        {
            paused.classList.remove("visible");
            paused.classList.add("hidden");
        }
    }
}