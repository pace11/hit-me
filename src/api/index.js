import Axios from 'axios'

export const getKabayanCouchDb = async (params) => {
  try {
    const response = await Axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_MEMBER_KABAYAN_UAT_COUCHDB}/${params.lead_id}`,
      headers: {
        environtment: `${params.environtment}`,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getKabayan = async (params) => {
  try {
    const urlApi = {
      uat: process.env.REACT_APP_API_MEMBER_KABAYAN_UAT,
      stg: process.env.REACT_APP_API_MEMBER_KABAYAN_STG,
    }
    const secretApi = {
      uat: process.env.REACT_APP_API_SECRET_MEMBER_KABAYAN_UAT,
      stg: process.env.REACT_APP_API_SECRET_MEMBER_KABAYAN_STG,
    }
    const response = await Axios({
      method: 'GET',
      url: `${urlApi[params.environtment]}${params.slug}/${
        params.lead_id
      }`,
      headers: {
        'X-App-Token': `Bearer ${params.x_app_token}`,
        'X-Client-Id': 'NUBITOOLS',
        'X-Client-Version': '',
        Authorization: secretApi[params.environtment],
      },
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getKyc = async (params) => {
  try {
    const urlApi = {
      uat: process.env.REACT_APP_API_MEMBER_KYC_UAT,
      stg: process.env.REACT_APP_API_MEMBER_KYC_STG,
    }
    const secretApi = {
      uat: process.env.REACT_APP_API_SECRET_MEMBER_KYC_UAT,
      stg: process.env.REACT_APP_API_SECRET_MEMBER_KYC_STG,
    }
    const response = await Axios({
      method: 'GET',
      url: `${urlApi[params.environtment]}${params.slug}/${
        params.lead_id
      }`,
      headers: {
        'X-App-Token': params.x_app_token,
        'X-Client-Id': 'NUBITOOLS',
        'X-Client-Version': '',
        Authorization: secretApi[params.environtment],
      },
    })
    return response
  } catch (error) {
    throw error
  }
}
