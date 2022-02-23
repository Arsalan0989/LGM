import { View, ImageBackground, Image, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vw, vh } from '../constant'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NeedDoctor() {
    return (

        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
            <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, justifyContent: "space-between" }}>

                <View style={{ position: 'absolute', borderRadius: 26, marginVertical: vh * 0.30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', opacity: 1, height: 180, width: 320, shadowColor: "#000", elevation: 20, }}>

                    <Image source={require('../assets/doc.png')} style={{ height: 50, width: 50, marginEnd: '60%', marginBottom: '38%' }} />

                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, marginLeft: '14%', marginTop: '13%' }}>
                        <Text style={{ color: '#D1A82A', fontWeight: 'bold', fontSize: 15 }}>SIGNUP/SIGN-IN NOW </Text>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 28, }}>Need A Doctor?</Text>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 15, padding: 3 }}>We Are Ready To Serve You :)</Text>

                    </View>

                    <View style={{ marginBottom: vh * 0.01 }}>
                        <TouchableOpacity style={{ width: vh * 0.44, height: 45, borderRadius: 20, backgroundColor: "#333" }}>
                            <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
