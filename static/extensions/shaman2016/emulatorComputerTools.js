// Name: Emulator Computer Tools
// ID: polzovatel8787EmulatorCompTools
// By: polzovatel_8787 <https://dashblocks.github.io/scratch-gui/user#7>
// License: MPL-2.0

(function (Scratch) {

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

  class polzovatel8787EmulatorCompTools {
    constructor() {
      this.accounts = {}
      this.sysConfig = {}
      this.fs = {}
      this.os = ''
    }

    getInfo() {
      return {
        id: "polzovatel8787EmulatorCompTools",
        name: "Emulator Computer Tools",
        docsURL: "https://t-smod.github.io/extensions/static/documentation/EmulatorCompTools/",
        color1: "#17dde4",
        blocks: [],
      };
    }
  }
  Scratch.extensions.register(new polzovatel8787EmulatorCompTools());
})(Scratch);