import mongoose, { mongo } from "mongoose";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AvailableUserRole } from "../utils/constants.js";

const getProjects = asyncHandler(async(req, res) => {
    const projects = await ProjectMember.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: "projects",
                localField: "projects",
                foreignField: "_id",
                as: "projects",
                pipeline: [
                    {
                        $lookup: {
                            members: {
                                $size: "$projectmembers"
                            }
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$project",
        },
        {
            $project: {
                project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    members: 1,
                    createdAt: 1,
                    createdBy:1,
                },
                role: 1,
                _id: 0
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

const getProjectById = asyncHandler(async(req, res) => {
    const {projectId} = req.params;
    const project = await Project.findById(projectId);

    if(!project){
        throw new ApiError(404, "project not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project fetched successfully"))
});

const createProject = asyncHandler(async(req, res) => {
    const { name, description } = req.body;
    const project = await Project.create({
        name,
        description,
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    await ProjectMember.create({
        user: new mongoose.Types.ObjectId(req.user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role: UserRolesEnum.ADMIN,
    })

    return res
        .status(200)
        .json(new ApiResponse(201, project, "Project created successfully"))
})

const updateProject = asyncHandler(async(req, res) => {
    const {name, description} = req.body;
    const {projectId} = req.params;

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description,
        },
        {
            new : true
        }
    )
    if(!project){
        throw new ApiError(404, "project not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, project, "project updated successfully"));
});

const deleteProject = asyncHandler(async(req, res) => {
    const {projectId} = req.params;
    const project = await Project.findByIdAndDelete(projectId);
    if(!project){
        throw new ApiError(404, "Project not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, project, "project deleted successfully"));
});

const addMembersToProject = asyncHandler (async(req, res) => {
    const {email, role} = req.body
    const {projectId} = req.params;
    const user = await UserActivation.findOne({email});

    if(!user){
        throw new ApiError(404, "user not found");
    }

    await ProjectMember.findByIdAndUpdate(
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
        },
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
            role: role
        },
        {
            new :true,
            upsert: true,
        }
    )
    return res
      .status(201)
      .json(new ApiResponse(201, {}, "Project member added successfully"));
})

//leaving this one right now
const getProjectMembers = asyncHandler(async(req, res) => {
    const {projectId} = req.params;
    const project = await Project.findById(projectId);

    if(!project){
        throw new ApiError(404, "project not found");
    }

    const projectMembers = await ProjectMember.aggregate([])
})

const updateMemberRole = asyncHandler(async (req, res) => {
    const {projectId, userId} = req.params;
    const newRole = req.body;
    
    if(!AvailableUserRole.includes(newRole)){
        throw new ApiError(400, "invalid role")
    }
    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });
    if(!projectMember){
        throw new ApiError(400, "user does not exists")
    }

    projectMember = await ProjectMember.findByIdAndUpdate(
        projectMember._id,
        {
            role: newRole
        },
        { new: true},
    );

    if(!projectMember){
        throw new ApiError(400, "Project member not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,
                projectMember,
                "Project member role updated successfully"
            )
        )
});

const deleteMember = asyncHandler(async (req, res) => {
    const {userId, projectId} = req.params
    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });

    if(!projectMember){
        throw new ApiError(400, "Member not found")
    }
    projectMember = await ProjectMember.findByIdAndUpdate(projectMember._id)
    if(!projectMember){
        throw new ApiError(400, "Project member not found")
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                projectMember,
                "project member deleted successfully"
            )
        )
});

export {
    addMembersToProject,
    createProject,
    deleteMember,
    getProjectById,
    getProjects,
    getProjectMembers,
    updateProject,
    deleteProject,
    updateMemberRole,
};