import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "../Components/mapComponent";



//global elements / variable
const user_googleMapUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&v=3.exp&libraries=geometry,drawing,places";
const dataUrl="short_json_api.json"
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: false,
            vehicle_Id:0,
            vehicle_list:[],
            show_map:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({vechicalId: event.target.value}, ()=>{console.log(this.state);
            event.preventDefault();
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({show_map:true},()=>{console.log(this.state)})

    }

    fetchAPI = () =>{
 
        fetch(dataUrl,{
            method: 'get',
            headers: {"Content-Type": "application/json"},
          })
        .then(response => response.json())
        .then(data => {
           // this.setState({vechicalId: data[0].vehicle_id})
           const distinct_vechical = [...new Set(data.map(x => x.vehicle_id))]
           this.setState({vehicle_list: distinct_vechical})
           
           
        })
        .catch(error => console.log( error))  
    };
    
    componentDidMount = () =>{
        this.fetchAPI(); 
    }
            
    render() {
        let vechical_option = this.state.vehicle_list.map((x) =>{
            return <option key={x} value={x}>{x}</option>
        });
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-12">
                         <h1>Bus Tracker App</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                            Select Vechical:
                            <select value={this.state.vechicalId} onChange={this.handleChange} style={{"margin": '0px 10px'}}>
                                {vechical_option}   
                            </select>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className="col-6">
                        {/*<form onSubmit={this.handleSubmit}>
                            <label>
                            Select Speed of Vechical:
                            <select value={this.state.speed_map} onChange={this.speedHandleChange} style={{"margin": '0px 10px'}}>
                                <option key={0} value={0}>1</option>
                                <option key={1} value={1}>2</option>
                                <option key={2} value={2}>3</option>
                                <option key={3} value={3}>4</option>
                            </select>
                            </label>
        </form>*/}    
                    </div>
                </div>
                {this.state.show_map && 
                    <div className="row">
                        <div className="col-12">
                            <MapComponent   
                                googleMapURL={user_googleMapUrl}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px`, width: '100%' }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    </div>    
                }
                
                {/*<div className="row">
                    <div className="col-12">
                        <DummyComponent />
                    </div>
        </div>*/}

            </div>
        );
    }
};


export default Main;