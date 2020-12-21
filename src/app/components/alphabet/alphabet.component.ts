import { BehaviorSubject, Subject } from "rxjs";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-alphabet",
    templateUrl: "./alphabet.component.html",
    styleUrls: ["./alphabet.component.less"]
})
export class AlphabetComponent implements OnInit {
    public alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    @Output() selectChar: EventEmitter<string> = new EventEmitter();

    @Input()
    public activeChars$ = new BehaviorSubject<string[]>([]);

    public activeChars: string[] = [];

    public selectedChar$ = new Subject<string>();

    constructor() {}

    ngOnInit(): void {
        this.selectedChar$.subscribe(char => {
            this.selectChar.emit(char);
        });

        this.activeChars$.subscribe(activeChars => {
            this.activeChars = activeChars.sort();
            this.selectedChar$.next(activeChars[0]);
        });
    }

    onClickToLetter(char: string) {
        if (this.activeChars$.getValue().includes(char)) {
            this.selectedChar$.next(char);
        }
    }
}
