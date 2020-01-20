import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';
import PropTypes from 'prop-types';

const ToggleableTimerForm = ({onFormSubmit}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFormSubmit = timer => {
    onFormSubmit(timer);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? (
        <TimerForm
          onFormSubmit={handleFormSubmit}
          onFormClose={() => setIsOpen(false)}
        />
      ) : (
        <TimerButton title="+" onPress={() => setIsOpen(true)} color="black" />
      )}
    </View>
  );
};

ToggleableTimerForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});

export default ToggleableTimerForm;
