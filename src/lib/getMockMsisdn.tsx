export default function(country?: string | null,mno? : string | null ) {
    let msisdn: TestMsisdn[] = [
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'229123456012',failureReason: 'PAYER_LIMIT_REACHED'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'229123456022',failureReason: 'PAYER_NOT_FOUND'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'229123456032',failureReason: 'PAYMENT_NOT_APPROVED'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'229123456042',failureReason: 'INSUFFICIENT_BALANCE'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'229123456062',failureReason: 'OTHER_ERROR'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'229123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'DEPOSIT',msisdn:'229123451052',failureReason: 'SUCCESS'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'229123456072',failureReason: 'BALANCE_INSUFFICIENT'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'229123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'229123456092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'229123456112',failureReason: 'OTHER_ERROR'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'229123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Benin',mno: 'MTN_MOMO_BEN',paymentType: 'PAYOUT',msisdn:'229123456102',failureReason: 'SUCCESS'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456011',failureReason: 'PAYER_LIMIT_REACHED'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456021',failureReason: 'PAYER_NOT_FOUND'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456041',failureReason: 'INSUFFICIENT_BALANCE'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456061',failureReason: 'OTHER_ERROR'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'DEPOSIT',msisdn:'237123456051',failureReason: 'SUCCESS'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456072',failureReason: 'BALANCE_INSUFFICIENT'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456112',failureReason: 'OTHER_ERROR'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Cameroon',mno: 'MTN_MOMO_CMR',paymentType: 'PAYOUT',msisdn:'237123456102',failureReason: 'SUCCESS'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123456011',failureReason: 'PAYER_LIMIT_REACHED'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123456021',failureReason: 'PAYER_NOT_FOUND'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123456041',failureReason: 'INSUFFICIENT_BALANCE'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123456061',failureReason: 'OTHER_ERROR'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'DEPOSIT',msisdn:'237123456051',failureReason: 'SUCCESS'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'PAYOUT',msisdn:'237123456112',failureReason: 'OTHER_ERROR'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'PAYOUT',msisdn:'237123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Cameroon',mno: 'ORANGE_CMR',paymentType: 'PAYOUT',msisdn:'237123456102',failureReason: 'SUCCESS'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567011',failureReason: 'PAYER_LIMIT_REACHED'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567021',failureReason: 'PAYER_NOT_FOUND'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567031',failureReason: 'PAYMENT_NOT_APPROVED'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567041',failureReason: 'INSUFFICIENT_BALANCE'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567061',failureReason: 'OTHER_ERROR'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'DEPOSIT',msisdn:'2251234567051',failureReason: 'SUCCESS'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567072',failureReason: 'BALANCE_INSUFFICIENT'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567082',failureReason: 'RECIPIENT_NOT_FOUND'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567092',failureReason: 'RECIPIENT_NOT_ALLOWED_TO_RECEIVE'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567112',failureReason: 'OTHER_ERROR'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Côte d\'Ivoire',mno: 'MTN_MOMO_CIV',paymentType: 'PAYOUT',msisdn:'2251234567102',failureReason: 'SUCCESS'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456021',failureReason: 'PAYER_NOT_FOUND'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456031',failureReason: 'PAYMENT_NOT_APPROVED'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456041',failureReason: 'INSUFFICIENT_BALANCE'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456061',failureReason: 'OTHER_ERROR'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456121',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'DEPOSIT',msisdn:'243123456051',failureReason: 'SUCCESS'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456072',failureReason: 'BALANCE_INSUFFICIENT'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456082',failureReason: 'RECIPIENT_NOT_FOUND'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456112',failureReason: 'OTHER_ERROR'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_CODR',paymentType: 'PAYOUT',msisdn:'243123456122',failureReason: 'NO CALLBACK (stuck in SUBMITTED state)'},
        {country: 'Democratic Republic of the Congo ',mno: 'VODACOM_MPESA_COD',paymentType: 'PAYOUT',msisdn:'243123456102',failureReason: 'SUCCESS'},
    ];
    if (country) {
        msisdn = msisdn.filter(c => c.country = country);
    }
    if (mno) {
        msisdn = msisdn.filter(m => m.mno = mno);
    }
    return msisdn;
}
