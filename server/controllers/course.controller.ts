import {client} from "../model/db";

const getAllCourses = async(req: any, res: any) => {
    try{
        const courseQuery: string = `SELECT c.course_id, c.course_title, c.course_description, c.course_price, e.name, e.email FROM courses AS c JOIN educators AS e ON e.educator_id = c.fk_educator `;
        const courseResult = await client.query(courseQuery);

        if(courseResult.rowCount === 0){
            return res.status(400).json({status: false, message: 'No course available'});
        }
        console.log(courseResult.rows);

        res.status(200).json({status: true, data: courseResult.rows, message: "All courses retrived"});
    }catch(err: any){
        console.log("This is error: ", err);
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
};

const getACourse = async(req: any, res: any) => {
    const course_id = req.params.id;

    if(!course_id){
        return res.status(400).json({stauts: false, message: "Course not found"});
    }

    try{
        const query: string = `SELECT c.course_title, c.course_description, c.course_price, e.name, e.email FROM courses AS c JOIN educators AS e ON e.educator_id = c.fk_educator WHERE course_id=$1`;
        const param: any[] = [course_id];
        const result = await client.query(query, param);

        if(result.rowCount === 0){
            return res.status(400).json({status: false, message: "Course not found"});
        }
        console.log(result.rows[0]);

        res.status(200).json({status: true, data: result.rows[0], message: "Retrived a course"});
    }catch(err: any){
        console.log("This is error: ", err);
        res.status(500).json({status: false, message: "Internal server error"});
    }
}

module.exports = { getAllCourses, getACourse };