/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import WalletManager from 'react-native-wallet-manager';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppleWalletIcon from './assets/apple-wallet-icon.svg';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loader, setLoader] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function addPass() {
    setLoader(true);
    try {
      const result = await WalletManager.addPassFromUrl(
        'https://github.com/1aishwaryasharma/resources/blob/main/passes/zpass_20240411.pkpass?raw=true',
      );
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  }

  /*async function removePass() {
    setLoader(true);
    try {
      const result = await WalletManager.removePass(
        'pass.family.dev.stage.beerpoint-master',
      );
      console.log(`Pass removed: ${result}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  }*/

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Apple Wallet Integration">
            <View style={styles.walletSectionWrapper}>
              <Pressable onPress={addPass}>
                <View style={styles.buttonWrapper}>
                  <Image
                    source={AppleWalletIcon}
                    style={styles.appleWalletIcon}
                  />
                  <Text style={styles.buttonText}>Add to Apple Wallet</Text>
                </View>
              </Pressable>
              {loader ? (
                <ActivityIndicator
                  size="small"
                  color="#000"
                  style={styles.activityIndicator}
                />
              ) : null}
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  buttonWrapper: {
    marginTop: 28,
    marginBottom: 28,
    padding: 16,
    height: 58,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  walletSectionWrapper: {
    flexDirection: 'row',
  },
  activityIndicator: {
    marginLeft: 10,
  },
  appleWalletIcon: {
    width: 35,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default App;
