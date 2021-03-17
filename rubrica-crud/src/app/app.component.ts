import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Automa } from './automa/automa';
import { AddEvent, AnnullaEvent, ConfermaEvent, ModificaEvent, RicercaEvent, RimuoviEvent, SelezionaEvent } from './automa/eventi';
import { Automabile, State } from './automa/state';
import { AggiungiState, ModificaState, RimuoviState } from './automa/stati';
import { Contatto } from './contatto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements Automabile, OnInit{

  contatto: Contatto = new Contatto();
  contattomod: Contatto = new Contatto();
  rubrica: Contatto[] = [];
  criterio: string = "";
  automa: Automa;
  stato: State;

  ngOnInit(): void {
    this.automa = new Automa(this);
  }

  // proprietà gui
  buttonNuovaVisible: boolean = false;
  formDivVisible: boolean = false;
  campiNonEditabili: boolean = false;
  confAnnVisible: boolean = false;
  searchVisible: boolean = false;

  goToAggiungi() {
    this.buttonNuovaVisible = false;
    this.formDivVisible = true;
    this.campiNonEditabili = false;
    this.confAnnVisible = true;
    this.searchVisible = false;
  }

  goToModifica() {
    this.buttonNuovaVisible = false;
    this.formDivVisible = true;
    this.campiNonEditabili = false;
    this.confAnnVisible = true;
    this.searchVisible = false;
  }

  goToRicerca() {
    this.buttonNuovaVisible = true;
    this.formDivVisible = false;
    // this.campiNonEditabili = true;
    // this.confAnnVisible = true;
    this.searchVisible = true;
  }

  goToRimuovi() {
    this.buttonNuovaVisible = false;
    this.formDivVisible = true;
    this.campiNonEditabili = true;
    this.confAnnVisible = true;
    this.searchVisible = false;
  }

  goToVisualizza() {
    this.buttonNuovaVisible = true;
    this.formDivVisible = true;
    this.campiNonEditabili = true;
    this.confAnnVisible = false;
    this.searchVisible = true;
  }

  nuovo() {
    this.contatto = new Contatto();
    this.stato = this.automa.next(new AddEvent());
  }

  modifica() {
    this.stato = this.automa.next(new ModificaEvent());
  }

  conferma() {
    console.log(this.stato);
    if (this.stato instanceof AggiungiState){
      console.log("Conferma di Aggiungi");
      this.rubrica.push(this.contatto);
    }else if (this.stato instanceof ModificaState){

    }else if (this.stato instanceof RimuoviState){
      this.rubrica.splice(this.rubrica.indexOf(this.contatto), 1);
    }else{
      console.log ("stato non conosciuto");
    }
    this.automa.next(new ConfermaEvent);
    this.contatto = new Contatto();
  }

  annulla() {
    this.stato = this.automa.next(new AnnullaEvent());
  }

  cerca(criterio: string) {
    this.stato = this.automa.next(new RicercaEvent());
  }

  rimuovi() {
    this.stato = this.automa.next(new RimuoviEvent());
  }

  seleziona(c: Contatto){
    this.stato =  this.automa.next(new SelezionaEvent());
    this.contatto = c;
  }
}
