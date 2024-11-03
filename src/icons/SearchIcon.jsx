import Svg, { Circle, Line } from "react-native-svg";

const SearchIcon = ({ color = "#B0B0B0" }) => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Line
      x1="15.7071"
      y1="14.2929"
      x2="20.6569"
      y2="19.2426"
      stroke={color}
      strokeWidth="2"
    />
    <Circle cx="11.5" cy="10.5" r="5.5" stroke={color} strokeWidth="2" />
  </Svg>
);

export default SearchIcon;
