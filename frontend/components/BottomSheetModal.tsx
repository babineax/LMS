import React, { useRef, useEffect } from 'react';
import { Modal, Animated, ScrollView, Pressable, Text } from 'react-native';

type BottomSheetModalProps = {
  visible: boolean;
  onClose: () => void;
  items: any[];
  onSelect: (item: any) => void;
};

export default function BottomSheetModal({ visible, onClose, items, onSelect }: BottomSheetModalProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } 
    // eslint-disable-next-line
  }, [visible]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
        }).start(() => {
        setTimeout(() => {
            onClose();
        }, 0);
        });
    };

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={handleClose}
    >
        <Pressable 
            className="flex-1 bg-black/40"
            onPress={handleClose} 
        />
      <Animated.View
      className="absolute bottom-0 left-0 right-0 max-h-[50%] bg-white rounded-t-xl p-4 shadow-lg"
        style={[
          
          { transform: [{ translateY: slideAnim }], elevation: 5 }
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((item: any) => {
            const label = typeof item === 'string' ? item : item.label;
            const value = typeof item === 'string' ? item : item.value;

            return (
              <Pressable
                key={value}
                className='p-4 border-b-hairline border-border'
                onPress={() => {
                  onSelect(item);
                  handleClose();
                }}
              >
                <Text>{label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   sheet: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     maxHeight: '50%',
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     padding: 16,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   item: {
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
// });
