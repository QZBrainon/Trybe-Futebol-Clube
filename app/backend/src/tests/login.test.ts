import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import userService from '../services/UserService'
import UserService from '../services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota POST /login', () => { 
  it('Testa caso com body inválido', async ()=> {
    const httpResponse = await chai.request(app).post('/login').send({})
    
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  })
  it('Testa caso com credenciais inválidas', async ()=> {
    const httpResponse = await chai.request(app).post('/login').send({email:'xablau@xablau.com', password:'xablauzinho'})
    
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  })
  // it('Testa caso autorizado', async ()=> {

  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc'
  //   sinon.stub(app, 'router').resolves(token)
    
  //   const httpResponse = await chai.request(app).post('/login').send({email:'correctEmail@email.com',password:'correctPassword'})
    
  //   expect(httpResponse.status).to.equal(200)
  //   expect(httpResponse.body).to.deep.equal({token})

  // })

})