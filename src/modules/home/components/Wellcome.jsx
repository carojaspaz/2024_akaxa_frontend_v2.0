/** @format */

import React from 'react'

import { Card, Grid, Item } from '@mui/material'
import Tipograpy

const Wellcom = () => {
  return (
    <>
      <Card >
        <Grid container spacion={2}>
            <Grid item xs={10}>
               <Item><img className="img-fluid" src={'/assets/images/headers/bg-1.png'} alt="Safety&Trust" /></Item>
            </Grid>
            <Grid item xs={2}>
                <Item><img src={profileImg} alt="" className="img-fluid mt-5 pr-4" /></Item>
            </Grid>
            <Grid item xs={2}>
                <Item><img src={this.props.pic} alt="" /></Item>
            </Grid>
            <Grid item xs={8}>
                <Item>
                    <div className="pt-4">
                {this.props.t('Welcome')}
                <h6>{this.props.user.fullName}</h6>
              </div>
                </Item>
            </Grid>
            <Grid item xs={2}>
                <Item></Item>
            </Grid>
        </Grid>
        
        <CardBody className="pt-0 bg-warning">
          <Row>
            <Col sm="2">
              <div className="avatar-lg profile-user-wid">
                
              </div>
            </Col>
            <Col sm="8">
              <div className="pt-4">
                {this.props.t('Welcome')}
                <h6>{this.props.user.fullName}</h6>
              </div>
            </Col>
            <Col sm="2">
              <Link to="/profile/view" color="primary" className="btn btn-primary mt-4 float-right">
                {this.props.t('Ver Perfil')}
              </Link>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default Wellcome
