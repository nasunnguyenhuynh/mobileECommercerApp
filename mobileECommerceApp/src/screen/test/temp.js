//                  ==========      Signup và cập nhật hình ảnh lên server      ==========
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



//                  ==========      Fetch API using Flatlist to display     ==========
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


//Flatlist
//Scroll: scrollToIndex: đến một vị trí cụ thể dựa trên chỉ số của mục.
//Get in4:  recordInteraction, scrollToEnd
//Others: scrollToOffset, scrollToEnd, scrollToItem, flashScrollIndicators, recordInteraction.
//scrollEventThrottle: to handle frequency every {number}ms when scrolling -> enhance performance




//                  ==========      Collapse     ==========
// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import Accordion from "./src/screen/Page/Accordion";

// const frequentlyAskedQuestions = [
//     {
//         question: 'How many subscribers aimed for today?',
//         answer: 'As many as we can get. Please kindly like and subscribe.',
//     },
//     {
//         question: 'How much does it cost to subscribe to this channel?',
//         answer:
//             "There's no charge involved in subscribing, so what's preventing you from subscribing. Please subscribe and like",
//     },
//     {
//         question: 'What will more subscribers do for this channel?',
//         answer:
//             'More subscribers would help this poor dude get pumped to do more of this stuff.',
//     },
// ];

// export default function App() {
//     return (
//         <View style={{ marginVertical: 40, }}>
//             {frequentlyAskedQuestions.map((faq, index) => (
//                 <Accordion
//                     key={index.toString()}
//                     title={faq.question}
//                     details={faq.answer}
//                 />
//             ))}
//         </View>
//     );
// }

// const styles = StyleSheet.create({});


// import React, { useState } from 'react';
// import { StyleSheet, Text, TouchableWithoutFeedback, View, UIManager, Platform, LayoutAnimation } from 'react-native';
// import AntDesign from "react-native-vector-icons/AntDesign"
// // import { bold, regular } from '../utils/fonts';

// export default function Accordion({ title, details }) {
//     const [opened, setOpened] = useState(false);

//     // Supply animation for old android device
//     if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//         UIManager.setLayoutAnimationEnabledExperimental(true);
//     }

//     function toggleAccordion() { //easeInEaseOut & setOpened
//         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         setOpened(!opened);
//     }

//     return (
//         <View style={styles.container}>
//             <TouchableWithoutFeedback onPress={toggleAccordion}>
//                 <View style={styles.header}>
//                     <Text style={styles.title}>{title}</Text>
//                     <AntDesign name={opened ? 'caretup' : 'caretdown'} size={16} />
//                 </View>
//             </TouchableWithoutFeedback>

//             {opened && (
//                 <View style={styles.content}>
//                     <Text style={styles.details}>{details}</Text>
//                 </View>
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         margin: 10,
//         padding: 15,
//         backgroundColor: 'white',
//         borderRadius: 6,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     title: {
//         // ...bold,
//         textTransform: 'capitalize',
//     },
//     content: {
//         marginTop: 8,
//     },
//     details: {
//         // ...regular,
//         opacity: 0.65,
//     },
// });






