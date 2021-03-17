import { RicercaState } from './stati';
import { State, Automabile } from './state';
import { Event } from './event';

export class Automa implements State {
    private stato: State;
    gui: Automabile;

    constructor(autom: Automabile) {
        this.gui = autom;
        this.stato = new RicercaState(this);
    }

    next(e: Event): State {
        console.log('Siamo nello stato ', this.stato);
        console.log('Ricevuto evento', e);
        this.stato = this.stato.next(e);
        console.log('Siamo passati nello stato ', this.stato)
        return this.stato;
    }
}