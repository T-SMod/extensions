/*
   This extension was made with TurboBuilder!
   https://turbobuilder-steel.vercel.app/
*/
(async function(Scratch) {
    const variables = {};
    const blocks = [];
    const menus = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    function doSound(ab, cd, runtime) {
        const audioEngine = runtime.audioEngine;

        const fetchAsArrayBufferWithTimeout = (url) =>
            new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let timeout = setTimeout(() => {
                    xhr.abort();
                    reject(new Error("Timed out"));
                }, 5000);
                xhr.onload = () => {
                    clearTimeout(timeout);
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
                    }
                };
                xhr.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error(`Failed to request ${url}`));
                };
                xhr.responseType = "arraybuffer";
                xhr.open("GET", url);
                xhr.send();
            });

        const soundPlayerCache = new Map();

        const decodeSoundPlayer = async (url) => {
            const cached = soundPlayerCache.get(url);
            if (cached) {
                if (cached.sound) {
                    return cached.sound;
                }
                throw cached.error;
            }

            try {
                const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
                const soundPlayer = await audioEngine.decodeSoundPlayer({
                    data: {
                        buffer: arrayBuffer,
                    },
                });
                soundPlayerCache.set(url, {
                    sound: soundPlayer,
                    error: null,
                });
                return soundPlayer;
            } catch (e) {
                soundPlayerCache.set(url, {
                    sound: null,
                    error: e,
                });
                throw e;
            }
        };

        const playWithAudioEngine = async (url, target) => {
            const soundBank = target.sprite.soundBank;

            let soundPlayer;
            try {
                const originalSoundPlayer = await decodeSoundPlayer(url);
                soundPlayer = originalSoundPlayer.take();
            } catch (e) {
                console.warn(
                    "Could not fetch audio; falling back to primitive approach",
                    e
                );
                return false;
            }

            soundBank.addSoundPlayer(soundPlayer);
            await soundBank.playSound(target, soundPlayer.id);

            delete soundBank.soundPlayers[soundPlayer.id];
            soundBank.playerTargets.delete(soundPlayer.id);
            soundBank.soundEffects.delete(soundPlayer.id);

            return true;
        };

        const playWithAudioElement = (url, target) =>
            new Promise((resolve, reject) => {
                const mediaElement = new Audio(url);

                mediaElement.volume = target.volume / 100;

                mediaElement.onended = () => {
                    resolve();
                };
                mediaElement
                    .play()
                    .then(() => {
                        // Wait for onended
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });

        const playSound = async (url, target) => {
            try {
                if (!(await Scratch.canFetch(url))) {
                    throw new Error(`Permission to fetch ${url} denied`);
                }

                const success = await playWithAudioEngine(url, target);
              if (!success) {
                    return await playWithAudioElement(url, target);
                }
            } catch (e) {
                console.warn(`All attempts to play ${url} failed`, e);
            }
        };

        playSound(ab, cd)
    }
    class Extension {
        getInfo() {
            return {
                "id": "Modals123",
                "name": "Modals++",
                "color1": "#7e00fd",
                "color2": "#4500a0",
                "color3": "#7700c5",
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        opcode: "alert-block",
        blockType: Scratch.BlockType.COMMAND,
        text: "alert [alert-text]",
        arguments: {
            "alert-text": {
                type: Scratch.ArgumentType.STRING,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["alert-block"] = async (args, util) => {
        alert(args["alert-text"])
    };

    blocks.push({
        opcode: "confirm-block",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "confirm [confirm-text]",
        arguments: {
            "confirm-text": {
                type: Scratch.ArgumentType.STRING,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["confirm-block"] = async (args, util) => {
        return confirm(args["confirm-text"])
    };

    blocks.push({
        opcode: "stage-bool",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "is in stage?",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["stage-bool"] = async (args, util) => {
        return (util.target !== undefined ? util.target.isStage : false)
    };

    blocks.push({
        opcode: "ds1970",
        blockType: Scratch.BlockType.REPORTER,
        text: "days since 1970",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["ds1970"] = async (args, util) => {
        return (Date.now() * 1 / 86400000)
    };

    blocks.push({
        opcode: "leap-year",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "leap year?",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["leap-year"] = async (args, util) => {
        return ((new Date(new Date(Date.now()).getYear(), 1, 29)).getDate() === 29)
    };

    blocks.push({
        opcode: "caller",
        blockType: Scratch.BlockType.COMMAND,
        text: "call blocks",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["caller"] = async (args, util) => {
        Scratch.vm.runtime.startHats(`${Extension.prototype.getInfo().id}_called`)
    };

    blocks.push({
        opcode: "prompt-block",
        blockType: Scratch.BlockType.REPORTER,
        text: "prompt [prompt-text]",
        arguments: {
            "prompt-text": {
                type: Scratch.ArgumentType.STRING,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["prompt-block"] = async (args, util) => {
        return prompt(args["prompt-text"])
    };

    blocks.push({
        opcode: "called",
        blockType: Scratch.BlockType.EVENT,
        text: "when this block called",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["called"] = async (args, util) => {};

    Scratch.extensions.register(new Extension());
})(Scratch);
