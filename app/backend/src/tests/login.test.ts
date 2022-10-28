import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Users from '../database/models/UserModel'
import { Response } from 'superagent';
import * as bcryptjs from 'bcryptjs'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota POST /login', () => { 
  let httpResponse: Response;
  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Testa caso com body inválido', async ()=> {
    sinon
    .stub(Users, "findOne")
    .resolves(undefined);

     httpResponse = await chai.request(app).post('/login').send({})
    
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  })

  it('Testa caso com credenciais inválidas', async ()=> {
    sinon
    .stub(Users, "findOne")
    .resolves(undefined);

    httpResponse = await chai.request(app).post('/login').send({email:'xablau@xablau.com', password:'xablauzinho'})
    
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  })

  it('Testa caso autorizado', async ()=> {
    const validUser = {email:'correctEmail@email.com',password:'correctPassword'}
    sinon.stub(bcryptjs,'compare').resolves(true)
    sinon
      .stub(Users, "findOne")
      .resolves({
        ...validUser
      } as Users);
    
    
    httpResponse = await chai.request(app).post('/login').send(validUser)
    
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.haveOwnProperty('token')
  })
})