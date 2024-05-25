/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button, Divider, TextInput, Checkbox } from 'react-native-paper';
import { useTranslation } from '../localization';
import { requests, url, utils } from '../helpers';
const LogoContainer = () => {
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require('../assets/logoNew.png')}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: '#F6B100', fontSize: 24, fontWeight: 'bold' }}>
                    Mauzo
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>
                    Track
                </Text>
            </View>
            <View style={{ flexDirection: 'row-reverse' }}>
                <Text style={{ marginRight: 50, color: '#FFFFFF', fontSize: 10 }}>
                    by Switch
                </Text>
            </View>
        </View>
    );
};
export { LogoContainer };

const Dividers = () => {
    return <Divider style={styles.divider} />;
};
export { Dividers };

type YellowTextProps = {
    text: string;
};
const YellowText = (props: YellowTextProps) => {
    return <Text style={styles.YellowText}>{props.text}</Text>;
};
export { YellowText };

type ContentProps = {
    text: string;
};
const Content = (props: ContentProps) => {
    return <Text style={styles.content}>{props.text}</Text>;
};
export { Content };

const Register = ({ navigation }: any) => {
    const [values, setValues] = useState({});
    const { t } = useTranslation();
    // const { auth } = useRootStore();
    const [errorMessage, setErrorMessage] = useState({});

    const setValue = name => value => {
        setValues({ ...values, [name]: value });
    };

    const onRegister = async () => {
        try {
            const response = await requests.post(url.auth.register, values,{
                withCredentials: false,
              });
            if (response.data) {
                utils.toast(t('Logged in successfully'));
                navigation.navigate('LogIn');
            }
        } catch (e) {
            console.log('error :' + e);
            utils.toast(t('Error during creating an account!'));
        }

    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.mainContainer}>
                <LogoContainer />
                <Dividers />
                <YellowText text="Register Now" />
                <TextInput
                    style={styles.passwordContainer}
                    mode="outlined"
                    label={t('Mobile Number')}
                    placeholder={t('Enter mobile number')}
                    outlineColor="#FFF"
                    textColor="#D5EAF1"
                    activeOutlineColor="#D5EAF1"
                    selectionColor="#FFF"
                    onChangeText={setValue('username')}
                    // placeholderTextColor="#FFFFFF"
                    outlineStyle={styles.outline}
                />
                <TextInput
                    style={styles.passwordContainer}
                    mode="outlined"
                    label={t('First name')}
                    placeholder={t('Enter first name')}
                    outlineColor="#FFF"
                    textColor="#D5EAF1"
                    activeOutlineColor="#D5EAF1"
                    selectionColor="#FFF"
                    onChangeText={setValue('first_name')}
                    // placeholderTextColor="#FFFFFF"
                    outlineStyle={styles.outline}
                />
                <TextInput
                    style={styles.passwordContainer}
                    mode="outlined"
                    label={t('Last name')}
                    placeholder={t('Enter last name')}
                    outlineColor="#FFF"
                    textColor="#D5EAF1"
                    activeOutlineColor="#D5EAF1"
                    selectionColor="#FFF"
                    onChangeText={setValue('last_name')}
                    // placeholderTextColor="#FFFFFF"
                    outlineStyle={styles.outline}
                />
                <TextInput
                    style={styles.passwordContainer}
                    mode="outlined"
                    label={'Password'}
                    placeholder={'Enter password'}
                    secureTextEntry={true}
                    outlineColor="#FFF"
                    textColor="#D5EAF1"
                    activeOutlineColor="#D5EAF1"
                    selectionColor="#FFF"
                    onChangeText={setValue('password')}
                    // placeholderTextColor="#FFFFFF"
                    outlineStyle={styles.outline}
                />

                <Text
                    style={styles.copyRightText}
                    onPress={async () => {
                        await onRegister();
                        //navigation.navigate('LogIn');
                    }}>
                    Already registered?, sign in now!
                </Text>
                <Text style={styles.copyRightText}>Copy @ Switch 2023</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={onRegister}>
                        <Text style={styles.update}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Register;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: 'red',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#01232D',
        paddingTop: 20,
    },
    logoContainer: {
        alignSelf: 'center',
        marginTop: 30,
    },
    logo: {
        height: 48,
        width: 220,
        margin: 10,
    },
    divider: {
        marginHorizontal: 60,
        marginVertical: 10,
    },
    YellowText: {
        color: '#F6B100',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        margin: 5,
    },
    content: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
        margin: 5,
    },
    textContainer: {
        backgroundColor: '#012E3C',
        margin: 20,
    },
    passwordContainer: {
        backgroundColor: '#01232D',
        margin: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateButton: {
        flex: 1,
        // alignSelf: 'flex-end',
        maxHeight: 70,
        width: '90%',
        backgroundColor: '#F6B100',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        justifyContent: 'center',
    },
    update: {
        color: '#01232D',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    passwordPlaceholder: {
        backgroundColor: '#01232D',
        borderColor: '#D5EAF1',
        borderWidth: 1,
        height: 58,
        width: 313,
        borderRadius: 10,
        padding: 10,
        margin: 20,
        alignSelf: 'center',
    },
    copyRightText: {
        color: '#FFFFFF',
        alignSelf: 'center',
        marginTop: 10,
    },
    outline: {
        borderRadius: 10,
    },
});
