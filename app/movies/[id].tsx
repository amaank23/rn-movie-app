import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { colors } from "@/utils/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: colors["light-200"],
          fontWeight: "normal",
          fontSize: 14,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: colors["light-100"],
          fontWeight: "bold",
          fontSize: 14,
          marginTop: 8,
        }}
      >
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(
    () => fetchMovieDetails(id as string),
    true
  );

  const router = useRouter();
  return (
    <View style={{ backgroundColor: colors.primary, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style={{ width: "100%", height: 550 }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            {movie?.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 4,
              marginTop: 8,
            }}
          >
            <Text style={{ color: colors["light-200"], fontSize: 14 }}>
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text style={{ color: colors["light-200"], fontSize: 14 }}>
              {movie?.runtime}m
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              backgroundColor: colors["dark-100"],
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              columnGap: 4,
              marginTop: 8,
            }}
          >
            <Image source={icons.star} style={{ width: 16, height: 16 }} />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text style={{ color: colors["light-200"], fontSize: 14 }}>
              {movie?.vote_count} votes
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((g: { name: string }) => g.name).join(" - ") ||
              "N/A"
            }
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} millions`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue) / 1_000_000} millions`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c: { name: string }) => c.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          marginHorizontal: 20,
          backgroundColor: colors.accent,
          borderRadius: 8,
          paddingVertical: 14,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
        }}
        onPress={() => {
          router.back();
        }}
      >
        <Image
          source={icons.arrow}
          style={{
            width: 20,
            height: 20,
            marginRight: 4,
            marginTop: 2,
            transform: [{ rotate: "180deg" }],
          }}
          tintColor={"#fff"}
        />
        <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
          Go back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
