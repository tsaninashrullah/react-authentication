import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

class ListProfileUser extends Component {
    constructor() {
        super();
        this.state = {
            box : []
        }
    }
    componentWillMount() {
        fetch('https://randomuser.me/api?results=24')
            .then(results => {
                return results.json();
            })
            .then(data => {
                let thumbnail = data.results.map((value) => {
                    return (
                        <Col xs={3} key={value.email}>
                            <img src={value.picture.large} width="100%" alt="100%" />
                            <hr/>
                            <h2>{value.name.first}</h2>
                            <h3>{value.email}</h3>
                        </Col>
                    );
                });
                this.setState({
                    box : thumbnail
                });
            })
    }

    render() { 
        return (
            this.state.box
        )
    }
}

 
export default ListProfileUser;