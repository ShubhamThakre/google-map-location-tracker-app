import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap,Marker,Polyline} from 'react-google-maps'

class Map extends React.Component {
  constructor(props){
      super(props);
      this.state={
        progress:[
            { lat: 15.525326666666666, lng: 74.90859166666667  },
            { lat: 15.520658333333333, lng: 74.91455666666667},
            
        ]
      }
  }  
  render = () => {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 15.525326666666666, lng: 74.90859166666667 }}
        >
        {this.props.isMarkerShown &&( 
            <>
                <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 " }} />
                <Marker 
                    position={this.state.progress[this.state.progress.length -1]} 
                    onClick={this.props.onMarkerClick} 
                />
            </>
        )}
      </GoogleMap>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(Map))

export default MapComponent;