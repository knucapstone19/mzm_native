import { useCallback, useRef } from "react";
import { Dimensions, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import SearchBar from "../components/SearchBar";

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
                const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                const options = { //지도를 생성할 때 필요한 기본 옵션
                    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };
                
                const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
                
                // 주소-좌표 변환 객체를 생성합니다
                const geocoder = new kakao.maps.services.Geocoder();
            })();
        </script>       
    </body>
</html>    
`;

const SearchScreen = () => {
  const searchBarRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        searchBarRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <>
      <View className="flex-1">
        <View
          style={{
            width: Dimensions.get("window").width - 48,
            elevation: 1,
            borderRadius: 10,
          }}
          className="w-full mx-6 absolute top-2 z-10 rounded-md bg-white"
        >
          <SearchBar ref={searchBarRef} border={false} />
        </View>

        <View className="flex-1">
          <WebView source={{ html: html }} />
        </View>
      </View>
    </>
  );
};

export default SearchScreen;
