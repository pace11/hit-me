/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  BsFillCheckCircleFill,
  BsFillXCircleFill,
  BsLightningChargeFill,
} from 'react-icons/bs'
import {
  useQuery,
  transformKabayanMember,
  transformKabayanInterview,
  transformKycMember,
  transformKycInterview,
  validationMember,
  validationInterview,
} from './utils'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap'
import { getKabayan, getKyc } from './api'

function App() {
  const query = useQuery()
  const [params, setParams] = useState({
    environtment: null,
    lead_id: null,
    x_app_token: null,
  })
  const [kabayanMember, setKabayanMember] = useState(false)
  const [kabayanInterview, setKabayanInterview] = useState(false)
  const [kycMember, setKycMember] = useState(false)
  const [kycInterview, setKycInterview] = useState(false)
  const [validatorMember, setValidatorMember] = useState(false)
  const [validatorInterview, setValidatorInterview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (
      query.get('x_app_token') &&
      query.get('environtment') &&
      query.get('lead_id')
    ) {
      setIsLoading(true)
      setParams({
        ...params,
        x_app_token: query.get('x_app_token'),
        lead_id: query.get('lead_id'),
        environtment: query.get('environtment'),
      })

      // get kabayan
      getKabayan({
        slug: '/members',
        lead_id: query.get('lead_id'),
        environtment: query.get('environtment'),
        x_app_token: query.get('x_app_token'),
      })
        .then((res) => {
          if (res.data?.success) {
            setKabayanMember(transformKabayanMember(res.data?.data))
            setIsLoading(false)
          }
        })
        .catch((err) => console.log('err => ', err))

      getKabayan({
        slug: '/interviews',
        lead_id: query.get('lead_id'),
        environtment: query.get('environtment'),
        x_app_token: query.get('x_app_token'),
      })
        .then((res) => {
          if (res.data?.success) {
            setKabayanInterview(
              transformKabayanInterview(res.data?.data),
            )
            setIsLoading(false)
          }
        })
        .catch((err) => console.log('err => ', err))

      // get kyc
      getKyc({
        slug: '/members',
        lead_id: query.get('lead_id'),
        environtment: query.get('environtment'),
        x_app_token: query.get('x_app_token'),
      })
        .then((res) => {
          if (res.data?.success) {
            setKycMember(transformKycMember(res.data?.data))
            setIsLoading(false)
          }
        })
        .catch((err) => console.log('err => ', err))

      getKyc({
        slug: '/interviews',
        lead_id: query.get('lead_id'),
        environtment: query.get('environtment'),
        x_app_token: query.get('x_app_token'),
      })
        .then((res) => {
          if (res.data?.success) {
            setKycInterview(transformKycInterview(res.data?.data))
            setIsLoading(false)
          }
        })
        .catch((err) => console.log('err => ', err))
    }
  }, [query])

  useEffect(() => {
    if (kabayanMember && kycMember) {
      setValidatorMember(validationMember(kabayanMember, kycMember))
    }
  }, [kabayanMember, kycMember])

  useEffect(() => {
    if (kabayanInterview && kycInterview) {
      setValidatorInterview(
        validationInterview(kabayanInterview, kycInterview),
      )
    }
  }, [kabayanInterview, kycInterview])

  return (
    <Container>
      <Row>
        <h3 style={{ textAlign: 'center' }}>
          Hit Me <BsLightningChargeFill />
        </h3>
      </Row>
      <Row>
        <Col lg={12} md={12}>
          <Form>
            <FormGroup>
              <Label for="exToken">X-App-Token</Label>
              <Input
                id="exampleXAppToken"
                name="x_app_token"
                type="text"
                placeholder="isikan X-App-Token ..."
                value={params?.x_app_token}
                onChange={(e) => {
                  setParams({
                    ...params,
                    x_app_token: e.target.value,
                  })
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exEnv">Environtment</Label>
              <Input
                id="exampleEnv"
                name="environtment"
                type="select"
                value={params?.environtment}
                onChange={(e) => {
                  setParams({
                    ...params,
                    environtment: e.target.value,
                  })
                }}
              >
                <option value="uat">Uat</option>
                <option value="stg">Staging</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exLeadId">Lead Id</Label>
              <Input
                id="exampleLeadId"
                name="lead_id"
                type="text"
                placeholder="isikan lead id ..."
                value={params?.lead_id}
                onChange={(e) => {
                  setParams({
                    ...params,
                    lead_id: e.target.value,
                  })
                }}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" disabled={isLoading}>
                {isLoading ? `Loading ...` : `Proses`}
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6">
          <Card className="my-2" color="primary" outline>
            <CardHeader>Kabayan Member</CardHeader>
            <CardBody>
              {validatorMember && kabayanMember && (
                <>
                  <p>
                    <b>lead_id</b>: {kabayanMember?.lead_id}{' '}
                    {validatorMember?.lead_id ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>name</b>: {kabayanMember?.name}{' '}
                    {validatorMember?.name ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>phone</b>: {kabayanMember?.phone}{' '}
                    {validatorMember?.phone ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>email</b>: {kabayanMember?.email}{' '}
                    {validatorMember?.email ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>registration_date</b>:{' '}
                    {kabayanMember?.registration_date}{' '}
                    {validatorMember?.registration_date ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>registration_image</b>:{' '}
                    {kabayanMember?.registration_image}{' '}
                    {validatorMember?.registration_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>kyc_image</b>: {kabayanMember?.kyc_image}{' '}
                    {validatorMember?.kyc_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>marriage_status</b>:{' '}
                    {kabayanMember?.marriage_status}{' '}
                    {validatorMember?.marriage_status ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>is_having_npwp</b>:{' '}
                    {kabayanMember?.is_having_npwp}{' '}
                    {validatorMember?.is_having_npwp ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>npwp_number</b>: {kabayanMember?.npwp_number}{' '}
                    {validatorMember?.npwp_number ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>npwp_image</b>: {kabayanMember?.npwp_image}{' '}
                    {validatorMember?.npwp_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>npwp_statement</b>:{' '}
                    {kabayanMember?.npwp_statement}{' '}
                    {validatorMember?.npwp_statement ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>address</b>: {kabayanMember?.address}{' '}
                    {validatorMember?.address ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>family_card_image</b>:{' '}
                    {kabayanMember?.family_card_image}{' '}
                    {validatorMember?.family_card_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6">
          <Card className="my-2" color="primary" outline>
            <CardHeader>KYC Member</CardHeader>
            <CardBody>
              {validatorMember && kycMember && (
                <>
                  <p>
                    <b>lead_id</b>: {kycMember?.lead_id}{' '}
                    {validatorMember?.lead_id ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>name</b>: {kycMember?.name}{' '}
                    {validatorMember?.name ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>phone</b>: {kycMember?.phone}{' '}
                    {validatorMember?.phone ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>email</b>: {kycMember?.email}{' '}
                    {validatorMember?.email ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>registration_date</b>:{' '}
                    {kycMember?.registration_date}{' '}
                    {validatorMember?.registration_date ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>registration_image</b>:{' '}
                    {kycMember?.registration_image}{' '}
                    {validatorMember?.registration_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>kyc_image</b>: {kycMember?.kyc_image}{' '}
                    {validatorMember?.kyc_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>marriage_status</b>:{' '}
                    {kycMember?.marriage_status}{' '}
                    {validatorMember?.marriage_status ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>is_having_npwp</b>: {kycMember?.is_having_npwp}{' '}
                    {validatorMember?.is_having_npwp ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>npwp_number</b>: {kycMember?.npwp_number}{' '}
                    {validatorMember?.npwp_number ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>npwp_image</b>: {kycMember?.npwp_image}{' '}
                    {validatorMember?.npwp_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>npwp_statement</b>: {kycMember?.npwp_statement}{' '}
                    {validatorMember?.npwp_statement ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>address</b>: {kycMember?.address}{' '}
                    {validatorMember?.address ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                  <p>
                    <b>family_card_image</b>:{' '}
                    {kycMember?.family_card_image}{' '}
                    {validatorMember?.family_card_image ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6">
          <Card className="my-2" color="primary" outline>
            <CardHeader>Kabayan Interview</CardHeader>
            <CardBody>
              {validatorInterview && kabayanInterview && (
                <>
                  <p>
                    <b>interview_date</b>:{' '}
                    {kabayanInterview?.interview_date}{' '}
                    {validatorInterview?.interview_date ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6">
          <Card className="my-2" color="primary" outline>
            <CardHeader>KYC Interview</CardHeader>
            <CardBody>
              {validatorInterview && kycInterview && (
                <>
                  <p>
                    <b>interview_date</b>:{' '}
                    {kycInterview?.interview_date}{' '}
                    {validatorInterview?.interview_date ? (
                      <BsFillCheckCircleFill color="#63BA76" />
                    ) : (
                      <BsFillXCircleFill color="#db284e" />
                    )}
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App
