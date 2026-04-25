// Name: Dash Api
// ID: polzovatel_8787_dashApi
// Description: An extension for interacting with the Dash api. It ONLY works in Dash.
// By: polzovatel_8787 <https://dashblocks.github.io/scratch-gui/user#7>
// License: MPL-2.0

(function (Scratch) {

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

    class polzovatel_8787_dashApi {
      getInfo() {
        return {
          id: "polzovatel8787dashApi",
          name: "Dash Api",
          docsURL: "https://shaman2016scratch.github.io/ext-docs/dashapi/",
          color1: "#ff8f4d",
          blocks: [
            {
              blockType: Scratch.BlockType.LABEL,
              text: 'Login and regeneration'
            }, {
              opcode: "isLogin",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "is login?",
              arguments: {}
            }, {
              blockType: Scratch.BlockType.LABEL,
              text: 'Session'
            }, {
              opcode: "getMyUsername",
              blockType: Scratch.BlockType.REPORTER,
              text: "username",
              arguments: {}
            }, {
              opcode: "getMyId",
              blockType: Scratch.BlockType.REPORTER,
              text: "user id",
              arguments: {}
            }, {
              opcode: "getMyRole",
              blockType: Scratch.BlockType.REPORTER,
              text: "role",
              arguments: {}
            }, {
              opcode: "getMyAvatar",
              blockType: Scratch.BlockType.REPORTER,
              text: "avatar url",
              arguments: {}
            }
          ],
        };
      }
async isLogin() {
  const req = await fetch('https://dashblocks-server.vercel.app/session', {
    credentials: 'include'
  })
  ret = false
  if (req) {
    ret = true
  }
  return ret
}
async getMyUsername() {
  async function isLogin() {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    let ret = false
    if (req) {
      ret = true
    }
    return ret
  }
  let ret = ''
  if (iLogin()) {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    const res = await req.json()
    ret = res.username
  }
  return ret
}
async getId() {
  async function isLogin() {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    let ret = false
    if (req) {
      ret = true
    }
    return ret
  }
  let ret = 0
  if (isLogin()) {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    const res = await req.json()
    ret = res.userId
  }
  return ret
}
async getMyRole() {
  async function isLogin() {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    let ret = false
    if (req) {
      ret = true
    }
    return ret
  }
  let ret = ''
  if (isLogin()) {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    const res = await req.json()
    ret = res.role || "dasher"
  }
  return ret
}
async getMyAvatar() {
  async function isLogin() {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    let ret = false
    if (req) {
      ret = true
    }
    return ret
  }
  let ret = ''
  if (isLogin()) {
    const req = await fetch('https://dashblocks-server.vercel.app/session', {
      credentials: 'include'
    })
    const res = await req.json()
    ret = `https://dashblocks-server.vercel.app/users/avatars/${res.profile.avatarId}`
  }
  return ret
}
    }
    Scratch.extensions.register(new polzovatel_8787_dashApi());
  })(Scratch);