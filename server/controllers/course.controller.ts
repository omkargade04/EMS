import { client } from "../model/db";
import { ReqMid } from "../types/educator";


const getAllCourses = async (req: any, res: any) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1; 
    const limit = req.query.limit ? parseInt(req.query.limit) : 3; 

    const offset = (page - 1) * limit;

    const courseQuery: string = `SELECT c.id, c.title, c.description, c.price, e.name, e.email
     FROM course AS c JOIN educators AS e ON e.educator_id = c.fk_educator LIMIT ${limit} OFFSET ${offset}`;
    const courseResult = await client.query(courseQuery);

    if (courseResult.rowCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No course available" });
    }
    console.log(courseResult.rows);

    res
      .status(200)
      .json({
        status: true,
        data: courseResult.rows,
        message: "All courses retrieved",
      });
  } catch (err: any) {
    console.log("This is error: ", err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getACourse = async (req: any, res: any) => {
  const course_id = req.params.courseId;
  console.log(course_id);
  if (!course_id) {
    return res.status(400).json({ stauts: false, message: "Course not found" });
  }

  try {
    const query: string = `SELECT c.id, c.title, c.description, c.imageUrl, c.price, e.name, e.email, e.institute, e.experience, e.role FROM course AS c JOIN educators AS e ON e.educator_id = c.fk_educator WHERE id=$1`;
    const param: any[] = [course_id];
    const result = await client.query(query, param);

    if (result.rowCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Course not found" });
    }
    console.log(result.rows[0]);

    res
      .status(200)
      .json({
        status: true,
        data: result.rows[0],
        message: "Retrived a course",
      });
  } catch (err: any) {
    console.log("This is error: ", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const updateTitle = async (req: ReqMid, res: any) => {
  try {
    const course_id = req.params.id;
    console.log("course id: ", course_id)
    const { title } = req.body;
    console.log("title: ", title)
    const educator_id = req.educator.educator_id;
    console.log("Educator id: ", educator_id)
    const updateQuery: string = `
        UPDATE course 
        SET title = $1, fk_educator = $2 ,updated_at = current_timestamp 
        WHERE id = $3`;
    const updateParams = [title, educator_id, course_id];
    const updateResult = await client.query(updateQuery, updateParams);

    console.log(updateResult.rowCount);
    res
      .status(200)
      .json({ status: true, message: "Course updated successfully" });
  } catch (err: any) {
    console.log("Error: ", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const updateDescription = async (req: ReqMid, res: any) => {
  try {
    const course_id = req.params.id;
    console.log("course id: ", course_id)
    const { description } = req.body;
    console.log("title: ", description)
    const educator_id = req.educator.educator_id;
    console.log("Educator id: ", educator_id)
    const updateQuery: string = `
        UPDATE course 
        SET description = $1, fk_educator = $2 ,updated_at = current_timestamp 
        WHERE id = $3`;
    const updateParams = [description, educator_id, course_id];
    const updateResult = await client.query(updateQuery, updateParams);

    console.log(updateResult.rowCount);
    res
      .status(200)
      .json({ status: true, message: "Course updated successfully" });
  } catch (err: any) {
    console.log("Error: ", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const updatePrice = async (req: ReqMid, res: any) => {
  try {
    const course_id = req.params.id;
    console.log("course id: ", course_id)
    const { price } = req.body;
    console.log("price: ", price)
    const educator_id = req.educator.educator_id;
    console.log("Educator id: ", educator_id)
    const updateQuery: string = `
        UPDATE course 
        SET price = $1, fk_educator = $2 ,updated_at = current_timestamp 
        WHERE id = $3`;
    const updateParams = [price, educator_id, course_id];
    const updateResult = await client.query(updateQuery, updateParams);

    console.log(updateResult.rowCount);
    res
      .status(200)
      .json({ status: true, message: "Course updated successfully" });
  } catch (err: any) {
    console.log("Error: ", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const addChapter = async(req: ReqMid, res: any) => {
  const course_id = req.params.id;
  const educator_id = req.educator.educator_id;
  const {title} = req.body;

  const ownerQuery = `SELECT * FROM course WHERE fk_educator=$1 AND id=$2`;
  const ownerParams: any[] = [educator_id, course_id];
  const ownerResult = await client.query(ownerQuery, ownerParams);

  if(ownerResult.rowCount === 0){
    return res.status(400).json({status: false, message: "This educator is not the owner of this course"})
  }

  const chapterQuery = `INSERT INTO chapters(title, fk_course) VALUES($1, $2)`;
  const chapterParams: any[] = [title, course_id];
  const chapterResult = await client.query(chapterQuery, chapterParams);

  res.status(200).json({status: true, message: "New chapter created"});
}

const getAllChapters = async (req: any, res: any) => {
  try {
    const course_id = req.params.id;
    const courseQuery: string = `SELECT * FROM chapters WHERE fk_course=${course_id}`;
    const courseResult = await client.query(courseQuery);

    if (courseResult.rowCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No course available" });
    }
    console.log(courseResult.rows);

    res
      .status(200)
      .json({
        status: true,
        data: courseResult.rows,
        message: "All chapters retrived",
      });
  } catch (err: any) {
    console.log("This is error: ", err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};




module.exports = { getAllCourses, getACourse, updateTitle, updateDescription, updatePrice, addChapter, getAllChapters };
