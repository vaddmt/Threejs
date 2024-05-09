import * as COMMAND from './command.js';

const COMMAND_TYPE = {
    Load: 0,
}
class CommandManager {
    _undoStack;
    _redoStack;

    constructor() {
        this._undoStack = [];
        this._redoStack = [];
    }

    execute(args) {
        let command = undefined;
        switch (args.type) {
            case COMMAND_TYPE.Load:
                command = new COMMAND.Load(args.argument);
                break;
            default:
                return;
        }

        command.do();
        this._undoStack.push(command);
        this._redoStack = [];
    }

    undo() {
        if (this._undoStack.length > 0) {
            const command = this._undoStack.pop();
            command.undo();
            this._redoStack.push(command);
        }
    }

    redo() {
        if (this._redoStack.length > 0) {
            const command = this._redoStack.pop();
            command.do();
            this._undoStack.push(command);
        }
    }
}

const commandManager = new CommandManager();

export { commandManager }