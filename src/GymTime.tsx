import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function GymTime() {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        alert('You need to enable notifications permissions to use this feature.');
      }
    })();
  }, []);

  const onChange = (event: any, selectedTime?: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const scheduleNotification = async () => {
    let trigger = new Date();
    trigger.setHours(time.getHours());
    trigger.setMinutes(time.getMinutes());
    trigger.setSeconds(0);
    trigger.setMilliseconds(0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Get Ready!",
        body: "It's Gym Time",
      },
      trigger: {
        type: 'calender',
        hour: trigger.getHours(),
        minute: trigger.getMinutes(),
        repeats: true,
      },
    });
    alert('Daily notification scheduled!');
  };

  return (
    <View style={styles.container}>
      <Text style = {[{paddingBottom: 15},{fontSize : 25, fontWeight : "100"}]}>Set Gym Time</Text>
      <TouchableOpacity style={styles.button} onPress={showTimepicker}>
      <Text style={{ color: 'white' }}>Set Time</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={{ color: 'white' }}>Schedule Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#e53e3e',
    padding: 10,
  }
});




