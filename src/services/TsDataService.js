import http from "../http-common";
import authHeader from "@/services/auth-header";

class TsDataService {
    //Data Service
    login(user) {
        return http.post(`/api/authentication/sign-in/`,{
            email: user.email,
            password: user.password
        }, )
            .then(response => {
                if(response.data.success == true && response.data.resource.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.resource))
                }
                return response.data;
            });
    }

    logout() {
        
        localStorage.removeItem('user');
    }

    register(data) {
        return http.post("/api/authentication/sign-up/", JSON.stringify(data));
    }

    //Users
    getAllUsers() {
        return http.get("/api/users", { headers: authHeader() })
            .then(response => {
                return response;
            });
    }

    getAllUsersDrivers() {
        return http.get(`/api/users/drivers`, { headers: authHeader()})
            .then(response => {
                return response;
            })
    }

    getAllDrivers() {
        return http.get("api/drivers", { headers: authHeader() })
            .then(response => {
                return response;
            })
    }
    getUser(id) {
        return http.get(`/api/users/${id}`, { headers: authHeader() });
    }

    //Customers
    rechargeCredits(customerId,credits) {
        return http.put(`/api/customers/${customerId}/credits/${credits}`, { headers: authHeader() });
    }

    
    getCustomerById(userId) {
        return http.get(`api/customers/${userId}`, { headers: authHeader() });
    }

    //Driver

    
    getDriverById(userId) {
        return http.get(`api/drivers/${userId}`, { headers: authHeader() });
    }
    

    //Cargo
    getAllCargoes(){
        return http.get("/api/cargoes", { headers: authHeader() });
    }
    getAllCargoesByCustomerId(customerId) {
        return http.get(`api/cargoes/customers/${customerId}`,  { headers: authHeader() });
    }

    getAllCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}`, { headers: authHeader() });
    }

    getRequestedCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}/requesteds`, { headers: authHeader() });
    }

    getConfirmedCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}/confirmeds`, { headers: authHeader() });
    }

    getFinishedCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}/finisheds`, { headers: authHeader() });
    }

    setRequestCargo(customerId, cargoInput){
        return http.post(`/api/cargoes/customers/${customerId}`, JSON.stringify(cargoInput), { headers: authHeader() });
    }

    setCargoConfirmation(cargoId) {
        return http.put(`/api/cargoes/${cargoId}/confirms`);
    }

    setCargoDeliver(cargoId) {
        return http.put(`/api/cargoes/${cargoId}/deliver`);
    }

    setCargoReject(cargoId) {
        return http.put(`/api/cargoes/${cargoId}/reject`);
    }

    //Favorites

    getAllFavoritesByUserId(id) {
        console.log(`Runing /api/users/${id}/favorites`);
        return http.get(`/api/users/${id}/favorites`,{ headers: authHeader() });
    }

    getAllFavorites() {
        return http.get(`/api/users/favorites`, { headers: authHeader() });
    }

    getFavorite(user,favorite){
        return http.get(`/api/users/${user}/favorites/${favorite}`, { headers: authHeader() });
    }

    setFavorite(user,favorite){
        console.log(`run /api/users/${user}/favorites/${favorite}`)
        return http.post(`/api/users/${user}/favorites/${favorite}`, { headers: authHeader() });
    }

    deleteFavoriteByUserIdAndFavoriteId(user, favorite)
    {
        console.log(`run /api/users/${user}/favorites/${favorite}`)
        return http.delete(`/api/users/${user}/favorites/${favorite}`, { headers: authHeader() })
    }

    //Blockeds

    getAllBlockedsByUser(id) {
        return http.get(`/api/users/${id}/blockeds`, { headers: authHeader() });
    }

    getAllBlockeds() {
        console.log(`runing /api/users/blockeds`)
        return http.get(`/api/users/blockeds`, { headers: authHeader() });
    }

    getBlocked(user,block) {
        console.log(`runing /api/users/${user}/blockeds/${block}`)
        return http.get(`/api/users/${user}/blockeds/${block}`,{ headers: authHeader() });
    }

    setBlocked(user,block) {
        console.log(`runing /api/users/${user}/blockeds/${block}`)
        return http.post(`/api/users/${user}/blockeds/${block}`, { headers: authHeader() });
    }

    deleteBlockedByUserIdAndFavoriteId(user, blocked)
    {
        console.log(`run /api/users/${user}/blockeds/${blocked}`)
        return http.delete(`/api/users/${user}/blockeds/${blocked}`,{ headers: authHeader() } )
    }


    //Configurations
    getConfiguration(id) {
        console.log(`runing api/configurations/users/${id}`)
        return http.get(`api/configurations/users/${id}`, {headers: authHeader() });
    }

    updateConfiguration(id,config){
        console.log(`runing api/configurations/users/${id}`)
        return http.put(`api/configurations/users/${id}`, JSON.stringify(config), { headers: authHeader() });
    }


    addPaymentMethod(userId, paymentMethodInput) {
        console.log(`runing api/configurations/users/${userId}/payment-method`)
        return http.post(`api/configurations/users/${userId}/payment-method`, JSON.stringify(paymentMethodInput),{ headers: authHeader()});
    }

    getPaymentMethods(userId) {
        console.log(`runing api/payment-methods/users/${userId}`)
        return http.get(`api/payment-methods/users/${userId}`,{ headers: authHeader()});
    }

    //Service
    getServiceList(userId) {
        console.log(`runing api/services/drivers/${userId}`)
        return http.get(`api/services/drivers/${userId}`, {headers: authHeader()});
    }

    getSomeService(userId) {
        console.log(`runing api/services/drivers/${userId}/some`)
        return http.get(`api/services/drivers/${userId}/some`, {headers: authHeader()});
    }


    //Reviews
    getReviewsByDriverId(userId){
        console.log(`runing api/reviews/drivers/${userId}`)
        return http.get(`api/reviews/drivers/${userId}`,{ headers: authHeader()});
    }

    getReviewsByCustomerId(userId){
        console.log(`api/reviews/customers/${userId}`)
        return http.get(`api/reviews/customers/${userId}`, {headers: authHeader()});
    }

    //Subscription
    
    getSubscriptionsDone(userId){
        console.log(`runing api/subscriptions/users/${userId}`);
        return http.get(`api/subscriptions/users/${userId}`, {headers: authHeader()});
    }

    subscribeByUserIdAndPlanId(userId, planId){
        console.log(`api/subscriptions/users/${userId}/plans/${planId}`);
        return http.post(`api/subscriptions/users/${userId}/plans/${planId}`,{headers: authHeader()});
    }

    activeSomeSubscriptionByUserIdAndPlanId(subscriptionId){
        console.log(`enable api/subscriptions/${subscriptionId}/enable`)
        return http.put(`api/subscriptions/${subscriptionId}/enable`, {headers: authHeader()});
    }

    //Plans

    getPlanList(){
        console.log("running api/plans")
        return http.get(`api/plans`, {headers: authHeader()});
    }

}

export default new TsDataService();