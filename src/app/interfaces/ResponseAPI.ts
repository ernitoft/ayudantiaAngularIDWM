export interface ResponseAPI {
    user:  User;
    token: string;
}

export interface User {
    id:       number;
    rut:      string;
    name:     string;
    birthday: Date;
    email:    string;
    isActive: boolean;
    gender:   Gender;
}

export interface Gender {
    id:   number;
    type: string;
}
