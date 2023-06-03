import * as LocalAuthentication from 'expo-local-authentication';
import { Button, View, Text } from 'native-base';
import { useState, useEffect } from 'react';
// import your other components

enum EResult {
  CANCELLED = 'CANCELLED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}


export function BiometricAuthScreen() {
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] = useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = useState(false);
  const [irisAvailable, setIrisAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EResult>();

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
      setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
      setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
    }
  };

  const authenticate = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const results = await LocalAuthentication.authenticateAsync();

      if (results.success) {
        setResult(EResult.SUCCESS);
      } else if (results.error === 'unknown') {
        setResult(EResult.DISABLED);
      } else if (
        results.error === 'user_cancel' ||
        results.error === 'system_cancel' ||
        results.error === 'app_cancel'
      ) {
        setResult(EResult.CANCELLED);
      }
    } catch (error) {
      setResult(EResult.ERROR);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkSupportedAuthentication();
  }, []);

  let resultMessage;
  switch (result) {
    case EResult.CANCELLED:
      resultMessage = 'Authentication process has been cancelled';
      break;
    case EResult.DISABLED:
      resultMessage = 'Biometric authentication has been disabled';
      break;
    case EResult.ERROR:
      resultMessage = 'There was an error in authentication';
      break;
    case EResult.SUCCESS:
      resultMessage = 'Successfully authenticated';
      break;
    default:
      resultMessage = '';
      break;
  }

  let description;
  if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with Face ID, touch ID or iris ID';
  } else if (facialRecognitionAvailable && fingerprintAvailable) {
    description = 'Authenticate with Face ID or touch ID';
  } else if (facialRecognitionAvailable && irisAvailable) {
    description = 'Authenticate with Face ID or iris ID';
  } else if (fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with touch ID or iris ID';
  } else if (facialRecognitionAvailable) {
    description = 'Authenticate with Face ID';
  } else if (fingerprintAvailable) {
    description = 'Authenticate with touch ID ';
  } else if (irisAvailable) {
    description = 'Authenticate with iris ID';
  } else {
    description = 'No biometric authentication methods available';
  }


    return ( // faltan estilos 
        <View >
            <Text >Biometric Authentication</Text>
            <Text >{description}</Text>
            {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
                <Button onPress={authenticate}>
                Authenticate
                </Button>
            ) : null}
            {resultMessage ? <Text>{resultMessage}</Text> : null}
        </View>
    );
}