import { StyleSheet, Dimensions } from "react-native";
import colors from "../../constants/colors";
const { height, width } = Dimensions.get("screen");

const styled = StyleSheet.create({
  container: {
    marginTop: 20
  },
  cardContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },

  country_name: {
    fontSize: 20,
    alignSelf: "center"
  },
  alignColumn: {
    flexDirection: "column",
    alignSelf: "center",
    marginLeft: 10
  },
  code: {
    fontSize: 12,
    color: "#C8C9CB"
  },
  flag: {
    marginLeft: 15,
    height: 60,
    width: 40,
    borderRadius: 40
  },
  buttonExpansible: {
    padding: 20,
    paddingRight: 15
  },
  panelRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  panelColumn: {
    backgroundColor: "#fff",
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10
  },
  textInfoName: {
    fontSize: 20,
    color: colors.primaryRed,
    marginHorizontal: 5
  },
  textInfo: {
    fontSize: 20,
    color: colors.primaryRed,
    marginHorizontal: 5
  }
});

export default styled;
