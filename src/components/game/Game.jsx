import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import useWebSocket from "../../utils/useWebSocket";
import { createStompConfig, WS_ROUTES, WS_TOPICS } from "../../WebSocketConstaint";

const Game = ({currentUser= localStorage.getItem('username')} ) => {
    const gameRef = useRef(null);
    const phaserContainer = useRef(null);

    const { users, sendPosition } = useWebSocket(createStompConfig, WS_ROUTES, WS_TOPICS, currentUser);
    
    useEffect(() => {
        if (!phaserContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: {
                preload,
                create,
                update,
            },
            physics: {
                default: "arcade",
                arcade: {
                    debug: false,
                },
            },
            parent: phaserContainer.current,
        };

        gameRef.current = new Phaser.Game(config);

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
        };
    }, []);

    let player, cursors, usernameText, xLimit, yLimit;
    const otherPlayers = {};

    function preload() {
        this.load.image('background', '/assets/images/sky.jpg');
        this.load.image('tileset', '/assets/images/grassFence.png');
        this.load.spritesheet('character'
            , '/assets/sprites/face0.png'
            , { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('character2'
            , '/assets/sprites/face1.png'
            , { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('character3'
            , '/assets/sprites/face2.png'
            , { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('character4'
            , '/assets/sprites/face3.png'
            , { frameWidth: 32, frameHeight: 32 }
        );
    }
    
    function create() {
        let background = this.add.image(400, 300, 'background');
        background.setScale(1);
        let tileset = this.add.image(0, 0, 'tileset');
        tileset.setScale(0.8);
        xLimit = 600;
        yLimit = 500;
        tileset.x = 400;
        tileset.y = 300;
    
        const characters = ['character', 'character2', 'character3', 'character4'];
        const random = Phaser.Utils.Array.GetRandom(characters);
        player = this.physics.add.sprite(tileset.x, tileset.y, random);
    
        const username = localStorage.getItem('username') || 'Player';
    
        usernameText = this.add.text(player.x, player.y - 30, username, {
            font: '16px Arial',
            fill: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: { left: 5, right: 5, top: 2, bottom: 2 },
        }).setOrigin(0.5);
    
        cursors = this.input.keyboard.createCursorKeys();
    
        this.cameras.main.setBounds(0, 0, xLimit, yLimit);
        this.cameras.main.startFollow(player);

        this.events.on("updateUsers", (updatedUsers) => {
            Object.keys(updatedUsers).forEach((username) => {
                if (username === currentUser) return;

                if (!otherPlayers[username]) {
                    otherPlayers[username] = this.physics.add.sprite(
                        updatedUsers[username].x,
                        updatedUsers[username].y,
                        "otherCharacter"
                    );
                    this.add.text(updatedUsers[username].x, updatedUsers[username].y - 40, username, {
                        font: "16px Arial",
                        fill: "#ffffff",
                    });
                } else {
                    otherPlayers[username].x = updatedUsers[username].x;
                    otherPlayers[username].y = updatedUsers[username].y;
                }
            });
        });
    }
    
    
    
    function update() {
        if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){
            // console.log(`${localStorage.getItem('username')}: {x: ${Math.round(player.x)}, y: ${Math.round(player.y)}}`);
        }
        if (cursors.left.isDown && player.x >= 200) {
            player.setVelocityX(-200);
        }
        else if (cursors.right.isDown && player.x <= xLimit) {
            player.setVelocityX(200);
        }
        else {
            player.setVelocityX(0);
        }
        if (cursors.up.isDown && player.y >= 100) {
            player.setVelocityY(-200);
        }
        else if (cursors.down.isDown && player.y <= yLimit) {
            player.setVelocityY(200);
        }
        else {
            player.setVelocityY(0);
        }
        usernameText.setPosition(player.x, player.y - 30);

        sendPosition({ x: player.x, y: player.y });

        this.events.emit("updateUsers", users);
        
    }


    return <div ref={phaserContainer} style={{ width: "800px", height: "600px" }} />;
};

export default Game;
