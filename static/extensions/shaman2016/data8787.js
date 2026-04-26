// Name: Data 8787
// ID: polzovatel_8787_data8787
// By: polzovatel_8787 <https://dashblocks.github.io/scratch-gui/user#7>
// License: MPL-2.0

(function (Scratch) {

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

  class polzovatel_8787_data8787 {
    constructor() {
      this.server = ''
      this.map = {}
      this.myName = ''
      this.myIp = '127.0.0.1'
      this.myId = '123abc'
    }

    getInfo() {
      return {
        id: "polzovatel8787data8787",
        name: "Data 8787",
        docsURL: "https://t-smod.github.io/extensions/static/documentation/data8787/",
        color1: "#99e417",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Server and config'
          }, {
            opcode: 'setServer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set server [url]',
            arguments: {
              url: {
                defaultValue: "https://127.0.0.1:3000/",
                type: Scratch.ArgumentType.STRING,
              }
            }
          }, {
            opcode: 'setName',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set name [name]',
            arguments: {
              name: {
                defaultValue: "5ee05ei90i0eu94wuf",
                type: Scratch.ArgumentType.STRING,
              }
            }
          }, {
            blockType: Scratch.BlockType.LABEL,
            text: 'Client'
          }, {
            opcode: 'setId',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set id [id]',
            arguments: {
              id: {
                defaultValue: "123abc",
                type: Scratch.ArgumentType.STRING,
              }
            }
          }, {
            opcode: 'getId',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get id'
          }, {
            opcode: 'getIp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get ip'
          }
        ],
      };
    }
    async setServer(args) {
      try {
        this.server = args.url
        this.map = await (await fetch(`${args.url}map`, {
          method: 'GET'
        })).json()
        const meta = await (await fetch(`${args.url}login`, {
          method: 'GET',
          body: JSON.stringify({
            name: this.myName
          })
        })).json()
        this.myIp = meta.client.ip
        this.myId = meta.client.id
      } catch (err) {
        console.error(err)
        alert(err.message)
      }
    }
    setName(args) {
      this.myName = args.name
    }
    setId(args) {
      this.myId = args.id
    }
    getId() {
      return this.myId
    }
    getIp() {
      return this.myIp
    }
  }
  Scratch.extensions.register(new polzovatel_8787_data8787());
})(Scratch);