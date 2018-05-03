/**
 *
 * Entry point for all routes
 *
 */

import api_v1 from './api_v1';
import page from './page';

export default {
    api_v1,
    page,
    admin_routes,
    votation_routes,
    audit_routes,
    user_routes,
    smart_contract_routes
};
