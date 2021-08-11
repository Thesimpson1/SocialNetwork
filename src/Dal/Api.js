import axios from "axios";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': 'ca62e582-bc13-4163-b594-7a28b0b888f4' }
});

export const usersApi = {
  setPage(currentPage = 1) {
    return instance.get(`users?page=${currentPage}&count=10`);
  },
  getAllUsers(){
    return instance.get(`users`);
  },
  deleteUser(userId){
    return instance.delete(`follow/${userId}`);
  },
  postUser(userId){
    return instance.post(`follow/${userId}`);
  }

}
export const profileInfoApi = {
  getProfInfo(userId) {
    return instance.get(`profile/${userId}`);
  },

  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
//===Change your id===
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status});
  },
  savePhoto(photo){
    const formData = new FormData();
    formData.append('image', photo)
    return instance.put(`/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfileInfo(profile) {
    return instance.put(`profile`, profile);
  },
  
}

export const authApi = {
  authMe() {
    return instance.get(`auth/me`);
  },

  login(email, password, rememberMe, captcha){
    return instance.post(`auth/login`, {email, password, rememberMe, captcha});
  },

  logout(){
    return instance.delete(`auth/login`);
  },
  getCaptcha(){
    return instance.delete(`security/get-captcha-url`);
  }
}


