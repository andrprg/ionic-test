export type permissionIndex = 'change_tarif' |
    'display_reminder_balance' |
    'change_gb_package' |
    'rename_base_main_user' |
    'create_dopuser' |
    'delete_dopuser' |
    'enable_option' |
    'create_pay_order' |
    'activate_promise_payment' |
    'display_pay_history' |
    'change_rekvisit' |
    'edit_dopuser_group' |
    'menu_options' |
    'menu_pay' |
    'arenda_pay_display' |
    'current_discont' |
    'add_5GB_for_3_days' |
    'access_for_1c_progtammist' |
    'public_base' |
    'autoupdate_base' |
    'download_base' |
    'close_seccion' |
    'restart_pool' |
    'create_base_1c' |
    'change_tarif' |
    'display_reminder_balance' |
    'change_gb_package' |
    'rename_base_main_user' |
    'create_dopuser' |
    'delete_dopuser' |
    'enable_option' |
    'create_pay_order' |
    'activate_promise_payment' |
    'display_pay_history' |
    'change_rekvisit' |
    'menu_dopuserlist' |
    'menu_options' |
    'menu_pay' |
    'edit_main_user' |
    'menu_partner' |
    'edit_permission';
export type IPermissions = {[k in permissionIndex]?: boolean};
export type StatusAccount =  'blocked' | 'endfree' | 'active';

export interface MainUser {
    email: string;
    emailBuh: string;
    emailTech: string;
    endData: string;
    extraID?: number;
    extraLogin: string;
    id: string;
    login: string;
    name: string;
    permission?: IPermissions;
    phone: string;
    statusAccaunt: StatusAccount;
}
