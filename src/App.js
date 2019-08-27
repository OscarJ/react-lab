import React from 'react';
import Field from './controls/Field';
import DataRow from './controls/DataRow';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      people: [{
        name: 'Oscar',
        lastName: 'Jimenez',
        id: '112570842',
        city: 'Barva'
      },
      {
        name: 'Daniel',
        lastName: 'Hernandez',
        id: '112540211',
        city: 'Guarari'
      }]
    };
    // this.setState({
    //   people: 
    // });
  }

  handleClick = () => {
    let people = this.state.people;
    people.push({
      name: 'Andres',
      lastName: 'Gutierrez',
      id: '1123451012',
      city: 'San Rafael'
    });
    this.setState({ people: people });
  }

  render() {
    debugger;
    const people = this.state.people;
    return (
      <div className="App">
        <div class="leftMenu">
          <div>
            <Field label="Name" />
            <Field label="Last Name" />
            <Field label="ID" />
            <Field label="City" />
            <div className="row-fluid">
              <button className="btn btn-success" onClick={this.handleClick}>Save</button>
            </div>
          </div>
        </div>
        <div class="mainSection">
          <table className="table">
            <thead>
              <td>Nombre</td>
              <td>Apellido</td>
              <td>Cedula</td>
              <td>Ciudad</td>
            </thead>
            <tbody>
              {people.map(x => {
                return (<DataRow value={x}></DataRow>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
