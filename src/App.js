import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'

function App() {
  return (
    <Container>
      <Row>
        <Col lg={12} md={12}>
          <Form>
            <FormGroup>
              <Label for="exToken">X-App-Token</Label>
              <Input
                id="exampleXAppToken"
                name="xapptoken"
                type="text"
                placeholder="isikan X-App-Token ..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="exEnv">Environtment</Label>
              <Input
                id="exampleEnv"
                name="environtment"
                type="select"
              >
                <option value="uat">Uat</option>
                <option value="stg">Staging</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exLeadId">Lead Id</Label>
              <Input
                id="exampleLeadId"
                name="leadid"
                type="text"
                placeholder="isikan lead id ..."
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary">Proses</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default App
