import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from "jquery";


export default function game_init(root, channel) {
    ReactDOM.render(<Game channel={channel} />, root);
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: {},
            disableClick: false,
            firstCard: -1,
            secondCard: -1,
            matches: 0,
            guesses: 0
        };
        this.channel = props.channel;
        this.channel.join()
            .receive("ok", this.gotView.bind(this))
            .receive("error", resp => { console.log("Unable to join", resp) })

        this.sendClick = this.sendClick.bind(this)
        this.sendReset = this.sendReset.bind(this)
    }

    gotView(view) {
        this.setState(view.game);
        if (view.game.disableClick) {
            setTimeout(() => {
                this.channel.push("match")
                    .receive("ok", this.gotView.bind(this));
            }, 1500);
        }
    }

    sendClick(id) {
        this.channel.push("click", { index: id })
            .receive("ok", this.gotView.bind(this));
    }

    sendReset() {
        this.channel.push("reset")
            .receive("ok", this.gotView.bind(this));
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
                            flip={this.sendClick.bind(this)} /></p>
                    </div>
                    <div className="column">
                        <Card {...this.state.cards[x + 1]}
                            flip={this.sendClick.bind(this)} />
                    </div>
                    <div className="column">
                        <Card {...this.state.cards[x + 2]}
                            flip={this.sendClick.bind(this)} />
                    </div>
                    <div className="column">
                        <Card {...this.state.cards[x + 3]}
                            flip={this.sendClick.bind(this)} />
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="column"><button onClick={() => this.sendReset()}>{buttontxt}</button></div>
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