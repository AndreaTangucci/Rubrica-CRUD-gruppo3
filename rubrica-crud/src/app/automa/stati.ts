import { Automa } from './automa';
import { AddEvent, SelezionaEvent, RicercaEvent, AnnullaEvent, ConfermaEvent, RimuoviEvent, ModificaEvent } from './eventi';
import { State } from "./state";

export class RicercaState implements State {

    constructor(public automa: Automa) {
        automa.gui.goToRicerca();
    }

    next(e: Event): State {
        if (e instanceof AddEvent) {
            return new AggiungiState(this.automa);
        } else if (e instanceof SelezionaEvent) {
            return new VisualizzaState(this.automa);
        } else if (e instanceof RicercaEvent) {
            return new RicercaState(this.automa);
        } else {
            console.log('Ricevuto evento inatteso');
        }
    }
}

export class AggiungiState implements State {

    constructor(public automa: Automa) {
        automa.gui.goToAggiungi();
    }

    next(e: Event): State {
        if (e instanceof AnnullaEvent) {
            return new RicercaState(this.automa);
        } else if (e instanceof ConfermaEvent) {
            return new VisualizzaState(this.automa);
        } else {
            console.log('Ricevuto evento inatteso');
        }
    }
}

export class VisualizzaState implements State {

    constructor(public automa: Automa) {
        automa.gui.goToVisualizza();
    }

    next(e: Event): State {
        if (e instanceof RimuoviEvent) {
            return new RimuoviState(this.automa);
        } else if (e instanceof ModificaEvent) {
            return new ModificaState(this.automa);
        } else if (e instanceof RicercaEvent) {
            return new RicercaState(this.automa);
        } else if (e instanceof SelezionaEvent) {
            return new VisualizzaState(this.automa);
        } else if (e instanceof AddEvent) {
            return new AggiungiState(this.automa);
        } else {
            console.log('Ricevuto evento inatteso');
        }
    }
}

export class ModificaState implements State {

    constructor(public automa: Automa) {
        automa.gui.goToModifica();
    }

    next(e: Event): State {
        if (e instanceof AnnullaEvent) {
            return new VisualizzaState(this.automa);
        } else if (e instanceof ConfermaEvent) {
            return new VisualizzaState(this.automa);
        } else {
            console.log('Ricevuto evento inatteso');
        }
    }
}

export class RimuoviState implements State {

    constructor(public automa: Automa) {
        automa.gui.goToRimuovi();
    }

    next(e: Event): State {
        if (e instanceof AnnullaEvent) {
            return new VisualizzaState(this.automa);
        } else if (e instanceof ConfermaEvent) {
            return new RicercaState(this.automa);
        } else {
            console.log('Ricevuto evento inatteso');
        }
    }
}