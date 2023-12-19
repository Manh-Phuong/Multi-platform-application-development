import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { head } from 'lodash';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

export default function App() {
    const videoRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [visiblePause, setVisiblePause] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [thumbnail, setThumbnail] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pauseAsync();
        } else {
            videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
        setShowControls(true);
    };

    const handleScreenPress = () => {
        setShowControls(!showControls);
    };

    const handleVisiblePause = () => {
        // setShowControls(!showControls);
    };

    const loadThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                {
                    time: 0,
                },
            );
            Image.getSize(uri, (width, height) => {
                const aspectRatio = width / height;
                const widthImage = withScreen; // Thay đổi kích thước theo nhu cầu
                const heightImage = widthImage / aspectRatio;
                console.log(width, height);
                console.log(widthImage, heightImage);
                setImageSize({ width: widthImage, height: heightImage });
            });
            console.log(uri);
            // setThumbnail(uri);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadThumbnail();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleScreenPress} style={styles.videoContainer}>
                {showControls && (
                    <View style={styles.controls}>
                        <TouchableOpacity onPress={handlePlayPause}>
                            {isPlaying ? (
                                <>{visiblePause && <Ionicons name="pause" size={32} color="white" />}</>
                            ) : (
                                <Ionicons name="play" size={32} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={handleVisiblePause}>
                    <Video
                        ref={videoRef}
                        source={{
                            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        }}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        style={[styles.video, { width: imageSize.width || 450, height: imageSize.height || 200 }]}
                        // style={[{ width: withScreen, height: 800 }]}
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setIsPlaying(false);
                            }
                        }}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: withScreen,
        height: heightScreen,
    },
    videoContainer: {
        flex: 1,
        width: withScreen,
        height: heightScreen,
    },
    video: {
        flex: 1,
        width: withScreen,
        height: heightScreen,
        position: 'relative',
    },
    controls: {
        position: 'absolute',
        top: 100,
        left: 180,
        zIndex: 1,
    },
    thumbnail: {
        ...StyleSheet.absoluteFillObject,
    },
});
