export default class EventEmitter {
    static _events = new Map();
 
    static on(name, listener) {
        if (this._events.has(name)) this._events.get(name).push(listener);
        else this._events.set(name,[listener]);
    }

    static removeListener(name, listenerToRemove) {
        if (this._events.has(name)) this._events.set(name, this._events.get(name).filter(l => l !== listenerToRemove))
        else throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
    }

    static emit(name, data) {
        if (this._events.has(name)) this._events.get(name).forEach(l => l(data));
        else throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }
}