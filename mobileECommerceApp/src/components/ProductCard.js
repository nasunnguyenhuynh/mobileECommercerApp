import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";

// const ProductCard = () => {
//     return (
//         <View style={styles.containerProductCard}>
//             <Image
//                 source={require("../../src/assets/images/logo.jpg")}
//                 style={styles.logo}
//             >
//             </Image>
//             <Text>Ten san pham</Text>
//             <Text>Ratings</Text>
//             <View>
//                 <Text>$122.215</Text>
//                 <Text>26,12k sold</Text>
//             </View>
//         </View>
//     )
// }

export default class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: true,
        }
    }

    componentDidMount() {
        this.fetchCats();
    }

    fetchCats() {
        this.setState({ refreshing: true });
        fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
            .then(res => res.json())
            .then(resJson => {
                this.setState({ data: resJson });
                this.setState({ refreshing: false });
            }).catch(e => console.log(e));
    }

    renderItemComponent = (data) =>
        <TouchableOpacity style={styles.containerProductCard}>
            <Image style={styles.image} source={{ uri: data.item.url }} />
        </TouchableOpacity>

    ItemSeparator = () => <View style={{
        // height: 2,
        // backgroundColor: "rgba(0,0,0,0.5)",
        // marginLeft: 10,
        // marginRight: 10,
    }}
    />

    handleRefresh = () => {
        this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={item => this.renderItemComponent(item)}
                keyExtractor={item => item.id.toString()}
                numColumns={2} // Hiển thị 2 cột
                // ItemSeparatorComponent={this.ItemSeparator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                style={{ margin: 10 }}
            />
        )
    }
};

// const styles = StyleSheet.create({
//     containerProductCard: {
//         backgroundColor: "blue",
//         flex: 1,
//         marginHorizontal: 10,
//         marginBottom: 10
//     },
//     logo: {
//         height: 120,
//         width: "100%",
//     }
// });

const { width: screenWidth } = Dimensions.get('window');
const containerWidth = screenWidth * 0.4; // 44% của width của thiết bị
const styles = StyleSheet.create({
    containerProductCard: {
        height: 200,
        // margin: 10,
        width: containerWidth,
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    image: {
        height: 120,
        width: "100%",
        borderRadius: 4,
    },
});