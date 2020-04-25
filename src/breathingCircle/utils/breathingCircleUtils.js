export function calculateKeyframe(exercise) {
  const { inhale, holdAfterInhale, exhale, holdAfterExhale } = exercise;
  const duration = getExerciseDuration(exercise);
  let inhaleDuration = inhale / duration;
  let holdAfterInhaleDuration = holdAfterInhale / duration;
  let exhaleDuration = exhale / duration;
  let holdAfterExhaleDuration = holdAfterExhale / duration;

  const transform = [1, 2, 2, 1, 1];
  const offset = [
    0,
    inhaleDuration,
    inhaleDuration + holdAfterInhaleDuration,
    inhaleDuration + holdAfterInhaleDuration + exhaleDuration,
    inhaleDuration + holdAfterInhaleDuration + exhaleDuration + holdAfterExhaleDuration,
    1
  ];
  const textOffset = [
    0,
    inhaleDuration - 0.001,
    inhaleDuration,
    inhaleDuration + holdAfterInhaleDuration,
    inhaleDuration + holdAfterInhaleDuration + 0.001,
    inhaleDuration + holdAfterInhaleDuration + exhaleDuration - 0.001,
    inhaleDuration + holdAfterInhaleDuration + exhaleDuration,
    inhaleDuration + holdAfterInhaleDuration + exhaleDuration + holdAfterExhaleDuration,
    1
  ];

  return {
    transform,
    offset,
    textOffset,
    easing: [ 'cubic-bezier(.29,.78,.55,.59)', 'linear', 'cubic-bezier(.29,.78,.55,.59)' ]
  };
}

const getExerciseDuration = exercise => Object.values(exercise).reduce((a, b) => a + b);

function getEasing() {
  return [ 'cubic-bezier(.29,.78,.55,.59)', 'linear', 'cubic-bezier(.29,.78,.55,.59)' ];
}

function getInhaleTextOpacity() {
  return [1, 1, 0, 0, 0, 0, 0, 0, 0];
}

function getHoldTextOpacity() {
  return [0, 0, 1, 1, 0, 0, 1, 1];
}

function getExhaleTextOpacity() {
  return [0, 0, 0, 0, 1, 1, 0, 0];
}

export function getExerciseSetup(exercise) {
  return {
    circleKeyframe: {
      transform: calculateKeyframe(exercise).transform,
      offset: calculateKeyframe(exercise).offset,
      easing: getEasing()
    },
    holdKeyframe: {
      opacity: getHoldTextOpacity(),
      offset: calculateKeyframe(exercise).textOffset
    },
    inhaleKeyframe: {
      opacity: getInhaleTextOpacity(),
      offset: calculateKeyframe(exercise).textOffset
    },
    exhaleKeyframe: {
      opacity: getExhaleTextOpacity(),
      offset: calculateKeyframe(exercise).textOffset
    },
    options: {
      duration: getExerciseDuration(exercise) * 1000,
      iterations: Infinity
    }
  }
}

export function convertTransformValue(keyframe) {
  const transform = keyframe.transform.map((value) => `scale(${value})`);
  return Object.assign(keyframe, { transform });
}
