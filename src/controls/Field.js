
class Field extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value: '',
        };
    }

    render(){
        const { label } = this.props;
        return(<div>
            <span>{label}</span>
            <input />
        </div>);
    }
}