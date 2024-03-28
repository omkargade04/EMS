import { Request,Response } from "express"

export interface EducatorBody {
    body: {
    name:string,
    email:string,
    password:string,
    }

} 
export interface  ReqMid extends Request{
    educator:{
        educator_id:number,
        name:string,
        email:string,
        password:string,
    }
    token: string
}
export interface Token {
    
}
