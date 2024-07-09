import providerModel from "@/model/user.provider.model";
import dbConnect from "@/lib/dbConnect";
// export  async function POST(request:Request){
//     await dbConnect();
//     try {
//       const {startIndex,endIndex}=await request.json();
//         const jobs = await providerModel.aggregate([
//           // Unwind the job array
//           { $unwind: "$job" },
          
//           // Group all jobs together
//           {
//             $group: {
//               _id: null,
//               allJobs: { $push: "$job" }
//             }
//           },
          
//           // Project to remove the _id field and only return the allJobs array
//           {
//             $project: {
//               _id: 0,
//               allJobs: 1
//             }
//           }
//         ]);
    
//         // The result will be an array with a single object containing the allJobs array
//         return Response.json({
//             success:true,
//             jobs:jobs[0]?.allJobs || [],
//             job:jobs[0]?.allJobs.slice(startIndex, endIndex)
//         })
        
    
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         throw error;
//       }
    
// }


export async function POST(request: Request) {
  await dbConnect();
  try {
    const { startIndex, endIndex, location,title } = await request.json();
    console.log(location)
    let pipeline:any[] = [
      // Unwind the job array
      { $unwind: "$job" },
    ];

    // Add location filter if provided
    if (location) {
      pipeline.push({
        $match: {
          "job.location": { $regex: location, $options: "i" }
        }
      });
    }
    if (title) {
      pipeline.push({
        $match: {
          "job.title": { $regex: title, $options: "i" }
        }
      });
    }

    // Continue with grouping and projecting
    pipeline = pipeline.concat([
      // Group all jobs together
      {
        $group: {
          _id: null,
          allJobs: { $push: "$job" }
        }
      },
      // Project to remove the _id field and only return the allJobs array
      {
        $project: {
          _id: 0,
          allJobs: 1
        }
      }
    ]);

    const jobs = await providerModel.aggregate(pipeline);

    // The result will be an array with a single object containing the allJobs array
    const allJobs = jobs[0]?.allJobs || [];
    
    return Response.json({
      success: true,
      total: allJobs.length,
      job: allJobs.slice(startIndex, endIndex)
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return Response.json({
      success: false,
      error: "An error occurred while fetching jobs"
    }, { status: 500 });
  }
}