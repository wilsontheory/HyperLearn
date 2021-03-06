import * as APIUtils from "../utils/subject_api_utils";

export const RECEIVE_SUBJECTS = 'RECEIVE_SUBJECTS';
export const RECEIVE_CURRENT_SUBJECT = 'RECEIVE_CURRENT_SUBJECT';
export const RECEIVE_SUBJECT_ERRORS = 'RECEIVE_SUBJECT_ERRORS';
export const RECEIVE_FOLLOWED_SUBJECT = 'RECEIVE_FOLLOWED_SUBJECT';
export const RECEIVE_SEARCHED_SUBJECTS = 'RECEIVE_SEARCHED_SUBJECTS';


export const getSubjects = () => dispatch => {
  return APIUtils.getSubjects()
    .then(subjects => dispatch(receiveSubjects(subjects)),
    error => dispatch(receiveSubjectErrors(error)));
};

export const createSubject = (newSubject) => dispatch => {
  return APIUtils.createSubject(newSubject)
    .then(subjects => dispatch(receiveSubjects(subjects)),
    error => dispatch(receiveSubjectErrors(error)));
};

export const editSubject = (editedSubject) => dispatch => {
  return APIUtils.editSubject(editedSubject)
    .then(subjects => dispatch(receiveSubjects(subjects)),
    error => dispatch(receiveSubjectErrors(error)));
};

export const deleteSubject = (id) => dispatch => {
  return APIUtils.deleteSubject(id)
    .then(subjects => dispatch(receiveSubjects(subjects)),
    error => dispatch(receiveSubjectErrors(error)));
};

export const sendFollow = (subjectId) => dispatch => {
  return APIUtils.sendFollow(subjectId)
    .then(subject => dispatch(receiveFollowedSubject(subject)),
    error => dispatch(receiveSubjectErrors(error)));
};

export const sendFollowDeletion = (subjectId) => dispatch => {
  return APIUtils.sendFollowDeletion(subjectId)
    .then(subjects => dispatch(receiveSubjects(subjects)),
    error => dispatch(receiveSubjectErrors(error)));
};

export const sendQueryForSubjects = (term) => dispatch => {
  return APIUtils.sendQueryForSubjects(term)
    .then(subjects => dispatch(receiveSearchedSubjects(subjects)),
    error => dispatch(receiveSubjectErrors(error)));
};

export const receiveSubjects = (subjects) => {
  return {
    type: RECEIVE_SUBJECTS,
    data: subjects,
  };
};

export const receiveFollowedSubject = (subject) => {
  return {
    type: RECEIVE_FOLLOWED_SUBJECT,
    data: subject,
  };
};

export const receiveSearchedSubjects = (subjects) => {
  return {
    type: RECEIVE_SEARCHED_SUBJECTS,
    data: subjects,
  };
};

export const receiveSubjectErrors = (errors) => {
  return {
    type: RECEIVE_SUBJECT_ERRORS,
    data: errors
  };
};

export const receiveCurrentSubject = (subject) => {
  return {
    type: RECEIVE_CURRENT_SUBJECT,
    data: subject,
  };
};
