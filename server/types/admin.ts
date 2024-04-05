import { Request,Response } from "express"

export interface AdminBody {
    body: {
    name:string,
    password:string,
    }

} 
export interface  ReqMid extends Request{
    user:{
        id:number,
        name:string,
        password:string,
    }
    token: string
}
export interface Token {
    
}
