import React, { Component } from 'react';
import axios from 'axios';

export default class InventoryEdit extends Component {

    constructor(props) {
        super(props);

        this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
        this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
        this.onChangeItemPrice = this.onChangeItemPrice.bind(this);
        this.onChangeItemID = this.onChangeItemID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            item_description: '',
            item_id: '-1',
            item_quantity: '',
            item_price: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/inventory/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    item_description: response.data.item_description,
                    item_id: response.data.item_id,
                    item_quantity: response.data.item_quantity,
                    item_price: response.data.item_price
                });
                console.log(this.state);
            })
            .catch(function (error) {
                console.log(error);
            });
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

    onChangeItemID(e) {
        this.setState({
            item_id: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            item_description: this.state.item_description,
            item_quantity: this.state.item_quantity,
            item_price: this.state.item_price,
            item_id: this.state.item_id
        };
        console.log(obj);
        axios.post('http://localhost:4000/inventory/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Item</h3>
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
                        <label>ID: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.item_id}
                                onChange={this.onChangeItemID}
                                />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}