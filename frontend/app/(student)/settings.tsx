import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SettingsIcon, UserCircle, HelpCircle, LogOut } from "lucide-react-native";

type StudentPaths =
  | "/(student)/profile"
  | "/(student)/settings"
  | "/(student)/help"
  | "/(student)/logout";

const settingRoutes: { name: string; path: StudentPaths; icon: JSX.Element }[] = [
    {name:"Profile",
        path:"/(student)/profile",
        icon: <UserCircle size={24} color="#2C3E50" />
    },
    // {
    //     name:"Settings",
    //     path:"/(student)/settings",
    //     icon: <SettingsIcon size={24} color="#2C3E50" />
    // },
    {
        name:"Help",
        path:"/(student)/help",
        icon: <HelpCircle size={24} color="#2C3E50" />
    },
    {
        name:"Logout",
        path:"/(student)/logout",
        icon: <LogOut size={24} color="#2C3E50" />
    }
];

export default function Settings() {
    return (
        <View className="flex-1 bg-bgMain">
            <View className="px-4 py-14 gap-6">
                {settingRoutes.map((route, index) => (
                   <TouchableOpacity 
                        key={index} 
                        onPress={() => router.replace(route.path)}
                        className="border-b border-border "
                    >
                        <View>
                            {route.icon}
                        </View>
                        <Text >{route.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}