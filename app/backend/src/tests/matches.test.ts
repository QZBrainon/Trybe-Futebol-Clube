import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import Matches from '../database/models/MatchModel';
import mock from './mocks/matchesMock'
import IMatches from '../interfaces/IMatches'
import inProgressMatches from './mocks/inProgressMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matches', () => {
  let httpResponse: Response;
afterEach(()=>{
  (Matches.findAll as sinon.SinonStub).restore();
})
  it('Testa caso sem query params', async () => {
    
    sinon
    .stub(Matches, 'findAll')
    .resolves(mock as any);

    httpResponse = await chai.request(app).post('/login').send()

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.deep.equal(mock)
  })
  
  it('Testa caso com query params', async () => {
    
    sinon
    .stub(Matches, 'findAll')
    .resolves(inProgressMatches as any);

    httpResponse = await chai.request(app).post('/login').query('inProgress=true')

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.deep.equal(inProgressMatches)
  })
})