import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import UserList from './containers/user-list';
import UserDetail from './containers/user-detail';

class App extends Component {
  render() {
    return (
      <div>
        <UserList />
        <hr />
        <UserDetail />
        <Carousel>
          <Carousel.Item>
            <img width={"100%"} alt="100%" src="/images/1.jpg" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={"100%"} alt="100%" src="/images/2.jpg" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={"100%"} alt="100%" src="/images/3.jpg" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default App;
