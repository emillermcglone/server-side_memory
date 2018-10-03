import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from "jquery";

export default function game_init(root) {
    ReactDOM.render(<Memory />, root);
}

/*Attribution https://github.com/emillermcglone/Spr18memory/blob/master/assets/js/game.jsx*/
class Memory extends React.Component {
    constructor(props) {
        super(props);
        this.checkMatch = this.checkMatch.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            cards: this.initializeCards(),

            disableClick: false,
            lastCard: -1,
            matches: 0,
            guesses: 0,
        };
    }

    initializeCards() {
        var cards = [
            { id: 0, value: "A", matched: false, flipped: false },
            { id: 1, value: "A", matched: false, flipped: false },
            { id: 2, value: "B", matched: false, flipped: false },
            { id: 3, value: "B", matched: false, flipped: false },
            { id: 4, value: "C", matched: false, flipped: false },
            { id: 5, value: "C", matched: false, flipped: false },
            { id: 6, value: "D", matched: false, flipped: false },
            { id: 7, value: "D", matched: false, flipped: false },
            { id: 8, value: "E", matched: false, flipped: false },
            { id: 9, value: "E", matched: false, flipped: false },
            { id: 10, value: "F", matched: false, flipped: false },
            { id: 11, value: "F", matched: false, flipped: false },
            { id: 12, value: "G", matched: false, flipped: false },
            { id: 13, value: "G", matched: false, flipped: false },
            { id: 14, value: "H", matched: false, flipped: false },
            { id: 15, value: "H", matched: false, flipped: false }
        ];

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }

        for (let i = 0; i < 16; i++) {
            cards[i].id = i;
        }
        return cards;
    }

    flip(id) {
        if (this.state.disableClick == -1) {
            return;
        }
        let stateCopy = $.extend({}, this.state);
        stateCopy.cards[id].flipped = true;
        if (this.state.disableClick) {
            stateCopy.disableClick = -1;
            this.setState(stateCopy);
            setTimeout(() => { this.checkMatch(id); }, 1500);
        }
        else {
            stateCopy.lastCard = id;
            stateCopy.disableClick = true;
            this.setState(stateCopy);
        }
    }

    checkMatch(id) {
        let stateCopy = $.extend({}, this.state);
        if (stateCopy.cards[stateCopy.lastCard].value == stateCopy.cards[id].value) {
            stateCopy.matches = stateCopy.matches + 1
            stateCopy.cards[stateCopy.lastCard].matched = true;
            stateCopy.cards[id].matched = true;
        }
        else {
            stateCopy.cards[stateCopy.lastCard].flipped = false;
            stateCopy.cards[id].flipped = false;
        }
        stateCopy.lastCard = -1;
        stateCopy.disableClick = false;
        stateCopy.guesses = stateCopy.guesses + 1;
        this.setState(stateCopy);
    }

    reset() {
        let stateCopy = {
            cards: this.initializeCards(),
            disableClick: false,
            lastCard: -1,
            matches: 0,
            guesses: 0
        };
        this.setState(stateCopy);
    }

    render() {
        var buttontxt = "Reset";
        if (this.state.matches == 8) {
            buttontxt = "Play Again";
        }

        let cardDivs = []
        for (let i = 0; i < 4; i++) {
            const x = i * 4;
            cardDivs.push(
                <div key={i} className="row">
                    <div className="column">
                        <p><Card {...this.state.cards[x + 0]}
                            flip={this.flip.bind(this)} /></p>
                    </div>
                    <div className="column">
                        <Card {...this.state.cards[x + 1]}
                            flip={this.flip.bind(this)} />
                    </div>
                    <div className="column">
                        <Card {...this.state.cards[x + 2]}
                            flip={this.flip.bind(this)} />
                    </div>
                    <div className="column">
                        <Card {...this.state.cards[x + 3]}
                            flip={this.flip.bind(this)} />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="column"><button onClick={this.reset}>{buttontxt}</button></div>
                        <div className="column">Guesses: {this.state.guesses}</div>
                        <div className="column"><p>Matches: {this.state.matches}</p></div>
                    </div>
                    {cardDivs}
                </div>
            </div >
        );
    }
}

function Card(props) {
    if (props.matched) {
        return (
            <div className="matched card">{props.value}</div>
        )
    } else if (props.flipped) {
        return (
            <div className="flipped card">{props.value}</div>
        )
    } else {
        return (
            <div className="card" onClick={() => props.flip(props.id)}></div>
        )
    }
}
