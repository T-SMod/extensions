// Name: Request Information
// ID: reqInfoBy8787
// Description: An extension that receives user data and their device
// By: SHAMAN2016 <https://scratch.mit.edu/users/SHAMAN2016/>
// License: MPL-2.0

(function (Scratch) {

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }
  async function getRequ() {
    let a = await fetch("https://api-shaman2016.vercel.app/req")
    a = await a.json()
    return a
  }

    class reqInfoBy8787 {
      getInfo() {
        return {
          id: "reqInfoBy8787",
          name: "Request Information",
          docsURL: "https://shaman2016scratch.github.io/ext-docs/reqExt/",
          color1: "#a3c0e1",
          blocks: [
            {
              opcode: "getUA",
              blockType: Scratch.BlockType.REPORTER,
              text: "get User Agent",
              arguments: {}
            }, {
              opcode: "getIP",
              blockType: Scratch.BlockType.REPORTER,
              text: "get Internet Protocol",
              arguments: {}
            }, {
              opcode: "getReq",
              blockType: Scratch.BlockType.OBJECT,
              text: "get Request",
              arguments: {}
            }, {
              opcode: "getCity",
              blockType: Scratch.BlockType.REPORTER,
              text: "get City",
              arguments: {}
            }, {
              opcode: "getCountry",
              blockType: Scratch.BlockType.REPORTER,
              text: "get Country",
              arguments: {}
            }, {
              opcode: "getLang",
              blockType: Scratch.BlockType.REPORTER,
              text: "get Language",
              arguments: {}
            }, {
              opcode: "getPlatform",
              blockType: Scratch.BlockType.REPORTER,
              text: "get Platform",
              arguments: {}
            }, {
              opcode: "getTime",
              blockType: Scratch.BlockType.REPORTER,
              text: "get Timezone",
              arguments: {}
            }, {
              opcode: "getHeader",
              blockType: Scratch.BlockType.REPORTER,
              text: "get Header [name]",
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "origin"
                }
              }
            }, {
              opcode: "getResult",
              blockType: Scratch.BlockType.OBJECT,
              text: "get Result",
              arguments: {}
            }, {
              opcode: "getScratchMod",
              blockType: Scratch.BlockType.REPORTER,
              text: "get Scratch Modification",
              arguments: {}
            }
          ],
        };
      }
async getReq() {
  let a = await fetch("https://api-shaman2016.vercel.app/req")
  a = await a.json()
  return a
}
async getUA(args) {
  let a = await getRequ()
  return a.result["user-agent"]
}
async getIP(args) {
  let a = await getRequ()
  return a.result["ip"]
}
async getCity(args) {
  let a = await getRequ()
  return a.result.headers["x-vercel-ip-city"]
}
async getCountry(args) {
  let a = await getRequ()
  return a.result.headers["x-vercel-ip-country"]
}
async getLang() {
  let a = await getRequ()
  return a.result.headers["accept-language"]
}
async getPlatform() {
  let a = await getRequ()
  return a.result.headers["sec-ch-ua-platform"]
}
async getTime() {
  let a = await getRequ()
  return a.result.headers["x-vercel-ip-timezone"]
}
async getHeader(args) {
  let a = await getRequ()
  return a.result.headers[args.name]
}
async getResult() {
  let a = await getRequ()
  return a.result
}
async getScratchMod() {
  let a = await getRequ()
  let b = a.result.headers["origin"]
  let c
  if (b === "https://dashblocks.github.io") {
    c = "dash"
  } else if (b === "https://studio.penguinmod.com") {
    c = "pm"
  } else if (b === "https://t-smod.github.io") {
    c = "TSMod"
  } else {
    с = a.result.headers["origin"]
  }
  return c
}
    }
    Scratch.extensions.register(new reqInfoBy8787());
  })(Scratch);