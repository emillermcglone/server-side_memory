import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from "jquery";

export default function game_init(root) {
    ReactDOM.render(<Memory />, root);
}
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
        console.log(this.state.cards)
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

        /*for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        */
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
        return (
            <div>
                <div>
                    <p><button onClick={this.reset}>{buttontxt}</button></p>
                    <p>Guesses: {this.state.guesses}</p>
                    <p>Matches: {this.state.matches}</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="column">
                            <p><Card id={this.state.cards[0].id} value={this.state.cards[0].value}
                                matched={this.state.cards[0].matched} flipped={this.state.cards[0].flipped}
                                flip={this.flip.bind(this)} /></p>
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[1].id} value={this.state.cards[1].value}
                                matched={this.state.cards[1].matched} flipped={this.state.cards[1].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[2].id} value={this.state.cards[2].value}
                                matched={this.state.cards[2].matched} flipped={this.state.cards[2].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[3].id} value={this.state.cards[3].value}
                                matched={this.state.cards[3].matched} flipped={this.state.cards[3].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <p><Card id={this.state.cards[4].id} value={this.state.cards[4].value}
                                matched={this.state.cards[4].matched} flipped={this.state.cards[4].flipped}
                                flip={this.flip.bind(this)} /></p>
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[5].id} value={this.state.cards[5].value}
                                matched={this.state.cards[5].matched} flipped={this.state.cards[5].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[6].id} value={this.state.cards[6].value}
                                matched={this.state.cards[6].matched} flipped={this.state.cards[6].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[7].id} value={this.state.cards[7].value}
                                matched={this.state.cards[7].matched} flipped={this.state.cards[7].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <p><Card id={this.state.cards[8].id} value={this.state.cards[8].value}
                                matched={this.state.cards[8].matched} flipped={this.state.cards[8].flipped}
                                flip={this.flip.bind(this)} /></p>
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[9].id} value={this.state.cards[9].value}
                                matched={this.state.cards[9].matched} flipped={this.state.cards[9].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[10].id} value={this.state.cards[10].value}
                                matched={this.state.cards[10].matched} flipped={this.state.cards[10].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[11].id} value={this.state.cards[11].value}
                                matched={this.state.cards[11].matched} flipped={this.state.cards[11].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <p><Card id={this.state.cards[12].id} value={this.state.cards[12].value}
                                matched={this.state.cards[12].matched} flipped={this.state.cards[12].flipped}
                                flip={this.flip.bind(this)} /></p>
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[13].id} value={this.state.cards[13].value}
                                matched={this.state.cards[13].matched} flipped={this.state.cards[13].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[14].id} value={this.state.cards[14].value}
                                matched={this.state.cards[14].matched} flipped={this.state.cards[14].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                        <div className="column">
                            <Card id={this.state.cards[15].id} value={this.state.cards[15].value}
                                matched={this.state.cards[15].matched} flipped={this.state.cards[15].flipped}
                                flip={this.flip.bind(this)} />
                        </div>
                    </div>
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
            <div className="card">{props.value}</div>
        )
    } else {
        return (
            <div className="card" onClick={() => props.flip(props.id)}></div>
        )
    }
}


