import { Svg, Path } from "react-native-svg";

const HomeIcon = ({ color = "#B0B0B0" }) => (
  <Svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7.00002 22.1667H10.5V15.1667H17.5V22.1667H21V11.6667L14 6.41667L7.00002 11.6667V22.1667ZM4.66669 24.5V10.5L14 3.5L23.3334 10.5V24.5H15.1667V17.5H12.8334V24.5H4.66669Z"
      fill={color}
    />
  </Svg>
);

export default HomeIcon;
