import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import StudentProfile from "../app/StudentProfile";
import StudentSettings from "../app/StudentSettings";
import StudentHelp from "../app/StudentHelp";
import { UserCircle, Settings, HelpCircle, LogOut, Menu } from "lucide-react-native";
import { View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

const Drawer = createDrawerNavigator();
export default function StudentSettingsDrawer() {
    const { signOut } = useAuth();

    return (
        <Drawer.Navigator
            initialRouteName="Profile"
            drawerContent={(props)=>(
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem 
                        label="Logout" 
                        onPress={() => console.log("Logout")} 
                        icon={({ color, size }) => (
                            <LogOut size={size} color={color} />
                        )}
                    />
                </DrawerContentScrollView>
            )}
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: "#A1EBE5",
                drawerInactiveTintColor:"#2C3E50",
                headerTitleStyle: {
                    fontSize: 16,
                    fontWeight: '500',
                },
                headerStyle: {
                    backgroundColor: "#A1EBE5", 
                    shadowColor: "#A1EBE5",
                },
                drawerStyle: {
                    width: 250,
                    backgroundColor: "#128C7E",    
                },
                drawerLabelStyle: {
                    fontSize: 16,
                    fontWeight: '500',
                },
            }}
        >
            <Drawer.Screen 
                name="Profile"
                options={{
                    title: "Profile",
                    drawerIcon: ({ color, size }) => (
                        <UserCircle size={size} color={color} />
                    ),
                }}
                component={StudentProfile} 
            />
            <Drawer.Screen 
                name="Settings" 
                component={StudentSettings}
                options={{
                    title: "Settings",
                    drawerIcon: ({ color, size }) => (
                        <Settings size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Help" 
                component={StudentHelp}
                options={{
                    title: "Help",
                    drawerIcon: ({ color, size }) => (
                        <HelpCircle size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
};