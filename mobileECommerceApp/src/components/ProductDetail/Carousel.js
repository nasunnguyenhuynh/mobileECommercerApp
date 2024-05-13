import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
} from "react-native";

const Carousel = ({imgList}) => { // Enhance: img choosen by dot
    const flatlistRef = useRef(); // automatic change img
    const screenWidth = Dimensions.get("window").width; // get width screen
    const [activeIndex, setActiveIndex] = useState(0); // get,set idx
    const [catImages, setCatImages] = useState([]); // get,set data fetched
    const [loading, setLoading] = useState(true); // get,set loading data  

    useEffect(() => { //Remove fetch, setCatImages(imgList), try catch -> loading, setLoading
        try {
            setCatImages(imgList);
            setLoading(false);
        }
        catch {
            console.error("Error fetching cat images:", error);
            setLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     fetch("https://api.thecatapi.com/v1/images/search?limit=10&page=1")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // console.log('data ', data)
    //             setCatImages(data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching cat images:", error);
    //             setLoading(false);
    //         });
    // }, []);

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         if (activeIndex === catImages.length - 1) {
    //             flatlistRef.current.scrollToIndex({
    //                 index: 0,
    //                 animated: true,
    //             });
    //         } else {
    //             flatlistRef.current.scrollToIndex({
    //                 index: activeIndex + 1,
    //                 animated: true,
    //             });
    //         }
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, [activeIndex, catImages]);


    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index,
    });

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ height: 400 }}>
                {loading && ( // Show ActivityIndicator if loading is true
                    <ActivityIndicator size="small" color="#bc2b78" />
                )}
                <Image
                    source={{ uri: item.image }}
                    style={{ height: 400, width: screenWidth }}
                    onLoad={() => setLoading(false)} // Set loading to false when image is loaded
                />
            </View>
        );
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = scrollPosition / screenWidth;
        setActiveIndex(index);
    };

    const renderDotIndicators = () => {
        return catImages.map((dot, index) => {
            return (
                <View
                    key={index}
                    style={{
                        backgroundColor: index === activeIndex ? "green" : "red",
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}
                ></View>
            );
        });
    };

    return (
        <View>
            <FlatList
                data={catImages}
                // ref={flatlistRef}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
            />
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "10%",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    {renderDotIndicators()}
                </View>
            </View>

        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({});

