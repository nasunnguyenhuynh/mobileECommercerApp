// Signup và cập nhật hình ảnh lên server
import React, { useState } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const temp = () => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleChooseAvatar = () => {
        ImagePicker.showImagePicker({ title: 'Select Avatar' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setAvatar(response);
            }
        });
    };

    const handleSubmit = () => {
        // Kiểm tra xem người dùng đã chọn avatar và nhập username chưa
        if (!avatar) {
            Alert.alert('Please choose an avatar');
        } else if (!username.trim()) {
            Alert.alert('Please enter your username');
        } else {
            // Tạo formData để gửi lên server
            const formData = new FormData();
            formData.append('username', username);
            formData.append('avatar', {
                uri: avatar.uri,
                type: avatar.type,
                name: avatar.fileName,
            });

            // Gửi request lên server
            axios.post('/accounts/basic-setup-profile/', formData)
                .then(response => {
                    // Xử lý response từ server nếu cần
                    console.log('Profile setup successfully');
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error('Error setting up profile:', error);
                });
        }
    };

    return (
        <View>
            <Text>Username:</Text>
            <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <Button title="Choose Avatar" onPress={handleChooseAvatar} />
            {avatar && (
                <Image
                    source={{ uri: avatar.uri }}
                    style={{ width: 100, height: 100 }}
                />
            )}
            <Button title="Update" onPress={handleSubmit} />
        </View>
    );
};

export default temp;
// file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FmobileEcommerceApp-4a4d0700-d7a8-4940-b5f6-6d14921cb19b/ImagePicker/ddb82be5-d79d-4aca-ae70-5776fe1b7a56.jpeg

// file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FmobileEcommerceApp-4a4d0700-d7a8-4940-b5f6-6d14921cb19b/ImagePicker/ddb82be5-d79d-4aca-ae70-5776fe1b7a56.jpeg



//Fetch API using Flatlist to display
// import React from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   View,
//   Image,
//   TouchableOpacity
// } from "react-native";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       refreshing: true,
//     }
//   }

//   componentDidMount() {
//     this.fetchCats();
//   }

//   fetchCats() {
//     this.setState({ refreshing: true });
//     fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
//       .then(res => res.json())
//       .then(resJson => {
//         this.setState({ data: resJson });
//         this.setState({ refreshing: false });
//       }).catch(e => console.log(e));
//   }

//   renderItemComponent = (data) =>
//     <TouchableOpacity style={styles.container}>
//       <Image style={styles.image} source={{ uri: data.item.url }} />
//     </TouchableOpacity>

//   ItemSeparator = () => <View style={{
//     height: 2,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     marginLeft: 10,
//     marginRight: 10,
//   }}
//   />

//   handleRefresh = () => {
//     this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
//   }

//   render() {
//     return (
//       <SafeAreaView>
//         <FlatList
//           data={this.state.data}
//           renderItem={item => this.renderItemComponent(item)}
//           keyExtractor={item => item.id.toString()}
//           ItemSeparatorComponent={this.ItemSeparator}
//           refreshing={this.state.refreshing}
//           onRefresh={this.handleRefresh}
//         />
//       </SafeAreaView>)
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 300,
//     margin: 10,
//     backgroundColor: '#FFF',
//     borderRadius: 6,
//   },
//   image: {
//     height: '100%',
//     borderRadius: 4,
//   },
// });