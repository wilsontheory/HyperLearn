import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveCurrentSubject, sendFollowDeletion } from '../../actions/subject_actions';
import { getDecks } from '../../actions/deck_actions';


class SubjectPanelItem extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleModifyRedirect = this.handleModifyRedirect.bind(this);
    this.handleDeleteFollow = this.handleDeleteFollow.bind(this);
  }

  handleClick(e){
    this.props.sendCurrentSubject(this.props.subject);
    this.props.retrieveDecksOfSubject(this.props.subject);
  }

  handleModifyRedirect(e){
    e.stopPropagation();
    this.props.history.push(`/home/subject/modify/${this.props.subject.id}`);
  }

  handleModifyRedirect(e){
    e.stopPropagation();
    this.props.history.push(`/home/subject/modify/${this.props.subject.id}`);
  }

  handleDeleteFollow(e){
    e.stopPropagation();
    this.props.sendFollowDeletion(this.props.subject.id);
  }



  render(){

    var editButton;
    if (this.props.subject.made_by_current_user){
      editButton = <button onClick={this.handleModifyRedirect}>modify</button>;
    } else {
      editButton = <button onClick={this.handleDeleteFollow}>unfollow</button>;
    }

    return(
      <div className="homeSubjectItem" onClick={this.handleClick}>
        <div className="horizContainer">
          <div className="vertContainerListing">
            <big>{ this.props.subject.title }</big>
            <small>cards: { this.props.subject.card_count }</small>
            <small>mastery: { this.props.subject.mastery }%</small>
          </div>
          <div style={{"width": "20%"}}>
            <div className="vertButtonRack">
              {editButton}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    sendCurrentSubject: (subject) => dispatch(receiveCurrentSubject(subject)),
    retrieveDecksOfSubject: (subject) => dispatch(getDecks(subject)),
    sendFollowDeletion: (subjectId) => dispatch(sendFollowDeletion(subjectId)),
  };
};


export default withRouter(connect(null, mapDispatchToProps)(SubjectPanelItem));
