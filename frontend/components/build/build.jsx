import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentDeck } from '../../actions/deck_actions';
import { getCards } from '../../actions/card_actions';
import CardForm from '../card/card_form';


class Build extends React.Component {

  constructor(props){
    super(props);

    this.deck_id = this.props.location.pathname
    .split("/")[this.props.location.pathname.split("/").length - 1];

  }

  componentDidMount(){
    this.props.setCurrentDeck(this.deck_id);
  }

  objEmpty(obj){
    if (Object.keys(obj).length === 0
    && obj.constructor === Object) {
      return true;
    }
    return false;
  }

  componentDidUpdate(){
    if (!this.objEmpty(this.props.currentDeck)
      && this.objEmpty(this.props.cards)
      && this.props.currentDeck.card_count > 0){
      this.props.retrieveCardsOfDeck(this.props.currentDeck);
    }
  }


  render(){
    var deckDisplay = !this.props.currentDeck ? "unknown"
    : <h1>{this.props.currentDeck.title}</h1>;

    var forms;
    if (!this.objEmpty(this.props.cards)){
      forms = Object.keys(this.props.cards).map((key, idx) => {
        return (<CardForm key={idx} card={this.props.cards[key]} />);
      });
    } else {
      forms = <p>Loading...</p>;
    }

    return(
      <div className="primaryComponent">
        <div className="deckPanelDisplaySubject">
          { deckDisplay }
        </div>
          { forms }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    currentDeck: state.decks.current,
    cards: state.cards.store,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentDeck: (id) => dispatch(getCurrentDeck(id)),
    retrieveCardsOfDeck: (deck) => dispatch(getCards(deck)),
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Build));
