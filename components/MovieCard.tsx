import { icons } from "@/constants/icons";
import { colors } from "@/utils/style";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={{ width: "30%" }}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          style={{ width: "100%", height: 208, borderRadius: 8 }}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "white",
            marginTop: 8,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            columnGap: 4,
          }}
        >
          <Image source={icons.star} style={{ width: 16, height: 16 }} />
          <Text
            style={{
              fontSize: 12,
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: colors["light-300"],
              fontWeight: 500,
              marginTop: 4,
            }}
          >
            {release_date?.split("-")[0]}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: colors["light-300"],
              textTransform: "uppercase",
            }}
          >
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
