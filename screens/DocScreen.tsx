import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";

import { SwiperFlatList } from "react-native-swiper-flatlist";

export default function DocScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        autoplay={false}
        // autoplayDelay={0}
        autoplayLoop={true}
        index={0}
        showPagination
        paginationStyle={{ height: 50 }}
        // style={{ alignItems: "center" }}
        contentContainerStyle={{ alignItems: "center" }}
        paginationActiveColor="#f39b6d"
        paginationDefaultColor="#aabd8c"
      >
        <View style={styles.child}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091143/ChatGPT_Image_13_aou%CC%82t_2025_15_18_25_nxdfto.png",
            }}
            // style={[styles.child, { aspectRatio: 1 }]}
            style={styles.image}
          />
          <Text style={styles.text}>
            <Text style={styles.title}>Bienvenue dans IsSalad? !</Text> {"\n"}{" "}
            {"\n"}Parce que tout est soit une soupe, soit une salade, soit un
            sandwich… même si vous refusez d’y croire.{"\n"} {"\n"}Taco ou
            salade pliée ? Smoothie ou soupe froide ? Cornet de glace ou
            sandwich sucré ? En un clic,{" "}
            <Text style={{ fontWeight: "600", letterSpacing: 1 }}>
              IsSalad?
            </Text>{" "}
            tranche avec froideur scientifique (et un petit sourire en coin).
            {"\n"} {"\n"}Dites adieu aux débats sans fin. Dites bonjour à la
            paix culinaire.
          </Text>
        </View>
        <View style={styles.child}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091050/ChatGPT_Image_13_aou%CC%82t_2025_15_03_04_quzmal.png",
            }}
            // style={[styles.child, { aspectRatio: 1 }]}
            style={styles.image}
          />
          <Text style={styles.text}>
            <Text style={styles.title}>Salade 🥗</Text> {"\n"} {"\n"}
            <Text style={{ fontWeight: "600" }}>Définition</Text>: Mélange
            d’éléments distincts, sans liquide couvrant complètement le tout et
            sans enveloppe comestible.{"\n"}
            {"\n"}
            <Text style={{ fontWeight: "600" }}>Exemples</Text>: Salade de
            légumes, taboulé, poke bowl, riz sauté, popcorn. {"\n"}
            {"\n"}
            <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: Les
            ingrédients sont visibles, mélangés, mais pas « enfermés ».
          </Text>
        </View>
        <View style={styles.child}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091050/ChatGPT_Image_13_aou%CC%82t_2025_15_11_25_mvkmhf.png",
            }}
            // style={[styles.child, { aspectRatio: 1 }]}
            style={styles.image}
          />
          <Text style={styles.text}>
            <Text style={styles.title}>Soupe 🍲</Text> {"\n"} {"\n"}
            <Text style={{ fontWeight: "600" }}>Définition</Text>: Plat contenu
            dans un récipient, composé d’une base liquide (totale ou partielle)
            avec les ingrédients dedans.{"\n"}
            {"\n"}
            <Text style={{ fontWeight: "600" }}>Exemples</Text>: Soupe
            traditionnelle, bouillon, ramen, céréales dans du lait, smoothie.
            {"\n"}
            {"\n"}
            <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: S’il faut
            une cuillère (ou boire directement), c’est une soupe.
          </Text>
        </View>
        <View style={styles.child}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091050/ChatGPT_Image_13_aou%CC%82t_2025_15_08_15_owsfll.png",
            }}
            // style={[styles.child, { aspectRatio: 1 }]}
            style={styles.image}
          />
          <Text style={styles.text}>
            <Text style={styles.title}>Sandwich 🥪</Text> {"\n"} {"\n"}
            <Text style={{ fontWeight: "600" }}>Définition </Text>: Plat dont
            les ingrédients sont enfermés, totalement ou partiellement, dans un
            élément comestible (pain, pâte, feuille, etc.).{"\n"}
            {"\n"}
            <Text style={{ fontWeight: "600" }}>Exemples</Text>: Sandwich
            classique, burger, taco, burrito, sushi.
            {"\n"}
            {"\n"}
            <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: S'il y a
            un contenant comestible autour du contenu, c'est un sandwich.
          </Text>
        </View>
      </SwiperFlatList>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(248, 235, 213, 0.87)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "justify",
    borderTopWidth: 2,
    height: 300,
    borderColor: "#f39b6d",
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  child: {
    top: 200,
    width,
    height: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: 200,
  },
  image: {
    height: 200,
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    textDecorationLine: "underline",
    textDecorationColor: "#f39b6d",
    fontSize: 22,
    letterSpacing: 0.7,
  },
});
