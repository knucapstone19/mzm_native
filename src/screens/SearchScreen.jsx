import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../hooks/getUser";
import getStore from "../hooks/getStore";
import SmallStoreItem from "../ui/SmallStoreItem";
import SearchBar from "../components/SearchBar";
import WarningIcon from "../../assets/images/icons/warning.svg";
import styles from "../styles/styles";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState(null);
  const [location, setLocation] = useState([0, 0]);
  const [storeArray, setStoreArray] = useState(null);
  const [matchArray, setMatchArray] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const webviewRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (searchText && storeArray) {
      const searchPattern = new RegExp(searchText, "i");

      let matchArray = [];
      for (let store of storeArray) {
        if (searchPattern.test(store.placeName))
          matchArray = [...matchArray, store];
      }

      if (matchArray.length) {
        setIsVisible(true);
        const latArray = matchArray.sort((a, b) => a.lat - b.lat);
        const lngArray = matchArray.sort((a, b) => a.lat - b.lat);
        const lat = (latArray[0].lat + latArray[latArray.length - 1].lat) / 2;
        const lng = (lngArray[0].lng + lngArray[lngArray.length - 1].lng) / 2;
        setMatchArray(matchArray);

        const timeoutId = setTimeout(() => {
          webviewRef.current?.injectJavaScript(`panTo(${lat}, ${lng});`);
          webviewRef.current?.injectJavaScript(
            `setMarkers(${JSON.stringify(matchArray)});`
          );
        }, 500);

        return () => clearTimeout(timeoutId);
      } else {
        setIsVisible(false);
      }
    }
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      if (location[0]) {
        let storeData = [];
        for (let page = 1; page <= 3; page++) {
          const pageData = await getStore(location, page);
          storeData = [...storeData, ...pageData];
        }
        console.log("a", storeData);
        setStoreArray(storeData);
      }
    };

    fetchData();
  }, [location]);

  useFocusEffect(
    useCallback(() => {
      const fetchDataAndFocus = async () => {
        setIsVisible(true);
        setSearchText("");
        setMatchArray(null);
        const token = await AsyncStorage.getItem("@user_token");
        const userData = await getUser(token);
        const location = [userData?.user.school.lat, userData?.user.school.lng];
        setLocation(location);

        setTimeout(() => {
          searchBarRef.current?.focus();
        }, 100);
      };

      fetchDataAndFocus();

      return () => clearTimeout();
    }, [])
  );

  const html = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=00938483ddbf21637fd678261da4a904&libraries=services,clusterer,drawing"></script>
            <style>
                body, html, #map {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    width: 100%;
                }
            </style>
        </head>
        <body >
            <div id="map"></div>
            <script type="text/javascript">
                (function () {
                    const container = document.getElementById('map');
                    const options = {
                        center: new kakao.maps.LatLng(${location[0]}, ${location[1]}),
                        draggable: true,
                        level: 4
                    };

                    const map = new kakao.maps.Map(container, options);
                    var markers = [];

                    window.panTo = function(lat, lng) {
                      var moveLatLon = new kakao.maps.LatLng(lat, lng);
                      map.panTo(moveLatLon);
                    }

                    function clearMarkers() {
                      for (let i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                      }
                      markers = [];
                    }

                    window.setMarkers = function(matchArray) {
                      clearMarkers();
                      for (let i = 0; i < matchArray.length; i++) {
                        var markerPosition = new kakao.maps.LatLng(matchArray[i].lat, matchArray[i].lng);
                        var marker = new kakao.maps.Marker({
                          position: markerPosition,
                          title: matchArray[i].placeName,
                        });
                        marker.setMap(map);
                        markers.push(marker);
                      }
                    }

                    const geocoder = new kakao.maps.services.Geocoder();
                })();
            </script>
        </body>
    </html>`;

  return (
    <View className="flex-1">
      <View className="justify-between items-center w-screen absolute top-4 z-10 bg-transparent">
        <View
          style={{
            width: Dimensions.get("window").width - 48,
            elevation: 1,
            borderRadius: 10,
          }}
          className="flex-row w-full"
        >
          <SearchBar
            ref={searchBarRef}
            border={false}
            setSearchText={setSearchText}
          />
        </View>
      </View>
      {isVisible ? (
        <View className="absolute left-6 bottom-0 z-10 mr--12">
          <FlatList
            data={matchArray}
            renderItem={({ item, index }) => (
              <SmallStoreItem
                storeId={item.storeId}
                storeImage={item.storeImage}
                storeName={item.placeName}
                rating={item.rating}
                reviewCount={item.reviewCount}
                category={item.categoryName}
                address={item.addressName}
              />
            )}
            keyExtractor={(item) => item.storeId.toString()}
            horizontal={true}
            overScrollMode="never"
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-6" />}
            contentContainerStyle={{ paddingRight: 48 }}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center space-y-2">
          <WarningIcon />
          <Text className={`${styles("main")} text-[#111111]`}>
            검색 결과가 없습니다.
          </Text>
        </View>
      )}

      {isVisible && (
        <View className="flex-1">
          <WebView ref={webviewRef} source={{ html: html }} />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
