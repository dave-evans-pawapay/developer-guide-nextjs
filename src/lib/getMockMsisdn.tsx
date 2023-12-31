'use client'
import {useEffect} from "react";
import { TestMsisdn } from "../../type";

let msisdn: TestMsisdn[] = [
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'22912345012',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'22912345022',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'22912345032',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'22912345042',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'22912345062',failureReason: 'OTHER_ERROR'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'22912345122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'22912345052',failureReason: 'SUCCESS'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'22912345072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'22912345082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'22912345092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'22912345112',failureReason: 'OTHER_ERROR'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'22912345122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'BEN', country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'22912345102',failureReason: 'SUCCESS'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456061',failureReason: 'OTHER_ERROR'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456051',failureReason: 'SUCCESS'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456112',failureReason: 'OTHER_ERROR'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'CMR', country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456102',failureReason: 'SUCCESS'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123756011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123756021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123756031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123756041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123756061',failureReason: 'OTHER_ERROR'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123756121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123756051',failureReason: 'SUCCESS'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'PAYOUT',msisdn:'237123756112',failureReason: 'OTHER_ERROR'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'PAYOUT',msisdn:'237123756122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'CMR', country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'PAYOUT',msisdn:'237123756102',failureReason: 'SUCCESS'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567061',failureReason: 'OTHER_ERROR'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567051',failureReason: 'SUCCESS'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567112',failureReason: 'OTHER_ERROR'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'CIV', country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567102',failureReason: 'SUCCESS'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456061',failureReason: 'OTHER_ERROR'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456051',failureReason: 'SUCCESS'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456112',failureReason: 'OTHER_ERROR'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456102',failureReason: 'SUCCESS'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'AIRTEL_OAPI_COD',paymentType: 'DEPOSIT',msisdn:'243123656061',failureReason: 'OTHER_ERROR'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'AIRTEL_OAPI_COD',paymentType: 'DEPOSIT',msisdn:'243123656121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'AIRTEL_OAPI_COD',paymentType: 'DEPOSIT',msisdn:'243123656051',failureReason: 'SUCCESS'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'AIRTEL_OAPI_COD',paymentType: 'PAYOUT',msisdn:'243123656112',failureReason: 'OTHER_ERROR'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'AIRTEL_OAPI_COD',paymentType: 'PAYOUT',msisdn:'243123656122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'AIRTEL_OAPI_COD',paymentType: 'PAYOUT',msisdn:'243123656102',failureReason: 'SUCCESS'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'DEPOSIT',msisdn:'243123756031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'DEPOSIT',msisdn:'243123756041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'DEPOSIT',msisdn:'243123756061',failureReason: 'OTHER_ERROR'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'DEPOSIT',msisdn:'243123756121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'DEPOSIT',msisdn:'243123756051',failureReason: 'SUCCESS'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'PAYOUT',msisdn:'243123756112',failureReason: 'OTHER_ERROR'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'PAYOUT',msisdn:'243123756122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'COD', country: 'Democratic Republic of the Congo',mno: 'ORANGE_COD',paymentType: 'PAYOUT',msisdn:'243123756102',failureReason: 'SUCCESS'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'DEPOSIT',msisdn:'233123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'DEPOSIT',msisdn:'233123456021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'DEPOSIT',msisdn:'233123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'DEPOSIT',msisdn:'233123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'DEPOSIT',msisdn:'233123456061',failureReason: 'OTHER_ERROR'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'DEPOSIT',msisdn:'233123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'DEPOSIT',msisdn:'233123456051',failureReason: 'SUCCESS'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'PAYOUT',msisdn:'233123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'PAYOUT',msisdn:'233123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'PAYOUT',msisdn:'233123456092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'PAYOUT',msisdn:'233123456112',failureReason: 'OTHER_ERROR'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'PAYOUT',msisdn:'233123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'GHA', country: 'Ghana',mno: 'MTN_MOMO_GHA',paymentType: 'PAYOUT',msisdn:'233123456102',failureReason: 'SUCCESS'},
    {code: 'GHA', country: 'Ghana',mno: 'AIRTEL_OAPI_GHA',paymentType: 'DEPOSIT',msisdn:'233123656061',failureReason: 'OTHER_ERROR'},
    {code: 'GHA', country: 'Ghana',mno: 'AIRTEL_OAPI_GHA',paymentType: 'DEPOSIT',msisdn:'233123656121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'GHA', country: 'Ghana',mno: 'AIRTEL_OAPI_GHA',paymentType: 'DEPOSIT',msisdn:'233123656051',failureReason: 'SUCCESS'},
    {code: 'GHA', country: 'Ghana',mno: 'AIRTEL_OAPI_GHA',paymentType: 'PAYOUT',msisdn:'233123656092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'GHA', country: 'Ghana',mno: 'AIRTEL_OAPI_GHA',paymentType: 'PAYOUT',msisdn:'233123656112',failureReason: 'OTHER_ERROR'},
    {code: 'GHA', country: 'Ghana',mno: 'AIRTEL_OAPI_GHA',paymentType: 'PAYOUT',msisdn:'233123656122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'GHA', country: 'Ghana',mno: 'AIRTEL_OAPI_GHA',paymentType: 'PAYOUT',msisdn:'233123656102',failureReason: 'SUCCESS'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'DEPOSIT',msisdn:'233123556011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'DEPOSIT',msisdn:'233123556021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'DEPOSIT',msisdn:'233123956031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'DEPOSIT',msisdn:'233123556041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'DEPOSIT',msisdn:'233123556061',failureReason: 'OTHER_ERROR'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'DEPOSIT',msisdn:'233123556121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'DEPOSIT',msisdn:'233123556051',failureReason: 'SUCCESS'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'PAYOUT',msisdn:'233123556072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'PAYOUT',msisdn:'233123556082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'PAYOUT',msisdn:'233123556092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'PAYOUT',msisdn:'233123556112',failureReason: 'OTHER_ERROR'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'PAYOUT',msisdn:'233123556122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'GHA', country: 'Ghana',mno: 'VODAFONE_GHA',paymentType: 'PAYOUT',msisdn:'233123556102',failureReason: 'SUCCESS'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'DEPOSIT',msisdn:'254123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'DEPOSIT',msisdn:'254123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'DEPOSIT',msisdn:'254123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'DEPOSIT',msisdn:'254123456051',failureReason: 'TRANSACTION_ALREADY_IN_PROCESS'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'DEPOSIT',msisdn:'254123456061',failureReason: 'OTHER_ERROR'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'DEPOSIT',msisdn:'254123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'DEPOSIT',msisdn:'254123556051',failureReason: 'SUCCESS'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'PAYOUT',msisdn:'254123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'PAYOUT',msisdn:'254123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'PAYOUT',msisdn:'254123456092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'PAYOUT',msisdn:'254123456102',failureReason: 'RECIPIENT_LIMIT_REACHED'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'PAYOUT',msisdn:'254123456112',failureReason: 'OTHER_ERROR'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'PAYOUT',msisdn:'254123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'KEN', country: 'Kenya',mno: 'MPESA_KEN',paymentType: 'PAYOUT',msisdn:'254123456152',failureReason: 'SUCCESS'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'DEPOSIT',msisdn:'265123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'DEPOSIT',msisdn:'265123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'DEPOSIT',msisdn:'265123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'DEPOSIT',msisdn:'265123456061',failureReason: 'OTHER_ERROR'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'DEPOSIT',msisdn:'265123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'DEPOSIT',msisdn:'265123456051',failureReason: 'SUCCESS'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'PAYOUT',msisdn:'265123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'PAYOUT',msisdn:'265123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'PAYOUT',msisdn:'265123456112',failureReason: 'OTHER_ERROR'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'PAYOUT',msisdn:'265123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'MWI', country: 'Malawi',mno: 'AIRTEL_MWI',paymentType: 'PAYOUT',msisdn:'265123456152',failureReason: 'SUCCESS'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'DEPOSIT',msisdn:'265123556041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'DEPOSIT',msisdn:'265123556061',failureReason: 'OTHER_ERROR'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'DEPOSIT',msisdn:'265123556121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'DEPOSIT',msisdn:'265123556051',failureReason: 'SUCCESS'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'PAYOUT',msisdn:'265123556072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'PAYOUT',msisdn:'265123556082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'PAYOUT',msisdn:'265123556112',failureReason: 'OTHER_ERROR'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'PAYOUT',msisdn:'265123556122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'MWI', country: 'Malawi',mno: 'TNM_MWI',paymentType: 'PAYOUT',msisdn:'265123556152',failureReason: 'SUCCESS'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'DEPOSIT',msisdn:'250123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'DEPOSIT',msisdn:'250123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'DEPOSIT',msisdn:'250123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'DEPOSIT',msisdn:'250123456061',failureReason: 'OTHER_ERROR'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'DEPOSIT',msisdn:'250123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'DEPOSIT',msisdn:'250123456051',failureReason: 'SUCCESS'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'PAYOUT',msisdn:'250123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'PAYOUT',msisdn:'250123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'PAYOUT',msisdn:'250123456112',failureReason: 'OTHER_ERROR'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'PAYOUT',msisdn:'250123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'RWA', country: 'Rwanda',mno: 'AIRTEL_RWA',paymentType: 'PAYOUT',msisdn:'250123456152',failureReason: 'SUCCESS'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'DEPOSIT',msisdn:'250123556011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'DEPOSIT',msisdn:'250123556021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'DEPOSIT',msisdn:'250123556031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'DEPOSIT',msisdn:'250123556041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'DEPOSIT',msisdn:'250123556061',failureReason: 'OTHER_ERROR'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'DEPOSIT',msisdn:'250123556121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'DEPOSIT',msisdn:'250123556051',failureReason: 'SUCCESS'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'PAYOUT',msisdn:'250123556072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'PAYOUT',msisdn:'250123556082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'PAYOUT',msisdn:'250123556092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'PAYOUT',msisdn:'250123556112',failureReason: 'OTHER_ERROR'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'PAYOUT',msisdn:'250123556122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'RWA', country: 'Rwanda',mno: 'MTN_MOMO_RWA',paymentType: 'PAYOUT',msisdn:'250123556102',failureReason: 'SUCCESS'},
    {code: 'SEN', country: 'Senegal',mno: 'FREE_SEN',paymentType: 'DEPOSIT',msisdn:'221123456061',failureReason: 'OTHER_ERROR'},
    {code: 'SEN', country: 'Senegal',mno: 'FREE_SEN',paymentType: 'DEPOSIT',msisdn:'221123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'SEN', country: 'Senegal',mno: 'FREE_SEN',paymentType: 'DEPOSIT',msisdn:'221123456051',failureReason: 'SUCCESS'},
    {code: 'SEN', country: 'Senegal',mno: 'FREE_SEN',paymentType: 'PAYOUT',msisdn:'221123456112',failureReason: 'OTHER_ERROR'},
    {code: 'SEN', country: 'Senegal',mno: 'FREE_SEN',paymentType: 'PAYOUT',msisdn:'221123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'SEN', country: 'Senegal',mno: 'FREE_SEN',paymentType: 'PAYOUT',msisdn:'221123456152',failureReason: 'SUCCESS'},
    {code: 'SEN', country: 'Senegal',mno: 'ORANGE_SEN',paymentType: 'DEPOSIT',msisdn:'221123556061',failureReason: 'OTHER_ERROR'},
    {code: 'SEN', country: 'Senegal',mno: 'ORANGE_SEN',paymentType: 'DEPOSIT',msisdn:'221123556121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'SEN', country: 'Senegal',mno: 'ORANGE_SEN',paymentType: 'DEPOSIT',msisdn:'221123556051',failureReason: 'SUCCESS'},
    {code: 'SEN', country: 'Senegal',mno: 'ORANGE_SEN',paymentType: 'PAYOUT',msisdn:'221123556112',failureReason: 'OTHER_ERROR'},
    {code: 'SEN', country: 'Senegal',mno: 'ORANGE_SEN',paymentType: 'PAYOUT',msisdn:'221123556122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'SEN', country: 'Senegal',mno: 'ORANGE_SEN',paymentType: 'PAYOUT',msisdn:'221123556152',failureReason: 'SUCCESS'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123456061',failureReason: 'OTHER_ERROR'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123456051',failureReason: 'SUCCESS'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123456112',failureReason: 'OTHER_ERROR'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'TZA', country: 'Tanzania',mno: 'AIRTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123456152',failureReason: 'SUCCESS'},
    {code: 'TZA', country: 'Tanzania',mno: 'VODACOM_TZA',paymentType: 'PAYOUT',msisdn:'255123556072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'TZA', country: 'Tanzania',mno: 'VODACOM_TZA',paymentType: 'PAYOUT',msisdn:'255123556082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'TZA', country: 'Tanzania',mno: 'VODACOM_TZA',paymentType: 'PAYOUT',msisdn:'255123556112',failureReason: 'OTHER_ERROR'},
    {code: 'TZA', country: 'Tanzania',mno: 'VODACOM_TZA',paymentType: 'PAYOUT',msisdn:'255123556122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'TZA', country: 'Tanzania',mno: 'VODACOM_TZA',paymentType: 'PAYOUT',msisdn:'255123556152',failureReason: 'SUCCESS'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'DEPOSIT',msisdn:'255123656021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'DEPOSIT',msisdn:'255123656031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'DEPOSIT',msisdn:'255123656041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'DEPOSIT',msisdn:'255123656061',failureReason: 'OTHER_ERROR'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'DEPOSIT',msisdn:'255123656121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'DEPOSIT',msisdn:'255123656051',failureReason: 'SUCCESS'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'PAYOUT',msisdn:'255123656082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'PAYOUT',msisdn:'255123656092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'PAYOUT',msisdn:'255123656112',failureReason: 'OTHER_ERROR'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'PAYOUT',msisdn:'255123656122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'TZA', country: 'Tanzania',mno: 'TIGO_TZA',paymentType: 'PAYOUT',msisdn:'255123656152',failureReason: 'SUCCESS'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123756041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123756061',failureReason: 'OTHER_ERROR'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123756121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'DEPOSIT',msisdn:'255123756051',failureReason: 'SUCCESS'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123756072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123756082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123756112',failureReason: 'OTHER_ERROR'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123756122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'TZA', country: 'Tanzania',mno: 'HALOTEL_TZA',paymentType: 'PAYOUT',msisdn:'255123756152',failureReason: 'SUCCESS'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'DEPOSIT',msisdn:'256123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'DEPOSIT',msisdn:'256123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'DEPOSIT',msisdn:'256123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'DEPOSIT',msisdn:'256123456061',failureReason: 'OTHER_ERROR'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'DEPOSIT',msisdn:'256123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'DEPOSIT',msisdn:'256123456051',failureReason: 'SUCCESS'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'PAYOUT',msisdn:'256123856072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'PAYOUT',msisdn:'256123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'PAYOUT',msisdn:'256123496112',failureReason: 'OTHER_ERROR'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'PAYOUT',msisdn:'256123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'UGA', country: 'Uganda',mno: 'AIRTEL_OAPI_UGA',paymentType: 'PAYOUT',msisdn:'256123456152',failureReason: 'SUCCESS'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'DEPOSIT',msisdn:'256123856011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'DEPOSIT',msisdn:'256123856021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'DEPOSIT',msisdn:'256123856031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'DEPOSIT',msisdn:'256123856041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'DEPOSIT',msisdn:'256123856061',failureReason: 'OTHER_ERROR'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'DEPOSIT',msisdn:'256123856121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'DEPOSIT',msisdn:'256123956051',failureReason: 'SUCCESS'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'PAYOUT',msisdn:'256123956072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'PAYOUT',msisdn:'256123956082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'PAYOUT',msisdn:'256123956092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'PAYOUT',msisdn:'256123956112',failureReason: 'OTHER_ERROR'},
    {code: 'UGA', country: 'Uganda',mno: 'MTN_MOMO_UGA',paymentType: 'PAYOUT',msisdn:'256123956102',failureReason: 'SUCCESS'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'DEPOSIT',msisdn:'260123456011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'DEPOSIT',msisdn:'260123956031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'DEPOSIT',msisdn:'260123456041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'DEPOSIT',msisdn:'260123956061',failureReason: 'OTHER_ERROR'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'DEPOSIT',msisdn:'260123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'DEPOSIT',msisdn:'260123956051',failureReason: 'SUCCESS'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'PAYOUT',msisdn:'260123456072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'PAYOUT',msisdn:'260123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'PAYOUT',msisdn:'260123456112',failureReason: 'OTHER_ERROR'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'PAYOUT',msisdn:'260123856122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'ZMB', country: 'Zambia',mno: 'AIRTEL_OAPI_ZMB',paymentType: 'PAYOUT',msisdn:'260123456152',failureReason: 'SUCCESS'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'DEPOSIT',msisdn:'260123956011',failureReason: 'PAYER_LIMIT_REACHED'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'DEPOSIT',msisdn:'260123456021',failureReason: 'PAYER_NOT_FOUND'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'DEPOSIT',msisdn:'260123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'DEPOSIT',msisdn:'260123956041',failureReason: 'INSUFFICIENT_BALANCE'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'DEPOSIT',msisdn:'260123456061',failureReason: 'OTHER_ERROR'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'DEPOSIT',msisdn:'260123956121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'DEPOSIT',msisdn:'260123456051',failureReason: 'SUCCESS'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'PAYOUT',msisdn:'260123956072',failureReason: 'BALANCE_INSUFFICIENT'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'PAYOUT',msisdn:'260123956082',failureReason: 'RECIPIENT_NOT_FOUND'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'PAYOUT',msisdn:'260123456092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'PAYOUT',msisdn:'260123856112',failureReason: 'OTHER_ERROR'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'PAYOUT',msisdn:'260123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
    {code: 'ZMB', country: 'Zambia',mno: 'MTN_MOMO_ZMB',paymentType: 'PAYOUT',msisdn:'260123456102',failureReason: 'SUCCESS'},

];
export default function(country?: string | null,mno? : string | null ) {
    let output = msisdn;
    let output2: TestMsisdn[] = [];
    if (country){
                output = output.filter(c => c.country === country);
    }
    if (mno) {
                output2 = output.filter(c => c.mno === mno);
    }
    return output2.length > 0 ? output2 : output
}

export function GetUniqueCountries() {
    return msisdn.map((item: TestMsisdn) => item.country)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
}

export function GetUniqueMno(country? : string | null) {
    return msisdn.filter(c => c.country === country).map((item: TestMsisdn) => item.mno)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
}

export function getCountryFromCode(code: string | null) {
    if (code == null) return null;
    const c = msisdn.filter(c => c.code === code);
    return c.length > 0 ? c[0].country : null;
}

export function getCodeFromCountry(country: string) {
    const c = msisdn.filter(c => c.country === country);
    return c.length > 0 ? c[0].code : null;
}

