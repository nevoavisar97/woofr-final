import { Image, StyleSheet } from "react-native";
import LogoImage from "../../../../assets/logo-wofer2.png";
const Logo = () => {
  return <Image source={LogoImage} style={styles.logo} />;
};
const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
    marginLeft: 10,
  },
});
export default Logo;
