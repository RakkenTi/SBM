import express from 'express'
import { Types } from 'mongoose'
import { TeamsModel } from '../../models/Teams'
import { UserModel } from '../../models/User'
const router = express.Router()

router.post('/remove_team_member', async (req, res) => {
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

        // check if user is a member of the team
        const isMember = team.teamMembers.some(
            (member) => member.toString() === userID
        )

        if (!isMember) {
            return res.status(400).json({ 
                message: 'User is not a member of this team' 
            })
        }

        // remove user from team's teamMembers array
        team.teamMembers = team.teamMembers.filter(
            (member) => member.toString() !== userID
        )

        // save the updated team to MongoDB
        await team.save()

        res.status(200).json({ 
            message: 'Team member removed successfully',
            teamID: team._id,
            teamName: team.teamName,
            teamMembers: team.teamMembers
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove team member', error })
    }
})

export default router
