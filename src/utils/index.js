import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export const validatorString = (a, b) => {
  return
}

export const transformKabayanMember = (params) => {
  return {
    lead_id: JSON.stringify(params?.id),
    name: JSON.stringify(params?.name),
    phone: JSON.stringify(params?.phone1),
    email: JSON.stringify(params?.email),
    registration_date: JSON.stringify(
      params.member?.registration_date,
    ),
    registration_image: JSON.stringify(
      params.member?.registration_image,
    ),
    kyc_image: JSON.stringify(params.kyc?.kyc_image),
    marriage_status: JSON.stringify(params?.marriage_status),
    is_having_npwp: JSON.stringify(params?.is_having_npwp),
    npwp_number: JSON.stringify(params?.npwp_number),
    npwp_image: JSON.stringify(params?.npwp_image),
    npwp_statement: JSON.stringify(params?.npwp_statement_image),
    address:
      params.locations.length > 0
        ? JSON.stringify(params.locations[0]?.address)
        : JSON.stringify(params.locations?.address),
    family_card_image: JSON.stringify(
      params.kyc?.kartukeluarga_image,
    ),
  }
}

export const transformKabayanInterview = (params) => {
  return {
    interview_date: JSON.stringify(params.date?.timestamp),
    nama_petugas: JSON.stringify(params.created_by?.name),
    email_petugas: JSON.stringify(params.created_by?.email),
    file_surat_kuasa: JSON.stringify(params?.procuration_image),
    file_surat_keterangan_usaha: JSON.stringify(
      params?.business_certificate,
    ),
  }
}

export const transformKycMember = (params) => {
  return {
    lead_id: JSON.stringify(params?.id),
    name: JSON.stringify(params?.name),
    phone: JSON.stringify(params?.phone1),
    email: JSON.stringify(params?.email),
    registration_date: JSON.stringify(params?.registration_date),
    registration_image: JSON.stringify(params?.registration_image),
    kyc_image: JSON.stringify(params?.kyc_image),
    marriage_status: JSON.stringify(params?.marriage_status),
    is_having_npwp: JSON.stringify(params?.is_having_npwp),
    npwp_number: JSON.stringify(params?.npwp_number),
    npwp_image: JSON.stringify(params?.npwp_image),
    npwp_statement: JSON.stringify(params?.npwp_statement_image),
    address: JSON.stringify(params.location?.address),
    family_card_image: JSON.stringify(params?.family_card_image),
  }
}

export const transformKycInterview = (params) => {
  return {
    interview_date: JSON.stringify(params?.interview_date),
    nama_petugas: JSON.stringify(params?.created_by_name),
    email_petugas: JSON.stringify(params?.created_by_email),
    file_surat_kuasa: JSON.stringify(params?.procuration_image),
    file_surat_keterangan_usaha: JSON.stringify(
      params?.business_certificate_image,
    ),
  }
}

export const validationMember = (params1, params2) => {
  return {
    lead_id:
      params1.lead_id === params2.lead_id &&
      (params1.lead_id !== `""` || params2.lead_id !== `""`) &&
      (params1.lead_id !== 'false' || params2.lead_id !== 'false')
        ? true
        : false,
    name:
      params1.name === params2.name &&
      (params1.name !== `""` || params2.name !== `""`) &&
      (params1.name !== 'false' || params2.name !== 'false')
        ? true
        : false,
    phone:
      params1.phone === params2.phone &&
      (params1.phone !== `""` || params2.phone !== `""`) &&
      (params1.phone !== 'false' || params2.phone !== 'false')
        ? true
        : false,
    email:
      params1.email === params2.email &&
      (params1.email !== `""` || params2.email !== `""`) &&
      (params1.email !== 'false' || params2.email !== 'false')
        ? true
        : false,
    registration_date:
      params1.registration_date === params2.registration_date &&
      (params1.registration_date !== `""` ||
        params2.registration_date !== `""`) &&
      (params1.registration_date !== 'false' ||
        params2.registration_date !== 'false')
        ? true
        : false,
    registration_image:
      params1.registration_image === params2.registration_image &&
      (params1.registration_image !== `""` ||
        params2.registration_image !== `""`) &&
      (params1.registration_image !== 'false' ||
        params2.registration_image !== 'false')
        ? true
        : false,
    kyc_image:
      params1.kyc_image === params2.kyc_image &&
      (params1.kyc_image !== `""` || params2.kyc_image !== `""`) &&
      (params1.kyc_image !== 'false' || params2.kyc_image !== 'false')
        ? true
        : false,
    marriage_status:
      params1.marriage_status === params2.marriage_status &&
      (params1.marriage_status !== `""` ||
        params2.marriage_status !== `""`) &&
      (params1.marriage_status !== 'false' ||
        params2.marriage_status !== 'false')
        ? true
        : false,
    is_having_npwp:
      params1.is_having_npwp === params2.is_having_npwp &&
      (params1.is_having_npwp !== `""` ||
        params2.is_having_npwp !== `""`) &&
      (params1.is_having_npwp !== 'false' ||
        params2.is_having_npwp !== 'false')
        ? true
        : false,
    npwp_number:
      params1.npwp_number === params2.npwp_number &&
      (params1.npwp_number !== `""` ||
        params2.npwp_number !== `""`) &&
      (params1.npwp_number !== 'false' ||
        params2.npwp_number !== 'false')
        ? true
        : false,
    npwp_image:
      params1.npwp_image === params2.npwp_image &&
      (params1.npwp_image !== `""` || params2.npwp_image !== `""`) &&
      (params1.npwp_image !== 'false' ||
        params2.npwp_image !== 'false')
        ? true
        : false,
    npwp_statement:
      params1.npwp_statement === params2.npwp_statement &&
      (params1.npwp_statement !== `""` ||
        params2.npwp_statement !== `""`) &&
      (params1.npwp_statement !== 'false' ||
        params2.npwp_statement !== 'false')
        ? true
        : false,
    address:
      params1.address === params2.address &&
      (params1.address !== `""` || params2.address !== `""`) &&
      (params1.address !== 'false' || params2.address !== 'false')
        ? true
        : false,
    family_card_image:
      params1.family_card_image === params2.family_card_image &&
      (params1.family_card_image !== `""` ||
        params2.family_card_image !== `""`) &&
      (params1.family_card_image !== 'false' ||
        params2.family_card_image !== 'false')
        ? true
        : false,
  }
}

export const validationInterview = (params1, params2) => {
  return {
    interview_date:
      params1.interview_date === params2.interview_date &&
      (params1.interview_date !== `""` ||
        params2.interview_date !== `""`) &&
      (params1.interview_date !== 'false' ||
        params2.interview_date !== 'false')
        ? true
        : false,
    nama_petugas:
      params1.nama_petugas === params2.nama_petugas &&
      (params1.nama_petugas !== `""` ||
        params2.nama_petugas !== `""`) &&
      (params1.nama_petugas !== 'false' ||
        params2.nama_petugas !== 'false')
        ? true
        : false,
    email_petugas:
      params1.email_petugas === params2.email_petugas &&
      (params1.email_petugas !== `""` ||
        params2.email_petugas !== `""`) &&
      (params1.email_petugas !== 'false' ||
        params2.email_petugas !== 'false')
        ? true
        : false,
    file_surat_kuasa:
      params1.file_surat_kuasa === params2.file_surat_kuasa &&
      (params1.file_surat_kuasa !== `""` ||
        params2.file_surat_kuasa !== `""`) &&
      (params1.file_surat_kuasa !== 'false' ||
        params2.file_surat_kuasa !== 'false')
        ? true
        : false,
    file_surat_keterangan_usaha:
      params1.file_surat_keterangan_usaha ===
        params2.file_surat_keterangan_usaha &&
      (params1.file_surat_keterangan_usaha !== `""` ||
        params2.file_surat_keterangan_usaha !== `""`) &&
      (params1.file_surat_keterangan_usaha !== 'false' ||
        params2.file_surat_keterangan_usaha !== 'false')
        ? true
        : false,
  }
}
