import React from 'react';

import './Motivation.css';

const motivations = [
  'to be happy',
  'to be healthy'
];

export class Motivation extends React.Component<any, any> {
    state = {
        newPropertyValue: '',
        editMode: false,
        itemEditIndex: -1,
        itemEditValue: ''
    };

    render() {
        return <div className={'motivation'}>
            <h2>What motivates me?</h2>
            <ul className={'motivation__list'}>
                {motivations.map((element: any, index: any) => {
                    const { editMode, itemEditIndex, itemEditValue } = this.state;
                    const className = editMode && itemEditIndex === index ? 'edit-mode' : '';

                    return <li key={index} className={className}>
                        <p className={'motivation__point'}>
                            <span>I'm ready to quit smoking so that </span>
                            <span className={'motivation__list-element'}>{element}</span>
                            <input
                                className={'motivation__edit-input'}
                                type={'text'}
                                value={itemEditValue}
                                onChange={this.handleEditItemChange}
                            />
                        </p>
                        <div className={'motivation__actions'}>
                            <button className={'motivation__save-action'} onClick={this.handleSaveItemChange}>Save</button>
                            <button className={'motivation__edit-action'} onClick={() => this.enableEditMode(index, element)}>Edit</button>
                            <button onClick={() => this.handleItemRemove(index)}>Remove</button>
                        </div>
                    </li>
                })}
                <li>
                    <input type="text" value={this.state.newPropertyValue} onChange={this.handleNewPropertyChange}/>
                    <button onClick={this.handleNewPropertyAdd}>+</button>
                </li>
            </ul>
        </div>;
    }

    handleEditItemChange = (event: any) => {
        this.setState({ itemEditValue: event.target.value });
    };

    handleSaveItemChange = () => {
        const { itemEditIndex, itemEditValue } = this.state;

        // this.props.onEdit(itemEditIndex, itemEditValue);

        this.setDefaultEditMode();
    };

    setDefaultEditMode = () => {
        this.setState({ editMode: false, itemEditIndex: -1, itemEditValue: '' });
    };

    enableEditMode = (index: number, itemEditValue: string) => {
        this.setState({ editMode: true, itemEditIndex: index, itemEditValue });
    };

    handleItemRemove = (index: number) => {
        // this.props.onRemove(index);

        this.setDefaultEditMode();
    };

    handleNewPropertyChange = (event: any) => {
        this.setState({ newPropertyValue: event.target.value });
    };

    handleNewPropertyAdd = () => {
        // this.props.onNewPropertyAdd(this.state.newPropertyValue);

        this.setState({ newPropertyValue: '' });
    };
}
