import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "../Components/mapComponent";

// import ApiService from "./services/api";
// import Axios from 'axios';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: false,
        }
    }
    componentDidMount = () =>{
        this.delayedShownMarker();
    }
    delayedShownMarker = ()=>{
        setTimeout(()=>{
            this.setState({
                isMarkerShown:true,
                
            });
        },3000);
    }
    handleMarkerClick = () =>{
        this.setState({ isMarkerShown: false })
        this.delayedShownMarker();
    }
    
    render() {
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-12">
                         <h1>Bus Tracker App</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                       <h3>Select the bus from here</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <MapComponent 
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px`, width: '100%' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            isMarkerShown={this.state.isMarkerShown}
                            onMarkerClick={this.handleMarkerClick}
                        />
                    </div>
                </div>

            </div>
        );
    }
};


export default Main;