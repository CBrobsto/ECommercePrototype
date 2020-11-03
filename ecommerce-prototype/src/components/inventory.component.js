import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = props => (
    <tr>
        <td className={props.item.item_quantity<=0 ? 'outOfStock' : ''}>{props.item.item_description}</td>
        <td className={props.item.item_quantity<=0 ? 'outOfStock' : ''}>{props.item.item_quantity}</td>
        <td className={props.item.item_quantity<=0 ? 'outOfStock' : ''}>{props.item.item_price}</td>
        <td>
            <Link to={"/inventory/edit/"+props.item._id}>Edit</Link>
        </td>
    </tr>
)

export default class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = {inventory: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/inventory')
            .then(response => {
                console.log(response);
                console.log(this.state);
                this.setState({ inventory: response.data });
                console.log(this.state);
            })
            .catch(function (error){
                console.log(error);
            });
    }

    listInventory() {
        return this.state.inventory.map(function(currentItem, i){
            return <Item item={currentItem} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Inventory</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listInventory() }
                    </tbody>
                </table>
            </div>
        );
    }
}
