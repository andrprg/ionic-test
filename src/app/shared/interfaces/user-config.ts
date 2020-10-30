export interface UserConfig {
    ID: number;
    balance: number;
    dateEndPay: string; // "05.08.2018",
    dateEndPrepay: boolean; // false,
    urlCancelPayment: string; // null,
    connectServicePostPay: boolean; // false,
    free: number;
    dateRenewalSpecialOffers: boolean; // false,
    promisePaymentDate: boolean; // 0false,
    promisePaymentStatus: boolean; // false,
    promisePaymentDateRequest: string;

}
