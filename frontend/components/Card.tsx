import { View, TouchableOpacity} from "react-native";
import { clsx } from "clsx";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    props?: any;
    variant?: "default" | "compact" | "featured";
    onPress?: () => void;
}

export default function Card({children, className="", props, variant="default", onPress}: CardProps) {
    const variantClasses = {
        default: "bg-bgLight px-3.5 py-10 rounded-lg shadow-lg shadow-gray-700 border-0.5 border-gray-100",
        compact: "bg-bgLight",
        featured: "bg-bgLight",
    }
    
    return (
        <View className={clsx("",
            variantClasses[variant],
            className)}
            {...props}
        >
            <TouchableOpacity onPress={onPress}>
                {children}
            </TouchableOpacity> 
        </View>
    );
}