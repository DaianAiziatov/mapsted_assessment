import React, { Component } from 'react';
import Sorter from './components/Sorter';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
            <Sorter />
        </div>
    );
  }
}
