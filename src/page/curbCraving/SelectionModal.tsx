import React from 'react';

import './SelectionModal.css';

export class SelectionModal extends React.Component<any, any> {
    state = {
        newPropertyValue: '',
        editMode: false,
        itemEditIndex: -1,
        itemEditValue: ''
    };

    render() {
        const { title, property, onRemove, onClose } = this.props;

        return (
            <div className={'curb-craving__modal-overlay'}>
                <div className={'curb-craving__modal'}>
                    <h4>{title}</h4>
                    <ul className={'curb-craving__modal-list'}>
                        {property.map((element: any, index: any) => {
                            const { editMode, itemEditIndex, itemEditValue } = this.state;
                            const className = editMode && itemEditIndex === index ? 'edit-mode' : '';

                            return <li key={index} className={className}>
                                <span className={'curb-craving__modal-element'}>{element}</span>
                                <input
                                    className={'curb-craving__modal-edit-input'}
                                    type={'text'}
                                    value={itemEditValue}
                                    onChange={this.handleEditItemChange}
                                />
                                <div className={'curb-craving__modal-actions'}>
                                    <button className={'curb-craving__save-action'} onClick={this.handleSaveItemChange}>Save</button>
                                    <button className={'curb-craving__edit-action'} onClick={() => this.enableEditMode(index, element)}>Edit</button>
                                    <button onClick={() => this.handleItemRemove(index)}>Remove</button>
                                </div>
                            </li>
                        })}
                        <li>
                            <input type="text" value={this.state.newPropertyValue} onChange={this.handleNewPropertyChange}/>
                            <button onClick={this.handleNewPropertyAdd}>+</button>
                        </li>
                    </ul>
                    <div className={'close-icon'} onClick={onClose}>x</div>
                </div>
            </div>
        );
    }

    handleItemRemove = (index: number) => {
        this.props.onRemove(index);

        this.setDefaultEditMode();
    };

    handleEditItemChange = (event: any) => {
        this.setState({ itemEditValue: event.target.value });
    };

    handleSaveItemChange = () => {
        const { itemEditIndex, itemEditValue } = this.state;

        this.props.onEdit(itemEditIndex, itemEditValue);

        this.setDefaultEditMode();
    };

    enableEditMode = (index: number, itemEditValue: string) => {
        this.setState({ editMode: true, itemEditIndex: index, itemEditValue });
    };

    handleNewPropertyChange = (event: any) => {
        this.setState({ newPropertyValue: event.target.value });
    };

    handleNewPropertyAdd = () => {
        this.props.onNewPropertyAdd(this.state.newPropertyValue);

        this.setState({ newPropertyValue: '' });
    };

    setDefaultEditMode = () => {
        this.setState({ editMode: false, itemEditIndex: -1, itemEditValue: '' });
    };
}
