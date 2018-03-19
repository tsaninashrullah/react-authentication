import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Pagination } from 'react-bootstrap';
import { getProduct } from '../actions/product-action';

class ListTableProduct extends Component {
    constructor(props) {
        super(props);
        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleButtonPage = this.handleButtonPage.bind(this);
        // this.onclickPagination = this.onclickPagination.bind(this);
        // this.getProduct = this.getProduct.bind(this);
        this.state = {
            products : [],
            page : 1,
            index : 1,
            limit : 5,
            keyword : ''
            // totalPageBefore : this.props.productReducer.totalPage
        }
    }

    // async getProduct(){
        
    
    //     this.setState({
    //         products : dataBody.data
    //     })
    // };
        
    async handleLimitChange(event) {
        await this.setState({
            limit: event.target.value
        })
        await this.props.getProduct(this.state.page, this.state.limit, this.state.keyword);
        await this.setState({
            page : this.props.reducerProduct.existingPage
        });
    }
        
    async handleSearch(event) {
        if (event.key === 'Enter') {
            await this.setState({
                keyword: event.target.value
            })
            await this.props.getProduct(this.state.page, this.state.limit, this.state.keyword);
            await this.setState({
                page : this.props.reducerProduct.existingPage
            })
        }
    }

    async handleChangePage(event) {
        await this.setState({
            page : event.target.id
        })
        await this.props.getProduct(this.state.page, this.state.limit, this.state.keyword);
        await this.setState({
            page : this.props.reducerProduct.existingPage
        })
    }

    async handleButtonPage(type) {
        await this.setState({
            page : ((type === 'previous') ? parseInt(this.state.page) - 1 : parseInt(this.state.page) + 1)
        })
        await this.props.getProduct(this.state.page, this.state.limit, this.state.keyword);
        // await this.setState({
            //     page : this.props.reducerProduct.existingPage
            // })
        }
        
        onclickPagination(index) {
        this.setState({index});
    }

    methodClickPage(number) {
        this.onclickPagination(number);
        this.handleChangePage;
    }

    componentWillMount() {
        this.props.getProduct(this.state.page, this.state.limit, this.state.keyword);
    }
    render() {
        let paginationHtml = null;
        console.log(this.props.reducerProduct.totalPage);
        if (this.props.reducerProduct.totalPage !== 0) {
            console.log("HERE");
            let items = [];
            const page = Math.ceil(this.props.reducerProduct.total / this.state.limit);
            let activePage = this.props.reducerProduct.existingPage;
            let minimumPage = ((this.props.reducerProduct.totalPage < 5) ? this.props.reducerProduct.totalPage : 5)
            let pageNumber = (parseInt(activePage) - 3 > 0 ? parseInt(activePage) - 2 : 1 )
            let paginationNumber = (parseInt(activePage) - 3 > 0 ? ((parseInt(activePage) + 2 > this.props.reducerProduct.totalPage) ? this.props.reducerProduct.totalPage : parseInt(activePage) + 2) : minimumPage )
            for (let number = parseInt(pageNumber); number <= parseInt(paginationNumber); number++) {
                if (number !== 1 && number != this.props.reducerProduct.totalPage) {
                    items.push(
                        <Pagination.Item key={number} className={((number===this.props.reducerProduct.existingPage) ? "active" : "")} active={number === this.props.reducerProduct.existingPage} id={number} data-page={number} onClick={this.handleChangePage}>{number}</Pagination.Item>
                    );
                }
            }
            paginationHtml = <Pagination bsSize="medium">
                {
                    ((this.state.page !== 1) ? <Pagination.Prev onClick={() => this.handleButtonPage('previous')} /> : null)
                }
                <Pagination.Item key="1" active={1 === this.props.reducerProduct.existingPage} onClick={this.handleChangePage} id="1">{1}</Pagination.Item>
                {
                    ((parseInt(activePage) - 3 > 0) ? <Pagination.Ellipsis /> : null)
                }
                {items}
                {
                    ((parseInt(activePage) + 3 <= this.props.reducerProduct.totalPage) ? <Pagination.Ellipsis /> : null)
                }
                <Pagination.Item active={this.props.reducerProduct.totalPage === this.props.reducerProduct.existingPage} key={this.props.reducerProduct.totalPage} id={this.props.reducerProduct.totalPage} onClick={this.handleChangePage}>{this.props.reducerProduct.totalPage}</Pagination.Item>
                {
                    ((this.state.page !== this.props.reducerProduct.totalPage) ? <Pagination.Next onClick={() => this.handleButtonPage('next')} /> : null)
                }
            </Pagination>;
        }
        // let paginationHtml = null;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h4>PAGE NUMBER #{this.state.page}, With total record per page {this.state.limit}</h4>
                        </Col>
                        <Col xs={3}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Record per page</ControlLabel>
                                <FormControl componentClass="select" onChange={this.handleLimitChange}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={9}>
                            <ControlLabel>Search by keyword</ControlLabel>
                            <FormControl onKeyPress={this.handleSearch}/>
                        </Col>
                    </Row>
                </Grid>
                <Table responsive striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Nama Produk</th>
                            <th>Berat</th>
                            <th>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ((this.props.reducerProduct.products.length > 0) ? 
                            this.props.reducerProduct.products.map((value) => {
                                console.log(this.props.reducerProduct.products.length);
                                return (
                                    <tr key={value.id}>
                                        <td>{value.product_name}</td>
                                        <td>{value.product_weight}</td>
                                        <td>{value.product_price}</td>
                                    </tr>
                                )
                            })
                            : <tr key="1">
                                <td colSpan={3}>
                                    Data not found
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
                <Grid>
                    <Row>
                        <Col xs={9}>
                        { paginationHtml }
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        reducerProduct: state.productReducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProduct:getProduct}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ListTableProduct);