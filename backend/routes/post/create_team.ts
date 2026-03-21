import express from 'express'
import { TeamsModel } from '../../models/Teams'
const router = express.Router()

router.post('/create_team', async (req, res) => {
    try {
        // get team data sent from the frontend
        const { teamMembers, teamName } = req.body

        // teams don't need members just names
        if (!teamName) {
            return res.status(400).json({ 
                message: 'Missing required fields: teamName' 
            })
        }

        const existingTeam = await TeamsModel.findOne({ teamName }) //check if teamName exists

        if (existingTeam) {
            return res
                .status(400)
                .json({ message: 'Team already exists! Choose a new TeamName' })
        }

        console.log(
            'Received request to create team:',
            teamMembers,
            teamName,
        ) // for debugging

        // create a new team object using the schema
        const team = new TeamsModel({
            teamMembers,
            teamName,
        })

        // save the team to MongoDB
        await team.save()

        res.status(201).json({ 
            message: 'Team created successfully',
            teamID: team._id,
            teamName: team.teamName
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to create team', error })
    }
})

export default router
