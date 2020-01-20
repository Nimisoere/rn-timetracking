import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {millisecondsToHuman} from '../utils/TimerUtils';
import TimerButton from './TimerButton';
import PropTypes from 'prop-types';

const Timer = ({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onEditPress,
  onRemovePress,
  toggleTimer,
}) => {
  const elapsedString = millisecondsToHuman(elapsed);

  const handleRemovePress = () => {
    onRemovePress(id);
  };

  const handleToggleTimer = () => {
    toggleTimer(id);
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{project}</Text>
      <Text style={styles.elapsedTime}>{elapsedString}</Text>
      <View style={styles.buttonGroup}>
        <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
        <TimerButton
          color="blue"
          small
          title="Remove"
          onPress={handleRemovePress}
        />
      </View>
      <TimerButton
        color={isRunning ? '#DB2828' : '#21BA45'}
        title={isRunning ? 'Stop' : 'Start'}
        onPress={handleToggleTimer}
      />
    </View>
  );
};

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  elapsed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onEditPress: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  toggleTimer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Timer;
