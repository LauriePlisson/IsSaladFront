import { Salad, Soup, Sandwich, Frown, NotebookText, House, UserPlus, User, X } from 'lucide-react-native';
import React from 'react';

interface IconProps {
	name: string;
	color?: string;
	size?: number;
}

export default function Icon({ name, color, size = 24 }: IconProps) {
	const icons: Record<string, React.ComponentType<{ color?: string; size?: number }>> = {
		'salad': Salad,
		'soup': Soup,
		'sandwich': Sandwich,
		'frown': Frown,
		'notebook-text': NotebookText,
		'house': House,
		'user-plus': UserPlus,
		'user': User,
		'x': X,
	};
  const LucideIcon = icons[name];

  return (<LucideIcon color={color} size={size} />);
};