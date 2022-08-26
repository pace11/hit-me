/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
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
import { getKabayan, getKyc, getKabayanCouchDb } from './api'

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
  const [isLoading, setIsLoading] = useState({
    kbMember: false,
    kycMember: false,
    kbInterview: false,
    kycInterview: false,
  })

  const [errorKycInterview, setErrorKycInterview] = useState(false)
  const [errorKycMember, setErrorKycMember] = useState(false)
  const [errorKbInterview, setErrorKbInterview] = useState(false)

  useEffect(() => {
    if (
      query.get('x_app_token') &&
      query.get('environtment') &&
      query.get('lead_id')
    ) {
      setIsLoading({
        ...isLoading,
        kbMember: true,
        kycMember: true,
        kbInterview: true,
        kycInterview: true,
      })
      setParams({
        ...params,
        x_app_token: query.get('x_app_token'),
        lead_id: query.get('lead_id'),
        environtment: query.get('environtment'),
      })

      // get kabayan
      getKabayanCouchDb({
        lead_id: query.get('lead_id'),
      })
        .then((res) => {
          if (res.data?.status === 200) {
            setKabayanMember(
              transformKabayanMember(res.data?.data[0]),
            )
            setIsLoading({
              ...isLoading,
              kbMember: false,
            })
          }
        })
        .catch((err) => {
          setIsLoading({
            ...isLoading,
            kbMember: false,
          })
          console.log('err => ', err)
        })

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
            setErrorKbInterview(false)
            setIsLoading({
              ...isLoading,
              kbInterview: false,
            })
          }
        })
        .catch((err) => {
          if (err.response) {
            setIsLoading({
              ...isLoading,
              kbInterview: false,
            })
            setErrorKbInterview(
              `${err.response.status}, ${err.response.data.message}`,
            )
          }
        })

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
            setErrorKycMember(false)
            setIsLoading({
              ...isLoading,
              kycMember: false,
            })
          }
        })
        .catch((err) => {
          if (err.response) {
            setIsLoading({
              ...isLoading,
              kycMember: false,
            })
            setErrorKycMember(
              `${err.response.status}, ${err.response.data.message}`,
            )
          }
        })

      getKyc({
        slug: '/interviews',
        lead_id: query.get('lead_id'),
        environtment: query.get('environtment'),
        x_app_token: query.get('x_app_token'),
      })
        .then((res) => {
          if (res.data?.success) {
            setKycInterview(transformKycInterview(res.data?.data))
            setErrorKycInterview(false)
            setIsLoading({
              ...isLoading,
              kycInterview: false,
            })
          }
        })
        .catch((err) => {
          setIsLoading({
            ...isLoading,
            kycInterview: false,
          })
          setErrorKycInterview(
            `${err.response.status}, ${err.response.data.message}`,
          )
        })
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
              <Button
                color="primary"
                disabled={
                  isLoading.kbMember &&
                  isLoading.kycMember &&
                  isLoading.kbInterview &&
                  isLoading.kycInterview
                }
              >
                {isLoading.kbMember &&
                isLoading.kycMember &&
                isLoading.kbInterview &&
                isLoading.kycInterview ? (
                  <ReactLoading
                    type="spin"
                    color="#fff"
                    height={25}
                    width={25}
                  />
                ) : (
                  `Proses`
                )}
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6">
          {isLoading.kbMember ? (
            <p>Loading ...</p>
          ) : (
            <Card className="my-2" color="primary" outline>
              <CardHeader>Kabayan Member</CardHeader>
              <CardBody>
                {kabayanMember && (
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
                      <b>created_at</b>: {kabayanMember?.created_at}{' '}
                      {validatorMember?.created_at ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>updated_at</b>: {kabayanMember?.updated_at}{' '}
                      {validatorMember?.updated_at ? (
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
                      <a
                        href={JSON.parse(
                          kabayanMember?.registration_image,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kabayanMember?.registration_image}
                      </a>{' '}
                      {validatorMember?.registration_image ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>kyc_image</b>:{' '}
                      <a
                        href={JSON.parse(kabayanMember?.kyc_image)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kabayanMember?.kyc_image}
                      </a>{' '}
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
                      <b>npwp_image</b>:{' '}
                      <a
                        href={JSON.parse(kabayanMember?.npwp_image)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kabayanMember?.npwp_image}
                      </a>{' '}
                      {validatorMember?.npwp_image ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>npwp_statement</b>:{' '}
                      <a
                        href={JSON.parse(
                          kabayanMember?.npwp_statement,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kabayanMember?.npwp_statement}
                      </a>{' '}
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
                      <a
                        href={JSON.parse(
                          kabayanMember?.family_card_image,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kabayanMember?.family_card_image}
                      </a>{' '}
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
          )}
        </Col>
        <Col lg="6" md="6">
          {isLoading.kycMember ? (
            <p>Loading ...</p>
          ) : (
            <Card className="my-2" color="primary" outline>
              <CardHeader>KYC Member</CardHeader>
              <CardBody>
                {kycMember && !errorKycMember && (
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
                      <b>created_at</b>: {kycMember?.created_at}{' '}
                      {validatorMember?.created_at ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>updated_at</b>: {kycMember?.updated_at}{' '}
                      {validatorMember?.updated_at ? (
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
                      <a
                        href={JSON.parse(
                          kycMember?.registration_image,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kycMember?.registration_image}
                      </a>{' '}
                      {validatorMember?.registration_image ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>kyc_image</b>:{' '}
                      <a
                        href={JSON.parse(kycMember?.kyc_image)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kycMember?.kyc_image}
                      </a>{' '}
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
                      <b>is_having_npwp</b>:{' '}
                      {kycMember?.is_having_npwp}{' '}
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
                      <b>npwp_image</b>:{' '}
                      <a
                        href={JSON.parse(kycMember?.npwp_image)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kycMember?.npwp_image}
                      </a>{' '}
                      {validatorMember?.npwp_image ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>npwp_statement</b>:{' '}
                      <a
                        href={JSON.parse(kycMember?.npwp_statement)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kycMember?.npwp_statement}
                      </a>{' '}
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
                      <a
                        href={JSON.parse(
                          kycMember?.family_card_image,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kycMember?.family_card_image}
                      </a>{' '}
                      {validatorMember?.family_card_image ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                  </>
                )}
                {errorKycMember && <p>{errorKycMember}</p>}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6">
          {isLoading.kbInterview ? (
            <p>Loading ...</p>
          ) : (
            <Card className="my-2" color="primary" outline>
              <CardHeader>Kabayan Interview</CardHeader>
              <CardBody>
                {kabayanInterview && !errorKbInterview && (
                  <>
                    <p>
                      <b>created_at</b>:{' '}
                      {kabayanInterview?.created_at}{' '}
                      {validatorInterview?.created_at ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>interview_date</b>:{' '}
                      {kabayanInterview?.interview_date}{' '}
                      {validatorInterview?.interview_date ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>nama_petugas</b>:{' '}
                      {kabayanInterview?.nama_petugas}{' '}
                      {validatorInterview?.nama_petugas ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>email_petugas</b>:{' '}
                      {kabayanInterview?.email_petugas}{' '}
                      {validatorInterview?.email_petugas ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>file_surat_kuasa</b>:{' '}
                      <a
                        href={JSON.parse(
                          kabayanInterview?.file_surat_kuasa,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kabayanInterview?.file_surat_kuasa}
                      </a>{' '}
                      {validatorInterview?.file_surat_kuasa ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>file_surat_keterangan_usaha</b>:{' '}
                      <a
                        href={JSON.parse(
                          kabayanInterview?.file_surat_keterangan_usaha,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {
                          kabayanInterview?.file_surat_keterangan_usaha
                        }
                      </a>{' '}
                      {validatorInterview?.file_surat_keterangan_usaha ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                  </>
                )}
                {errorKbInterview && <p>{errorKbInterview}</p>}
              </CardBody>
            </Card>
          )}
        </Col>
        <Col lg="6" md="6">
          {isLoading.kycInterview ? (
            <p>Loading ...</p>
          ) : (
            <Card className="my-2" color="primary" outline>
              <CardHeader>KYC Interview</CardHeader>
              <CardBody>
                {kycInterview && !errorKycInterview && (
                  <>
                    <p>
                      <b>created_at</b>: {kycInterview?.created_at}{' '}
                      {validatorInterview?.created_at ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>interview_date</b>:{' '}
                      {kycInterview?.interview_date}{' '}
                      {validatorInterview?.interview_date ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>nama_petugas</b>:{' '}
                      {kycInterview?.nama_petugas}{' '}
                      {validatorInterview?.nama_petugas ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>email_petugas</b>:{' '}
                      {kycInterview?.email_petugas}{' '}
                      {validatorInterview?.email_petugas ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>file_surat_kuasa</b>:{' '}
                      <a
                        href={JSON.parse(
                          kycInterview?.file_surat_kuasa,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kycInterview?.file_surat_kuasa}
                      </a>{' '}
                      {validatorInterview?.file_surat_kuasa ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                    <p>
                      <b>file_surat_keterangan_usaha</b>:{' '}
                      <a
                        href={JSON.parse(
                          kycInterview?.file_surat_keterangan_usaha,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {kycInterview?.file_surat_keterangan_usaha}
                      </a>{' '}
                      {validatorInterview?.file_surat_keterangan_usaha ? (
                        <BsFillCheckCircleFill color="#63BA76" />
                      ) : (
                        <BsFillXCircleFill color="#db284e" />
                      )}
                    </p>
                  </>
                )}
                {errorKycInterview && <p>{errorKycInterview}</p>}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default App
