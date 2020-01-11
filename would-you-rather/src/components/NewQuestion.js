import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { handleAddQuestion } from '../actions/questions';

const NewQuestion = ({ dispatch, id }) => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const [toHome, setToHome] = useState(false);

  const handleChangeOptionOne = (e) => {
    e.preventDefault();
    setOptionOneText(e.target.value);
  };

  const handleChangeOptionTwo = (e) => {
    e.preventDefault();
    setOptionTwoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion({ optionOneText, optionTwoText }, id));

    setOptionOneText(''); setOptionTwoText('');
    setToHome(!id);
  };

  if (toHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h3 className="center">Add a new poll</h3>
      <form className="new-question" onSubmit={handleSubmit}>
        <h4>Would You Rather:</h4>
        <textarea
          placeholder="Option One"
          value={optionOneText}
          onChange={handleChangeOptionOne}
          className="textarea"
          maxLength={280}
        />
        <p />
        <textarea
          placeholder="Option Two"
          value={optionTwoText}
          onChange={handleChangeOptionTwo}
          className="textarea"
          maxLength={280}
        />
        <div className="btn">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={optionOneText === '' || optionTwoText === ''}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

NewQuestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  id: PropTypes.func,
};

export default connect()(NewQuestion);
