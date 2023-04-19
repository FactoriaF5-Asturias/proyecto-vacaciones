import { defineStore } from "pinia";
import Repository from "../apiCall/Repository";

export const useAdminStore = defineStore('adminStore',{
    state: ()=>({
        allUsers: [],
        SchoolOfUser: [],
        allRequests: [],
        IndividualRequest: {}
    }),
    actions:{
        async createUser(payload){

            const repository = new Repository('admin')

            const service = repository.chooseAdminService()

            const response = await service.createUser(payload)

            console.log(response.status);
        },
        async listAllUsers(){
            const repository = new Repository('admin')

            const service = repository.chooseAdminService()

            const response = await service.listAllUsers()

            console.log(response.status)

            const data = response.data
            const profiles = []
            const schools = []
            for (const user of data) {
                
                if(user.profile != undefined) {
                    profiles.push(user.profile)
                    schools.push(await service.schoolOfUser(user.document))
                }
            }

            this.SchoolOfUser = schools
            this.allUsers = profiles
        },
        async listAllRequests(){
            const repository = new Repository('admin')

            const service = repository.chooseAdminService()

            const response = await service.listAllUsers()

            const requestData = response.data

            const allRequestOfUsers = []
            for (const user of requestData) {
                if(user.requests != undefined && user.profile != undefined) {
                    const school = await service.schoolOfUser(user.document)
                    user.requests.forEach(request => allRequestOfUsers.push(
                        {
                            name: `${user.profile.firstName} ${user.profile.lastName}`,
                            requestUser: request,
                            schoolOfUser: school,
                            userDocument: user.document
                        }
                        
                        ))
                }
            }
            console.log(allRequestOfUsers);

            this.allRequests =allRequestOfUsers
        },
        async changeStateOfRequest(document, idRequest, state){
            const repository = new Repository('admin')

            const service = repository.chooseAdminService()

            const response = await service.changeRequestState(document, idRequest, state)

            const actualiceListUser = await service.listAllUsers()
        },
        infoRequest(idRequest){
            
            for (const request of this.allRequests) {
                if(request.requestUser.id == idRequest){
                    
                    this.IndividualRequest = request
                    return request}
            }
            return
        },
        randomPassword(){
            const randomPass = Math.random().toString(36).slice(2)

            return randomPass
        },
        encoder(username, password) {
            const infoEncode = window.btoa(`${username}:${password}`);
            return infoEncode;
        }
    }
})