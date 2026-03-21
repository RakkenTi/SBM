import express from 'express'
import { Types } from 'mongoose'
import { TeamsModel } from '../../models/Teams'
import { UserModel } from '../../models/User'
const router = express.Router()

router.post('/add_team_member', async (req, res) => {
    try {
        // get team and user data sent from the frontend
        const { teamID, userID } = req.body

        if (!teamID || !userID) {
            return res.status(400).json({ 
                message: 'Missing required fields: teamID and userID are both required.' 
            })
        }

        if (!Types.ObjectId.isValid(teamID) || !Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ 
                message: 'Invalid teamID or userID format' 
            })
        }

        // check if team exists
        const team = await TeamsModel.findById(teamID)

        if (!team) {
            return res.status(404).json({ 
                message: 'Team not found with the provided teamID' 
            })
        }

        // check if user exists
        const user = await UserModel.findById(userID)

        if (!user) {
            return res.status(404).json({ 
                message: 'User not found with the provided userID' 
            })
        }

        // check if user is already a member of the team
        const isMember = team.teamMembers.some(
            (member) => member.toString() === userID
        )

        if (isMember) {
            return res.status(400).json({ 
                message: 'User is already a member of this team' 
            })
        }

        console.log(
            'Received request to add team member:',
            'teamID:', teamID,
            'userID:', userID
        ) // for debugging

        // add user to team's teamMembers array
        team.teamMembers.push(userID)

        // save the updated team to MongoDB
        await team.save()

        res.status(201).json({ 
            message: 'Team member added successfully',
            teamID: team._id,
            teamName: team.teamName,
            teamMembers: team.teamMembers
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to add team member', error })
    }
})

export default router
