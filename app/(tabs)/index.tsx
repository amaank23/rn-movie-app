import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { colors } from "@/utils/style";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.image} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.logo} />
        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000FF"}
            style={{ marginTop: 40, alignSelf: "center" }}
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View style={styles.mainView}>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder={"Search for a movie"}
            />

            <>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 12,
                }}
              >
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                style={{ marginTop: 8, paddingBottom: 128 }}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  image: {
    position: "absolute",
    width: "100%",
    zIndex: 0,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    width: 48,
    height: 40,
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  mainView: {
    flex: 1,
    marginTop: 20,
  },
});
