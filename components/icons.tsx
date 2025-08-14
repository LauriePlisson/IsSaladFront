import { Salad, Soup, Sandwich, Frown, NotebookText, House, UserPlus, User, X, Croissant } from 'lucide-react-native';
import React from 'react';

interface IconProps {
	name: string | undefined;
	color?: string;
	size?: number;
}

export default function Icon({ name, color, size = 24 }: IconProps) {
	const icons: Record<string, React.ComponentType<{ color?: string; size?: number }>> = {
		'salad': Salad,
		'soup': Soup,
		'sandwich': Sandwich,
		'raviolis': Croissant,
		'frown': Frown,
		undefined: Frown, // Default icon if name is undefined
		'notebook-text': NotebookText,
		'house': House,
		'user-plus': UserPlus,
		'user': User,
		'x': X,
	};
	let colorIcon: string = color || '#381d2a'; // Default color if not provided
  const LucideIcon = icons[name];
	if (!color) {
		if (name === 'salad') {
			colorIcon = '#AABD8C'; // Change color for salad icon
		} else if (name === 'soup') {
			colorIcon = '#F2C94C'; // Change color for soup icon
		} else if (name === 'sandwich') {
			colorIcon = '#F39B6D'; // Change color for sandwich icon
		}
	}
	// F2C94C
	// e9e3b4

  return (<LucideIcon color={colorIcon} size={size} />);
};