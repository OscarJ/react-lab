
class DataRow extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value: {props.value},
        };
    }

    render(){
        const { value } = this.state;
        let columns = Object.keys(value);

        return(<tr>
            {columns.map(x => {
                return <td>{value[x]}</td>
            })}
        </tr>);
    }
}