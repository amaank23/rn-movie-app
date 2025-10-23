import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

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
            fontSize: 12,
            fontWeight: "bold",
            color: "white",
            marginTop: 8,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
