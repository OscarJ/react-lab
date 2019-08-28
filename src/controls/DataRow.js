import React from 'react';

export default class DataRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            active: props.active || false
        };
    }

    handleClick = () => {
        this.setState({ active: !this.state.active });
    }

    render() {
        debugger;
        const { value, active } = this.state;
        let columns = Object.keys(value);

        return (<tr onClick={this.handleClick} className={active ? 'table-active' : ''}>
            {columns.map(x => {
                return <td>{value[x]}</td>
            })}
        </tr>);
    }
}