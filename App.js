/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import {newTimer} from './utils/TimerUtils';

const App = () => {
  const [timers, setTimers] = useState([]);

  const handleCreateFormSubmit = timer => {
    setTimers([newTimer(timer), ...timers]);
  };

  useEffect(() => {
    const TIME_INTERVAL = 1000;
    const intervalId = setInterval(() => {
      setTimers(
        timers.map(timer => {
          const {elapsed, isRunning} = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      );
    }, TIME_INTERVAL);
    return () => clearInterval(intervalId);
  });

  const handleFormSubmit = attrs => {
    const updatedTimer = timers.map(timer => {
      if (timer.id === attrs.id) {
        const {title, project} = attrs;
        return {...timer, title, project};
      }
      return timer;
    });
    setTimers(updatedTimer);
  };

  const handleRemovePress = timerId => {
    setTimers(timers.filter(timer => timer.id !== timerId));
  };

  const toggleTimer = timerId => {
    setTimers(
      timers.map(timer => {
        const {id, isRunning} = timer;
        if (id === timerId) {
          return {
            ...timer,
            isRunning: !isRunning,
          };
        }
        return timer;
      }),
    );
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.timeListContaineer}>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm
            onFormSubmit={handleCreateFormSubmit}
            isOpen={false}
          />
          {timers.map(({title, project, id, elapsed, isRunning}) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={handleFormSubmit}
              onRemovePress={handleRemovePress}
              toggleTimer={toggleTimer}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  timeListContaineer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});

export default App;
