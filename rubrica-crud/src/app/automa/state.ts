import { Event } from "./event";

export interface State {
    next(event: Event): State;
}

export interface Automabile{
    goToRicerca();
    goToAggiungi();
    goToVisualizza();
    goToModifica();
    goToRimuovi();
}