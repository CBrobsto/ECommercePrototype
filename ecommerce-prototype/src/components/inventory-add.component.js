import React, { Component } from 'react';
import axios from 'axios';


export default class InventoryAdd extends Component {

    constructor(props) {
        super(props);

        this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
        this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
        this.onChangeItemPrice = this.onChangeItemPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            item_description: '',
            item_id: '-1',
            item_quantity: '',
            item_price: ''
        }
    }

    onChangeItemDescription(e) {
        this.setState({
            item_description: e.target.value
        });
    }

    onChangeItemQuantity(e) {
        this.setState({
            item_quantity: e.target.value
        });
    }

    onChangeItemPrice(e) {
        this.setState({
            item_price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Item Description: ${this.state.item_description}`);
        console.log(`Item Quantity: ${this.state.item_quantity}`);
        console.log(`Item Price: ${this.state.item_price}`);
        console.log(`Item ID: ${this.state.item_id}`);

        const newItem = {
            item_description: this.state.item_description,
            item_id: this.state.item_id,
            item_quantity: this.state.item_quantity,
            item_price: this.state.item_price
        };

        axios.post('http://localhost:4000/inventory/add', newItem)
        .then(res => console.log(res.data));
        
        this.setState({
            item_description: '',
            item_id: '-1',
            item_quantity: '',
            item_price: ''
        });
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add an Item to the Inventory</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.item_description}
                                onChange={this.onChangeItemDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.item_quantity}
                                onChange={this.onChangeItemQuantity}
                                />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.item_price}
                                onChange={this.onChangeItemPrice}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}