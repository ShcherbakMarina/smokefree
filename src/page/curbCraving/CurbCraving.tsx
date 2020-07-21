import * as React from 'react';
import { connect } from 'react-redux';
import {
    addCurving,
    removeCurving,
    removeMoodItem,
    removeTriggerItem,
    addMoodItem,
    addTriggerItem,
    editMoodItem,
    editTriggerItem
} from '../../actions';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EditIcon } from '../../icons/EditIcon';
import { SelectionModal } from './SelectionModal';
import { BlockedContent } from '../../components/blockedContent/BlockedContent';

import './CurbCraving.css';

type ChartView = 'column' | 'pie';
type Properties = 'moods' | 'triggers';

class CurbCravingClass extends React.Component<any, any> {
    state = {
        curving: '',
        mood: '',
        trigger: '',
        moodData: [],
        triggerData: [],
        chartView: 'pie',
        moodModalIsOpened: false,
        triggerModalIsOpened: false,
        property: []
    };

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { moods, triggers } = this.props;

        if (!prevProps.moods.length && !prevProps.triggers.length && moods.length && triggers.lenght) {
            this.setState({
                moodData: [...moods.map(() => 0)],
                triggerData: [...triggers.map(() => 0)]
            });
        }
    }

    render() {
        const shouldRenderAnalytics = !!this.props.curvingHistory.length;

        return (
            <div className={'curb-craving'}>
                <h2>Curb craving</h2>
                <p>This section is for analyzing your triggers and helping you to curb it. When you’re experiencing carving
                    try to understand what was the trigger exactly and type below, then listen SOS material. When you
                    understand your triggers you can control them.</p>
                <div className={'curb-craving__form'}>
                    <textarea
                        placeholder={'Add your thoughts here'}
                        className={'curb-craving__input'}
                        value={this.state.curving}
                        onChange={this.handleTextChange}
                    />
                    {this.renderMoodSelection()}
                    {this.renderTriggerSelection()}
                    <button className={'curb-craving__button'} onClick={this.addCurbCraving}>Submit</button>
                </div>
                {shouldRenderAnalytics && this.renderCurvingHistory()}
                {shouldRenderAnalytics && this.renderAnalytics()}
                {this.renderMoodSelectionModal()}
                {this.renderTriggerSelectionModal()}
            </div>
        );
    }

    updateState = () => {
        const { curvingHistory, moods, triggers } = this.props;
        const moodData = moods.map((value: any) => {
            return curvingHistory.filter((obj: any) => obj.mood === value).length;
        });
        const triggerData = triggers.map((value: any) => {
            return curvingHistory.filter((obj: any) => obj.trigger === value).length;
        });

        this.setState({ moodData, triggerData });
    };

    onChartChange = () => {
        const { chartView } = this.state;

        this.setState({ chartView: chartView === 'column' ? 'pie' : 'column' });
    };

    renderAnalytics() {
        const { moodData, triggerData, chartView } = this.state;
        const { moods, triggers } = this.props;

        return (
            <div className={'curb-craving__analytics'}>
                <h4>Analyse your results</h4>
                <button onClick={this.onChartChange}>Change chart view</button>
                {chartView === 'column' && this.renderColumnChart(moods, moodData, 'Mood analytics')}
                {chartView === 'pie' &&  this.renderPieChart(moods, moodData, 'Mood analytics')}
                <hr />
                {chartView === 'column' && this.renderColumnChart(triggers, triggerData, 'Trigger analytics')}
                {chartView === 'pie' &&  this.renderPieChart(triggers, triggerData, 'Trigger analytics')}
            </div>
        );
    }

    renderColumnChart(categories: any, data: any, title: string) {
        const amount = data.reduce((a: any, b: any) => a + b, 0);

        if (!amount) return;

        return <HighchartsReact
            highcharts={Highcharts}
            options={{
                title: {
                    text: title
                },
                xAxis: {
                    categories
                },
                series: [{
                    type: 'column',
                    colorByPoint: true,
                    data,
                    showInLegend: false
                }]
            }}
        />;
    }

    renderPieChart(property: any, propertyData: any, title: string) {
        const amount = propertyData.reduce((a: any, b: any) => a + b, 0);
        const dataM = property.map((element: any, index: any) => {
            const y = propertyData[index]/amount*100;

            if (!y) return;

            return {
                name: element,
                y
            };
        });
        const data = dataM.filter((el: any) => !!el);

        if (!amount) return;

        return <HighchartsReact
            highcharts={Highcharts}
            options={{
                chart: {
                    type: 'pie'
                },
                title: {
                    text: title
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data
                }]
            }}
        />;
    }

    renderMoodSelection() {
        const { moods } = this.props;

        return (
            <div className={'curb-craving__selection-wrapper'}>
                <select className={'curb-craving__selection'} value={this.state.mood} onChange={this.handleMoodChange}>
                    <option value="" selected>Select you current mood</option>
                    {moods.map((value: any) => {
                        return <option value={value}>{value}</option>;
                    })}
                </select>
                <div className={'curb-craving__selection-edit'} onClick={this.onMoodSelectionEdit}>
                    <EditIcon fill={'grey'} />
                </div>
            </div>
        );
    }

    handleMoodChange = (event: any) => {
        this.setState({ mood: event.target.value });
    };

    renderMoodSelectionModal() {
        if (!this.state.moodModalIsOpened) return;

        const { moods, removeMoodItem, addMoodItem, editMoodItem } = this.props;

        return (
            <SelectionModal
                title={'Moods'}
                property={moods}
                onEdit={editMoodItem}
                onRemove={removeMoodItem}
                onClose={this.onModalClose}
                onNewPropertyAdd={addMoodItem}
            />
        );
    }

    renderTriggerSelectionModal() {
        if (!this.state.triggerModalIsOpened) return;

        const { triggers, removeTriggerItem, addTriggerItem, editTriggerItem } = this.props;

        return (
            <SelectionModal
                title={'Triggers'}
                property={triggers}
                onEdit={editTriggerItem}
                onRemove={removeTriggerItem}
                onClose={this.onModalClose}
                onNewPropertyAdd={addTriggerItem}
            />
        );
    }

    onModalClose = () => {
        this.setState({ moodModalIsOpened: false, triggerModalIsOpened: false });
    };

    onMoodSelectionEdit = () => {
        this.setState({ moodModalIsOpened: true });
    };

    onTriggerSelectionEdit = () => {
        this.setState({ triggerModalIsOpened: true });
    };

    renderTriggerSelection() {
        const { triggers } = this.props;

        return (
            <div className={'curb-craving__selection-wrapper'}>
                <select className={'curb-craving__selection'} value={this.state.trigger} onChange={this.handleTriggerChange}>
                    <option value="" selected>Select you trigger</option>
                    {triggers.map((value: any) => {
                        return <option value={value}>{value}</option>;
                    })}
                </select>
                <div className={'curb-craving__selection-edit'} onClick={this.onTriggerSelectionEdit}>
                    <EditIcon fill={'grey'} />
                </div>
            </div>
        );
    }

    handleTriggerChange = (event: any) => {
        this.setState({ trigger: event.target.value });
    };

    renderCurvingHistory() {
        const { isAnonymous } = this.props;

        // return isAnonymous ? <BlockedContent text={'Upgrade to unlock Curb Craving History'} /> :
        return (
            <div className={'curving-history'}>
                <h4>Curving history</h4>
                <ul className={'curb-craving__list'}>
                    {this.props.curvingHistory.map((element: any, index: number) => {
                        return this.renderCurving(index, element);
                    })}
                </ul>
            </div>);
    }

    renderCurving(index: number, element: any) {
        const { text, mood, trigger, date } = element;
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date );
        const formattedDate = `${day}-${month}-${year }`;

        return (
            <li key={index}>
                <p className={'curb-craving__info'}>
                    <span className={'curb-craving__mood'}>Mood: {mood}</span>
                    <span className={'curb-craving__trigger'}>Trigger: {trigger}</span>
                </p>
                <p className={'curb-craving__text'}>{text}</p>
                <p className={'curb-craving__date'}>{formattedDate}</p>
                <div className={'close-icon'} onClick={() => this.onRemove(index)}>x</div>
            </li>
        );
    }

    onRemove = (index: number) => {
        this.props.removeCurving(index);
    };

    handleTextChange = (event: any) => {
        this.setState({ curving: event.target.value });
    };

    addCurbCraving = () => {
        const { curving, mood, trigger } = this.state;

        if (!curving) return;

        this.props.addCurving(curving, mood, trigger);
        this.setState({ curving: '', mood: '', trigger: '' }, this.updateState);
    };
}

function mapStateToProps(state: any) {
    return {
        curvingHistory: state.curvingHistory,
        moods: state.moods,
        triggers: state.triggers,
        isAnonymous: state.account.type === 'minimal'
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        addCurving: (curving: string, mood: string, trigger: string) => dispatch(addCurving(curving, mood, trigger)),
        removeCurving: (id: number) => dispatch(removeCurving(id)),
        removeMoodItem: (id: number) => dispatch(removeMoodItem(id)),
        removeTriggerItem: (id: number) => dispatch(removeTriggerItem(id)),
        addMoodItem: (mood: string) => dispatch(addMoodItem(mood)),
        addTriggerItem: (trigger: string) => dispatch(addTriggerItem(trigger)),
        editMoodItem: (id: number, newValue: string) => dispatch(editMoodItem(id, newValue)),
        editTriggerItem: (id: number, newValue: string) => dispatch(editTriggerItem(id, newValue))
    };
}

export const CurbCraving = connect(mapStateToProps, mapDispatchToProps)(CurbCravingClass);
