import React, {useState} from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';
import PropTypes from 'prop-types';

const EditableTimer = ({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onFormSubmit,
  onRemovePress,
  toggleTimer,
}) => {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const handleSubmit = timer => {
    onFormSubmit(timer);
    setEditFormOpen(false);
  };

  if (editFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        onFormSubmit={handleSubmit}
        onFormClose={() => setEditFormOpen(false)}
        project={project}
      />
    );
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      onEditPress={() => setEditFormOpen(true)}
      onRemovePress={onRemovePress}
      toggleTimer={toggleTimer}
    />
  );
};

EditableTimer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  elapsed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  toggleTimer: PropTypes.func.isRequired,
};

export default EditableTimer;
