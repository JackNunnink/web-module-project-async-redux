import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

import { fetchStart, fetchSuccess } from './actions';

import GifList from './components/GifList';

function App(props) {
  const { loading, error } = props

  useEffect(() => {
    props.fetchStart();
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=OhwNLm2OnVidWw1d9g6RlllCJSN3OhHc`)
      .then(res => {
        props.fetchSuccess(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <h1>Trending Gifs</h1>

      {
        (error !== "") && <h3>{error}</h3>
      }

      {
        loading ? <h3>We are loading</h3> : <GifList/>
      }

    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps, { fetchStart, fetchSuccess })(App);