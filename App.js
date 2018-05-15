import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends Component {

   state = {
       location: null,
       errorMess: null,
       layer : [{"type":"Feature","id":"5a26ebf74334899ea1b68287","geometry":{"type":"Point","coordinates":[-84.47129958,10.29977445]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.38","properties.CATEGORIA":"P1","properties.HOJA":"QUESADA","_id":"5a26ebf74334899ea1b68287","type":"Feature","properties.NOMBRE":"LA CULEBRA"}},{"type":"Feature","id":"5a26ebf74334899ea1b68288","geometry":{"type":"Point","coordinates":[-84.50410697,10.30170517]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.39","properties.CATEGORIA":"P1","properties.HOJA":"SAN LORENZO","_id":"5a26ebf74334899ea1b68288","type":"Feature","properties.NOMBRE":"ALTO GLORIA"}},{"type":"Feature","id":"5a26ebf74334899ea1b68289","geometry":{"type":"Point","coordinates":[-83.87685131,10.30361305]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.40","properties.CATEGORIA":"P2","properties.HOJA":"GUAPILES","_id":"5a26ebf74334899ea1b68289","type":"Feature","properties.NOMBRE":"FINCA ZONA 8"}},{"type":"Feature","id":"5a26ebf74334899ea1b6828a","geometry":{"type":"Point","coordinates":[-83.89818116,10.30651393]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.42","properties.CATEGORIA":"P2","properties.HOJA":"GUAPILES","_id":"5a26ebf74334899ea1b6828a","type":"Feature","properties.NOMBRE":"COLONIA VILLALOBOS"}},{"type":"Feature","id":"5a26ebf74334899ea1b6828b","geometry":{"type":"Point","coordinates":[-84.38925703,10.30466791]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.41","properties.CATEGORIA":"P1","properties.HOJA":"QUESADA","_id":"5a26ebf74334899ea1b6828b","type":"Feature","properties.NOMBRE":"FINCA PRADERA"}},{"type":"Feature","id":"5a26ebf74334899ea1b6828c","geometry":{"type":"Point","coordinates":[-83.86386941,10.30654655]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.43","properties.CATEGORIA":"P2","properties.HOJA":"GUAPILES","_id":"5a26ebf74334899ea1b6828c","type":"Feature","properties.NOMBRE":"FINCA ZONA 7"}},{"type":"Feature","id":"5a26ebf74334899ea1b6828d","geometry":{"type":"Point","coordinates":[-84.41081795,10.30702776]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.44","properties.CATEGORIA":"P3","properties.HOJA":"QUESADA","_id":"5a26ebf74334899ea1b6828d","type":"Feature","properties.NOMBRE":"COLON"}},{"type":"Feature","id":"5a26ebf74334899ea1b6828e","geometry":{"type":"Point","coordinates":[-84.46285782,10.30723687]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.45","properties.CATEGORIA":"P1","properties.HOJA":"QUESADA","_id":"5a26ebf74334899ea1b6828e","type":"Feature","properties.NOMBRE":"HACIENDA ESTEBAN"}},{"type":"Feature","id":"5a26ebf74334899ea1b6828f","geometry":{"type":"Point","coordinates":[-84.26222655,10.31038481]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.46","properties.CATEGORIA":"P1","properties.HOJA":"QUESADA","_id":"5a26ebf74334899ea1b6828f","type":"Feature","properties.NOMBRE":"PARAISO"}},{"type":"Feature","id":"5a26ebf74334899ea1b68290","geometry":{"type":"Point","coordinates":[-84.37623035,10.31032041]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.47","properties.CATEGORIA":"P1","properties.HOJA":"QUESADA","_id":"5a26ebf74334899ea1b68290","type":"Feature","properties.NOMBRE":"FINCA CAPULINES"}},{"type":"Feature","id":"5a26ebf74334899ea1b68291","geometry":{"type":"Point","coordinates":[-84.1817386,10.31469559]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.48","properties.CATEGORIA":"P3","properties.HOJA":"POAS","_id":"5a26ebf74334899ea1b68291","type":"Feature","properties.NOMBRE":"SAN MIGUEL"}},{"type":"Feature","id":"5a26ebf74334899ea1b68292","geometry":{"type":"Point","coordinates":[-84.39865278,10.31513274]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.49","properties.CATEGORIA":"P1","properties.HOJA":"QUESADA","_id":"5a26ebf74334899ea1b68292","type":"Feature","properties.NOMBRE":"FINCA LAS NUBES"}},{"type":"Feature","id":"5a26ebf74334899ea1b68293","geometry":{"type":"Point","coordinates":[-84.15308569,10.31933648]},"geometry_name":"geometry","properties":{"properties.id":"poblados_rhn_geo.50","properties.CATEGORIA":"P1","properties.HOJA":"POAS","_id":"5a26ebf74334899ea1b68293","type":"Feature","properties.NOMBRE":"ANGELES"}}]
   };

   componentWillMount() {
       if (Platform.OS === 'android' && !Constants.isDevice) {
           this.setState({
               errorMess: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
           });
       } else {
           this._getLocationAsync();
           //this.getLayer()
       }
   }

   getLayer = async () =>
    {
        console.log("Consultando")
        try
        {
            const response = await fetch('http://172.24.126.189:8080/geoserver/Geotorotur/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geotorotur:puntos&maxFeatures=50&outputFormat=application%2Fjson')
            const l = await response.json()
            let layer = l.features
            this.setState({ layer });
        }
        catch (e)
        {
            console.log(e)
        }
    }

   _getLocationAsync = async () => {
       let { status } = await Permissions.askAsync(Permissions.LOCATION);
       if (status !== 'granted') {
           this.setState({
               errorMessage: 'Permission to access location was denied',
           });
       }

       let location = await Location.getCurrentPositionAsync({});
       this.setState({ location });
   };

   render() {
       let text = 'Waiting..';

       const { width, height } = Dimensions.get('window');
       const ASPECT_RATIO = width / height;
       const LATITUDE_DELTA = 0.0922;
       const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

       if (this.state.errorMessage) {
           text = this.state.errorMessage;
       } else if (this.state.location && this.state.layer) {
           const i = 0;
           return (
               <MapView
                   style={{ flex: 1 }}
                   initialRegion={{
                       latitude: this.state.location.coords.latitude,
                       longitude: this.state.location.coords.longitude,
                       latitudeDelta: LATITUDE_DELTA,
                       longitudeDelta: LONGITUDE_DELTA,
                   }}>
                   
                   {this.state.layer.map((marker, i) => (
                        <MapView.Marker 
                        key = {marker.id}
                        coordinate={{
                            latitude: marker.geometry.coordinates[1],
                            longitude: marker.geometry.coordinates[0],
                        }}
                        title={i.toString()}
                        />
                    ))}
               </MapView>
           );
          
       }

       return (
           <View style={styles.container}>
               <Text style={styles.paragraph}>{text}</Text>
           </View>
       );

   }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       paddingTop: Constants.statusBarHeight,
       backgroundColor: '#ecf0f1',
   },
   paragraph: {
       margin: 24,
       fontSize: 18,
       textAlign: 'center',
   },
});

