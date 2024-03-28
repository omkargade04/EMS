import { Request,Response } from "express"

export interface StudentBody {
    body: {
    name:string,
    email:string,
    password:string,
    }

} 
export interface  ReqMid extends Request{
    student:{
        student_id:number,
        name:string,
        email:string,
        password:string,
    }
    token: string
}
export interface Token {
    
}
