import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ProductCardProps } from "@/constants/types";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";

export default function ProductCard({ product }: ProductCardProps) {
  const isLiked = false;

  return (
    <Link href={`/product/${product._id}`} asChild>
      <TouchableOpacity className="w-[48%] mb-4 bg-white rounded-lg overflow-hidden">
        
        {/* Image Section */}
        <View className="relative h-56 w-full bg-gray-100">
          <Image
            source={{ uri: product.images[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Favorite Icon */}
          <TouchableOpacity
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm"
            onPress={() => {
              console.log("Liked");
            }}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? COLORS.accent : COLORS.primary}
            />
          </TouchableOpacity>

          {/* Featured Badge */}
          {product.isFeatured && (
            <View className="absolute top-2 left-2 z-10 px-2 py-1 bg-black rounded">
              <Text className="text-white text-xs font-bold uppercase">
                Featured
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="p-3">
          <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
            {product.name}
          </Text>

          <Text className="text-primary font-bold mt-1">
            ₹{product.price}
          </Text>
        </View>
              {/* product info */}
      <View className="p-3">
        <View className="flex-row items-center mb-1">
          <Ionicons name="star" size={14} color='#FFD700' />
          <Text className="text-secondary text-sm ml-1">

          </Text>
        </View>

      </View>
      </TouchableOpacity>
    </Link>
  );
}