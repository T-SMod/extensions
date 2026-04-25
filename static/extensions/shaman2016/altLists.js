// Name: Alternative Lists
// ID: shaman2016list
// Description: Alternative lists
// By: SHAMAN2016 <https://scratch.mit.edu/users/SHAMAN2016/>
// License: MPL-2.0

(function (Scratch) {

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

    class shaman2016list {
      constructor() {
        this.lists = {}
        this.selectedList = ''
      }
      
      getInfo() {
        return {
          id: "shaman2016list",
          name: 'lists',
          docs: "https://shaman2016scratch.github.io/ext-docs/altLists/",
          color1: "#ff6629",
          blocks: [
            {
              opcode: "getList",
              blockType: Scratch.BlockType.ARRAY,
              text: "get array from list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "setItemList",
              blockType: Scratch.BlockType.COMMAND,
              text: "set item [item] value [value] in list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                item: {
                  defaultValue: 1,
                  type: Scratch.ArgumentType.NUMBER,
                },
                value: {
                  defaultValue: "item",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "newItemList",
              blockType: Scratch.BlockType.COMMAND,
              text: "new item [value] in list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                value: {
                  defaultValue: "item",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "newItemIndex",
              blockType: Scratch.BlockType.COMMAND,
              text: "new item [value] of index [index] in list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                value: {
                  defaultValue: "item",
                  type: Scratch.ArgumentType.STRING,
                },
                index: {
                  defaultValue: 0,
                  type: Scratch.ArgumentType.NUMBER,
                },
              }
            }, {
              opcode: "getItemList",
              blockType: Scratch.BlockType.REPORTER,
              text: "get item [item] in list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                item: {
                  defaultValue: 1,
                  type: Scratch.ArgumentType.NUMBER,
                }
              }
            }, {
              opcode: "getLengthList",
              blockType: Scratch.BlockType.REPORTER,
              text: "get length list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "deleteItemList",
              blockType: Scratch.BlockType.COMMAND,
              text: "delete item [item] in list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                item: {
                  defaultValue: 1,
                  type: Scratch.ArgumentType.NUMBER,
                }
              }
            }, {
              opcode: "getItemIndexList",
              blockType: Scratch.BlockType.REPORTER,
              text: "get item for value [value] in list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                value: {
                  defaultValue: "item",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "setList",
              blockType: Scratch.BlockType.COMMAND,
              text: "set list [list] of array [array]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                array: {
                  defaultValue: ['one item', 'two item', 'index the item = 2'],
                  type: Scratch.ArgumentType.ARRAY,
                }
              }
            }, {
              opcode: "createList",
              blockType: Scratch.BlockType.COMMAND,
              text: "create list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "clearList",
              blockType: Scratch.BlockType.COMMAND,
              text: "clear list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "itemReal",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "item [text] in list [list]?",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                },
                text: {
                  defaultValue: "item",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "deleteList",
              blockType: Scratch.BlockType.COMMAND,
              text: "delete list [list]",
              arguments: {
                 list: {
                  defaultValue: "my list",
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              blockType: Scratch.BlockType.LABEL,
              text: 'Save'
            }, {
              opcode: "importL",
              blockType: Scratch.BlockType.COMMAND,
              text: "import [key]",
              arguments: {
                 key: {
                  defaultValue: {},
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "exportL",
              blockType: Scratch.BlockType.REPORTER,
              text: "export",
              arguments: {}
            }, {
              blockType: Scratch.BlockType.LABEL,
              text: 'Selected list'
            }, {
              opcode: "getSelectedList",
              blockType: Scratch.BlockType.ARRAY,
              text: "get array selected list",
              arguments: {}
            }, {
              opcode: "selectList",
              blockType: Scratch.BlockType.COMMAND,
              text: "select list [list]",
              arguments: {
                 list: {
                  defaultValue: 'my list',
                  type: Scratch.ArgumentType.STRING,
                }
              }
            }, {
              opcode: "unselectList",
              blockType: Scratch.BlockType.COMMAND,
              text: "unselect list",
              arguments: {}
            }, {
              opcode: "deleteSelectedList",
              blockType: Scratch.BlockType.COMMAND,
              text: "detele selected list",
              arguments: {}
            }
          ],
        };
      }
      getList(args) {
        return this.lists[args.list].value
      }
      setItemList(args) {
        this.lists[args.list].value[args.item] = args.value
      }
      newItemList(args) {
        this.lists[args.list].value.push(args.value)
      }
      getItemList(args) {
        return this.lists[args.list].value[args.item]
      }
      getLengthList(args) {
        return this.lists[args.list].value.length
      }
      deleteItemList(args) {
        this.lists[args.list].value.splice(args.item, 1)
      }
      getItemIndexList(args) {
        return this.lists[args.list].value.indexOf(args.value)
      }
      setList(args) {
        this.lists[args.list].value = args.array
      }
      createList(args) {
        if (this.lists[args.list]) {
          console.error('This list exists')
          alert('Error: This list exists')
        } else {
          this.lists[args.list] = {
            value: []
          }
        }
      }
      importL(args) {
        this.lists = args.key
      }
      exportL() {
        return this.lists
      }
      getSelectedList() {
        return this.lists[this.selectedList].value
      }
      selectList(args) {
        this.selectedList = args.list
      }
      newItemIndex(args) {
        this.lists[args.list].value.splice(args.index, 1, args.value)
      }
      clearList(args) {
        this.lists[args.list].value = []
      }
      itemReal(args) {
        return this.lists[args.list].value.indexOf(args.text) !== -1
      }
      deleteList(args) {
        delete this.lists[args.list]
      }
      unselectList() {
        this.selectedList = ''
      }
      deleteSelectedList() {
        delete this.lists[this.selectedList]
      }
    }
    Scratch.extensions.register(new shaman2016list());
  })(Scratch);