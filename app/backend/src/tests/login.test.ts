import chai from "chai";
import chaiHttp from "chai-http";
import {app} from '../app'

chai.use(chaiHttp)

describe('Testa a rota POST /login', () => { 
  it('Testa caso não autorizado', async ()=> {
    const httpResponse = await chai.request(app).post('/login')
    
    expect(httpResponse.status).toBe(201)
  })
  it('Testa caso autorizado', async ()=> {
    const httpResponse = await chai.request(app).post('/login')
    
    expect(httpResponse.status).toBe(200)
  })

})

