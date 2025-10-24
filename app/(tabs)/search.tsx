import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { colors } from "@/utils/style";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    fetchData: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  useEffect(() => {
    // updateSearchCount(searchTerm, { id: 0 } as any);
    const func = async () => {
      if (searchTerm.trim()) {
        await loadMovies();
      } else {
        resetMovies();
      }
    };
    const timeout = setTimeout(func, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() && movies?.length > 0) {
      updateSearchCount(searchTerm, movies[0]);
    }
  }, [movies]);
  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.image} resizeMode="cover" />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ paddingHorizontal: 20 }}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 80,
                alignItems: "center",
              }}
            >
              <Image source={icons.logo} style={{ width: 48, height: 40 }} />
            </View>
            <View style={{ marginVertical: 20 }}>
              <SearchBar
                placeholder="Search Movies"
                value={searchTerm}
                onChangeText={(text: string) => setSearchTerm(text)}
              />
            </View>
            {moviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000FF"
                style={{ marginVertical: 12 }}
              />
            ) : null}
            {moviesError && (
              <Text
                style={{
                  color: "red",
                  paddingHorizontal: 20,
                  marginVertical: 12,
                }}
              >
                Error: {moviesError.message}
              </Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              searchTerm.trim() &&
              movies?.length > 0 && (
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Search Results for{" "}
                  <Text style={{ color: colors.accent }}>{searchTerm}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          <>
            {!moviesLoading && !moviesError ? (
              <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                <Text style={{ textAlign: "center", color: "grey" }}>
                  {searchTerm.trim() ? "No Movies Found" : "Search for a movie"}
                </Text>
              </View>
            ) : null}
          </>
        }
      />
    </View>
  );
};

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

export default Search;
