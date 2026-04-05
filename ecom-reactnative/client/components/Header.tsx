import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { HeaderProps } from "@/constants/types";
import { COLORS } from "@/constants";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";

export default function Header({
  title,
  showBack,
  showSearch,
  showCart,
  showMenu,
  showLogo,
}: HeaderProps) {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 relative h-14">
      {/* Left side */}
      <View className="flex-row items-center z-10 min-w-[80px]">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-2 p-1">
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity className="p-1">
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center - Absolutely Centered */}
      <View className="absolute inset-x-0 inset-y-0 flex-row items-center justify-center pointer-events-none">
        {title && (
          <Text className="text-lg font-bold text-gray-900">{title}</Text>
        )}
        {showLogo && (
          <Text className="text-2xl font-black italic tracking-widest text-primary">FIESTA</Text>
        )}
      </View>

      {/* Right side */}
      <View className="flex-row items-center justify-end z-10 min-w-[80px]">
        {showSearch && (
          <TouchableOpacity className="p-1">
            <Ionicons name="search-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {showCart && (
          <TouchableOpacity onPress={() => router.push('/cart')} className="ml-2 p-1">
            <Ionicons name="cart-outline" size={26} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
