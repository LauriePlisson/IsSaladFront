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
  ScrollView,
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
          <View
            style={{
              width: "80%",
              borderColor: "#f39b6d",
              paddingBottom: 25,
              borderBottomWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
              marginTop: -70,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091143/ChatGPT_Image_13_aou%CC%82t_2025_15_18_25_nxdfto.png",
              }}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <Text style={styles.title}>Bienvenue dans IsSalad? !</Text>
            <Text style={styles.text}>
              {"\n"}Parce que tout est soit une soupe, soit une salade, soit un
              sandwich… même si vous refusez d’y croire. Taco ou salade pliée ?
              Smoothie ou soupe froide ? Cornet de glace ou sandwich sucré ?
              {"\n"}
            </Text>
            <Text style={styles.text}>
              En un clic,
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "justify",
                  fontWeight: "600",
                  letterSpacing: 1,
                  paddingHorizontal: 20,
                }}
              >
                {""} IsSalad? {""}
              </Text>
              <Text style={styles.text}>
                tranche avec froideur scientifique (et un petit sourire en
                coin).
                {"\n"} {"\n"}Dites adieu aux débats sans fin. Dites bonjour à la
                paix culinaire.
              </Text>
            </Text>
          </ScrollView>
        </View>
        <View style={styles.child}>
          <View
            style={{
              width: "80%",
              borderColor: "#f39b6d",
              paddingBottom: 25,
              borderBottomWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
              marginTop: -110,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091050/ChatGPT_Image_13_aou%CC%82t_2025_15_03_04_quzmal.png",
              }}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <Text style={styles.title}>Salade 🥗</Text>
            <Text style={styles.text}>
              {"\n"}
              <Text style={{ fontWeight: "600" }}>Définition</Text>: Mélange
              d’éléments distincts, sans liquide couvrant complètement le tout
              et sans enveloppe comestible.
              {"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Exemples</Text>: Salade de
              légumes, taboulé, poke bowl, riz sauté, popcorn.
              {"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: Les
              ingrédients sont visibles, mélangés, mais pas « enfermés ».
            </Text>
          </ScrollView>
        </View>
        <View style={styles.child}>
          <View
            style={{
              width: "80%",
              borderColor: "#f39b6d",
              paddingBottom: 25,
              borderBottomWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
              marginTop: -110,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091050/ChatGPT_Image_13_aou%CC%82t_2025_15_11_25_mvkmhf.png",
              }}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <Text style={styles.title}>Soupe 🍲</Text>
            <Text style={styles.text}>
              {"\n"}
              <Text style={{ fontWeight: "600" }}>Définition</Text>: Plat
              contenu dans un récipient, composé d’une base liquide (totale ou
              partielle) avec les ingrédients dedans.{"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Exemples</Text>: Soupe
              traditionnelle, bouillon, ramen, céréales dans du lait, smoothie.
              {"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: S’il
              faut une cuillère (ou boire directement), c’est une soupe.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.child}>
          <View
            style={{
              width: "80%",
              borderColor: "#f39b6d",
              paddingBottom: 25,
              borderBottomWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
              marginTop: -70,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091050/ChatGPT_Image_13_aou%CC%82t_2025_15_08_15_owsfll.png",
              }}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <Text style={styles.title}>Sandwich 🥪</Text>
            <Text style={styles.text}>
              {"\n"}
              <Text style={{ fontWeight: "600" }}>Définition</Text>: Plat dont
              les ingrédients sont enfermés, totalement ou partiellement, dans
              un élément comestible (pain, pâte, feuille, etc.).{"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Exemples</Text>: Sandwich
              classique, burger, taco, burrito, sushi.{"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: S'il y
              a un contenant comestible autour du contenu, c'est un sandwich.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.child}>
          <View
            style={{
              width: "80%",
              borderColor: "#f39b6d",
              paddingBottom: 25,
              borderBottomWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
              marginTop: -70,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091049/ChatGPT_Image_13_aou%CC%82t_2025_14_49_51_usr5rp.png",
              }}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <Text style={styles.title}>Ravioli 🧍</Text>
            <Text style={styles.text}>
              {"\n"}
              <Text style={{ fontWeight: "600" }}>Définition</Text>: Contenu
              (complexe) entièrement enfermé dans un contenant comestible (ou
              ici : biologique): Un être humain.{"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Exemples</Text>: Toi, moi, les
              passants, tout ce qui a une enveloppe corporelle et une pensée
              vaguement organisée à l’intérieur.
              {"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: S’il a
              une peau, une personnalité, et qu’il peut s’inscrire sur les
              réseaux sociaux, c'est un ravioli.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.child}>
          <View
            style={{
              width: "80%",
              borderColor: "#f39b6d",
              paddingBottom: 25,
              borderBottomWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
              marginTop: -70,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755244254/ChatGPT_Image_15_aou%CC%82t_2025_09_46_19_qqu5gq.png",
              }}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <Text style={styles.title}>Ravioli-Salade 📸</Text>
            <Text style={styles.text}>
              {"\n"}
              <Text style={{ fontWeight: "600" }}>Définition</Text>: Plusieurs
              raviolis visibles côte à côte, chacun ayant son propre contenu,
              non fusionnés mais rassemblés dans un cadre.{"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Exemples</Text>: Une
              collection d’humains, photo de classe, selfie de groupe, tableau
              Zoom avec 12 visages, foule en festival.
              {"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: S’il y
              a plusieurs humains visibles et distincts, sans sauce qui les
              unit, c'est une ravioli-salade.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.child}>
          <View
            style={{
              width: "80%",
              borderColor: "#f39b6d",
              paddingBottom: 25,
              borderBottomWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
              marginTop: -50,
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755244254/ChatGPT_Image_15_aou%CC%82t_2025_09_46_29_jvhhs4.png",
              }}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <Text style={styles.title}>Other ❓</Text>
            <Text style={styles.text}>
              {"\n"}
              <Text style={{ fontWeight: "600" }}>Définition</Text>: Objet ou
              entité qui échappe à toute tentative raisonnable de classification
              culinaire ou existentielle. Ce que l’algorithme regarde... puis
              décide de ne pas commenter.{"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Exemples</Text>: Un caillou,
              une idée floue de ce que tu voulais prendre en photo, une ombre
              très convaincante...
              {"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "600" }}>Règle pratique</Text>: Si ça
              ne se mange pas, ne pense pas, n’est pas structuré... alors ce
              n’est pas notre problème
            </Text>
          </ScrollView>
        </View>
      </SwiperFlatList>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
// const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(248, 235, 213, 0.87)",
    height: "100%",
    width: "100%",
    // height: "100%",
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  child: {
    width,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 200,
    aspectRatio: 1,
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
  text: {
    fontSize: 18,
    textAlign: "justify",
    paddingHorizontal: 20,
  },
});

// <Text style={{ fontWeight: "600" }}>
