import {
  Salad,
  Soup,
  Sandwich,
  ChevronLeft,
  Frown,
  NotebookText,
  House,
  UserPlus,
  User,
  X,
  Croissant,
  CircleAlert,
} from "lucide-react-native";
import { hatChef, ufo, cloth } from "@lucide/lab"
import { createLucideIcon } from "lucide-react-native";
import React from "react";

interface IconProps {
  name: string | undefined;
  color?: string;
  size?: number;
}

const ClothIcon = createLucideIcon("Cloth", cloth);
const HatChefIcon = createLucideIcon("HatChef", hatChef);
const UfoIcon = createLucideIcon("Ufo", ufo);

const icons: Record<
  string, React.ComponentType<{ color?: string; size?: number }>> = {
    salad: Salad,
    soup: Soup,
    sandwich: Sandwich,
    ravioli: ClothIcon, // Wrapped 'cloth' as a component
    "ravioli-salad": HatChefIcon, // Wrapped 'hatChef' as a component
    other: UfoIcon, // Wrapped 'ufo' as a component
    frown: Frown,
    undefined: CircleAlert, // Default icon if name is undefined
    "notebook-text": NotebookText,
    house: House,
    "user-plus": UserPlus,
    user: User,
    x: X,
    back: ChevronLeft,
};

// Reusable icon component that renders Lucide icons with custom colors and sizes
export default function Icon({ name, color, size = 24 }: IconProps) {
  let colorIcon: string = color || "#381d2a"; // Default color if not provided
  const LucideIcon = icons[name];
  if (!color) {
    if (name === "salad") {
      colorIcon = "#AABD8C"; // Change color for salad icon
    } else if (name === "soup") {
      colorIcon = "#F2C94C"; // Change color for soup icon
    } else if (name === "sandwich") {
      colorIcon = "#F39B6D"; // Change color for sandwich icon
    } else if (name === "ravioli") {
      colorIcon = "#e5ac30ff"; // Change color for ravioli icon
    } else if (name === "ravioli-salad") {
      colorIcon = "#b56941ff"; // Change color for ravioli-salad icon
    } else if (name === "other") {
      colorIcon = "#469842ff"; // Change color for other icon
    } else if (name === undefined) {
      colorIcon = "#ff0f0fff"; // Change color for circle-alert icon
    }
  }
  // F2C94C
  // e9e3b4

  return <LucideIcon color={colorIcon} size={size} />;
}
