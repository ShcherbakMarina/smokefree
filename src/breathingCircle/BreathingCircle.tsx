import * as React from 'react';
import { getExerciseSetup, convertTransformValue } from './utils/breathingCircleUtils';
import { exercise1, exercise2 } from './exercises/breathingExercises';

export class BreathingCircle extends React.Component {
  private circle: any;
  private text: any;
  private hold: any;
  private inhale: any;
  private exhale: any;

  state = {
    rules: getExerciseSetup(exercise1)
  };

  onCircleRef = (ref: any): void => {
    this.circle = ref;
  };

  onTextRef = (ref: any) => {
    this.text = ref;
  };

  onHoldRef = (ref: any) => {
    this.hold = ref;
  };

  onInhaleRef = (ref: any) => {
    this.inhale = ref;
  };

  onExhaleRef = (ref: any) => {
    this.exhale = ref;
  };

  componentDidMount() {
    const keyframe = convertTransformValue(this.state.rules.circleKeyframe);

    this.circle.animate(keyframe, this.state.rules.options);
    this.text.animate(keyframe, this.state.rules.options);
    this.hold.animate(this.state.rules.holdKeyframe, this.state.rules.options);
    this.inhale.animate(this.state.rules.inhaleKeyframe, this.state.rules.options);
    this.exhale.animate(this.state.rules.exhaleKeyframe, this.state.rules.options);
  }

  render() {
    return (
      <div className={'lung-exercise'}>
          <div className={'circle'} ref={this.onCircleRef} />
          <div className={'outer-circle'} />
          <div className={'inner-circle'} />
          <div className={'text'} ref={this.onTextRef}>
            <span className={'hold'} ref={this.onHoldRef}>HOLD</span>
            <span className={'inhale'} ref={this.onInhaleRef}>INHALE</span>
            <span className={'exhale'} ref={this.onExhaleRef}>EXHALE</span>
          </div>
      </div>
    );
  }
}
