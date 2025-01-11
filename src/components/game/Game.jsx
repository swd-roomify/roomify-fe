import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import {config} from "./phaserConfig"

const Game = () => {
    const gameRef = useRef(null);
    const phaserContainer = useRef(null);

    useEffect(() => {
        if (!phaserContainer.current) return;

        const gameConfig = { ...config, parent: phaserContainer.current };

        gameRef.current = new Phaser.Game(gameConfig);

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
        };
    }, []);

    return <div ref={phaserContainer} style={{ width: "800px", height: "600px" }} />;
};

export default Game;
