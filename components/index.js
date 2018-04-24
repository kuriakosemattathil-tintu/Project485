import React from 'react';
import { Header, Left, Body, Right, Button , Content, List, ListItem, Text} from 'native-base';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerNavigator } from 'react-navigation';

export const HeaderComponent = () => {
    return (
            <Header style= {{backgroundColor: "steelblue"}} justifiedContent= "center" iosBarStyle="light-content">
                <Content>
                <List>
                    <ListItem button iconLeft >
                        <Icon name='menu' style={styles.icon}/>
                    </ListItem>
                </List>
                </Content>
        <Body>
            <Text style= {styles.headerText}> YOLO </Text>
            </Body>
                <Right>
                <Button transparent>
                <Icon name="settings" style={styles.icon} />
                </Button>
                </Right>
            </Header>
    
    );
}
const styles = StyleSheet.create({
    icon: {
        color: "white",
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 30,
      },
      headerText: {
          color: "white",
          fontSize: 20,
          fontWeight: 'bold',
      }
})
export default HeaderComponent;