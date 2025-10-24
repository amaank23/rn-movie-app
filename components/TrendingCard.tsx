import { images } from "@/constants/images";
import { colors } from "@/utils/style";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  movie: {
    title: string;
    movie_id: number;
    poster_url: string;
    count: number;
  };
  index: number;
};

const TrendingCard = ({ movie, index }: Props) => {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity
        style={{ width: 128, position: "relative", paddingLeft: 20 }}
      >
        <Image
          source={{ uri: movie.poster_url }}
          style={{ width: 128, height: 192, borderRadius: 8 }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            bottom: 36,
            left: -14,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 16,
          }}
        >
          <MaskedView
            maskElement={
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 60 }}
              >
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              style={{ width: 65, height: 65 }}
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 8,
            color: colors["light-200"],
          }}
          numberOfLines={2}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
