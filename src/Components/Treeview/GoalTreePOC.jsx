import React, { useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AssigneesAvatars = ({ assignees = [] }) => {
	const formatName = (name) => name.split(" ")[0];

	const roleColor = {
		A: "#4caf50",
		R: "#1976d2",
	};

	return (
		<AvatarGroup
			max={3}
			sx={{
				"& .MuiAvatar-root": {
					width: 30,
					height: 30,
					fontSize: 12,
					fontWeight: 600,
				},
			}}
		>
			{assignees.map((a) => (
				<Tooltip title={a.emp_name} key={a.emp_id}>
					<Avatar sx={{ bgcolor: roleColor[a.emp_type] || "#757575" }}>
						{a.emp_name.trim()[0].toUpperCase()}
					</Avatar>
				</Tooltip>
			))}
		</AvatarGroup>
	);
};

// ========== SAMPLE DATA ==========
const sampleGoals = {
	"bucket1": [
		{
			goal_id: 1,
			goal_description: "Increase Annual Revenue by 20%",
			goal_alias: "Revenue Growth 2025",
			assignees: [
				{ emp_id: 3, emp_name: "Benedicte Lebreton", emp_type: "A" },
				{ emp_id: 4, emp_name: "Cynthia Afshari", emp_type: "R" },
				{ emp_id: 5, emp_name: "Emma Parmee", emp_type: "R" },
				{ emp_id: 6, emp_name: "Benedicte Lebreton", emp_type: "A" },
				{ emp_id: 7, emp_name: "Cynthia Afshari", emp_type: "R" },
				{ emp_id: 8, emp_name: "Emma Parmee", emp_type: "R" },
			],
			sub_goals: [
				{
					goal_id: 11,
					goal_description: "Expand into new markets",
					goal_alias: "Market Expansion",
					assignees: [
						{ emp_id: 3, emp_name: "Benedicte Lebreton", emp_type: "A" },
						{ emp_id: 7, emp_name: "John Smith", emp_type: "R" },
					],
					sub_goals: [
						{
							goal_id: 111,
							goal_description: "Research European market opportunities",
							goal_alias: "EU Research",
							assignees: [
								{ emp_id: 8, emp_name: "Sarah Johnson", emp_type: "A" },
								{ emp_id: 9, emp_name: "Mike Chen", emp_type: "R" },
							],
							sub_goals: [],
						},
					],
				},
				{
					goal_id: 12,
					goal_description: "Increase product pricing by 10%",
					goal_alias: "Pricing Strategy",
					assignees: [
						{ emp_id: 5, emp_name: "Emma Parmee", emp_type: "A" },
						{ emp_id: 11, emp_name: "Lisa Brown", emp_type: "R" },
					],
					sub_goals: [],
				},
			],
		},
		{
			goal_id: 2,
			goal_description: "Improve Customer Satisfaction Score to 4.5/5",
			goal_alias: "Customer Experience",
			assignees: [
				{ emp_id: 4, emp_name: "Cynthia Afshari", emp_type: "A" },
				{ emp_id: 3, emp_name: "Benedicte Lebreton", emp_type: "R" },
			],
			sub_goals: [
				{
					goal_id: 21,
					goal_description: "Reduce customer support response time",
					goal_alias: "Support Speed",
					assignees: [
						{ emp_id: 12, emp_name: "Tom Wilson", emp_type: "A" },
						{ emp_id: 13, emp_name: "Anna Martinez", emp_type: "R" },
					],
					sub_goals: [],
				},
			],
		},
	],
	"bucket2": [
		{
			goal_id: 3,
			goal_description: "Launch 3 new products",
			goal_alias: "Product Innovation",
			assignees: [
				{ emp_id: 3, emp_name: "Benedicte Lebreton", emp_type: "A" },
				{ emp_id: 4, emp_name: "Cynthia Afshari", emp_type: "A" },
				{ emp_id: 17, emp_name: "Sophie Anderson", emp_type: "R" },
			],
			sub_goals: [
				{
					goal_id: 31,
					goal_description: "Complete product design phase",
					goal_alias: "Design Phase",
					assignees: [
						{ emp_id: 18, emp_name: "Alex Murphy", emp_type: "A" },
						{ emp_id: 19, emp_name: "Nina Patel", emp_type: "R" },
					],
					sub_goals: [],
				},
				{
					goal_id: 32,
					goal_description: "Conduct market testing",
					goal_alias: "Market Test",
					assignees: [
						{ emp_id: 20, emp_name: "Chris Evans", emp_type: "A" },
						{ emp_id: 5, emp_name: "Emma Parmee", emp_type: "R" },
					],
					sub_goals: [],
				},
			],
		},
		{
			goal_id: 4,
			goal_description: "Reduce operational costs by 15%",
			goal_alias: "Cost Optimization",
			assignees: [
				{ emp_id: 21, emp_name: "Oliver Brown", emp_type: "A" },
				{ emp_id: 22, emp_name: "Sophia Martinez", emp_type: "R" },
			],
			sub_goals: [
				{
					goal_id: 41,
					goal_description: "Optimize supply chain efficiency",
					goal_alias: "Supply Chain",
					assignees: [
						{ emp_id: 23, emp_name: "Liam Garcia", emp_type: "A" },
						{ emp_id: 24, emp_name: "Ava Rodriguez", emp_type: "R" },
					],
					sub_goals: [],
				},
			],
		},
	],
	"bucket3": [
		{
			goal_id: 5,
			goal_description: "Expand team by 50 employees",
			goal_alias: "Talent Acquisition",
			assignees: [
				{ emp_id: 25, emp_name: "Noah Wilson", emp_type: "A" },
				{ emp_id: 26, emp_name: "Isabella Moore", emp_type: "R" },
				{ emp_id: 27, emp_name: "James Taylor", emp_type: "R" },
			],
			sub_goals: [
				{
					goal_id: 51,
					goal_description: "Hire 20 software engineers",
					goal_alias: "Engineering Hiring",
					assignees: [
						{ emp_id: 28, emp_name: "Mason Lee", emp_type: "A" },
						{ emp_id: 29, emp_name: "Charlotte Harris", emp_type: "R" },
					],
					sub_goals: [
						{
							goal_id: 511,
							goal_description: "Post job openings on LinkedIn",
							goal_alias: "Job Postings",
							assignees: [
								{ emp_id: 30, emp_name: "Elijah Clark", emp_type: "A" },
								{ emp_id: 31, emp_name: "Amelia Lewis", emp_type: "R" },
							],
							sub_goals: [],
						},
					],
				},
				{
					goal_id: 52,
					goal_description: "Build HR onboarding process",
					goal_alias: "Onboarding",
					assignees: [
						{ emp_id: 26, emp_name: "Isabella Moore", emp_type: "A" },
						{ emp_id: 32, emp_name: "Lucas Walker", emp_type: "R" },
					],
					sub_goals: [],
				},
			],
		},
		{
			goal_id: 6,
			goal_description: "Achieve carbon neutrality by 2030",
			goal_alias: "Sustainability Goal",
			assignees: [
				{ emp_id: 33, emp_name: "Harper Hall", emp_type: "A" },
				{ emp_id: 34, emp_name: "Evelyn Allen", emp_type: "R" },
			],
			sub_goals: [
				{
					goal_id: 61,
					goal_description: "Switch to renewable energy sources",
					goal_alias: "Renewable Energy",
					assignees: [
						{ emp_id: 35, emp_name: "Benjamin Young", emp_type: "A" },
						{ emp_id: 36, emp_name: "Mia King", emp_type: "R" },
					],
					sub_goals: [],
				},
			],
		},
	],
};


// ========== COMPONENT ==========
const GoalTreePOC = () => {
	// State to track which buckets are expanded
	const [expandedBuckets, setExpandedBuckets] = useState({});

	// Toggle bucket expansion
	const toggleBucket = (bucketName) => {
		setExpandedBuckets((prev) => ({
			...prev,
			[bucketName]: !prev[bucketName],
		}));
	};

	const renderTree = (goal, level = 0) => {
		const hasSubGoals = goal.sub_goals && goal.sub_goals.length > 0;

		return (
			<TreeItem
				sx={{
					"& .MuiTreeItem-content.Mui-focused": {
						backgroundColor: "transparent !important",
					},
					"& .MuiTreeItem-content.Mui-selected": {
						backgroundColor: "transparent !important",
					},
					"& .MuiTreeItem-label": {
						paddingY: "4px",
					},
				}}
				key={goal.goal_id}
				itemId={String(goal.goal_id)}
				label={
					<Box
						sx={{
							py: 1,
							display: "flex",
							flexDirection: "column",
							gap: 0.5,
						}}
					>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Typography
								variant="body1"
								sx={{
									fontWeight: level === 0 ? 600 : 500,
									fontSize: level === 0 ? "15px" : "14px",
									color: "#000",
								}}
							>
								{goal.goal_description}
							</Typography>

							<Box sx={{ ml: 1 }}>
								<AssigneesAvatars assignees={goal.assignees} />
							</Box>
						</Box>

						{goal.goal_alias && (
							<Typography variant="caption" sx={{ color: "#666", fontStyle: "italic" }}>
								{goal.goal_alias}
							</Typography>
						)}
					</Box>
				}
			>
				{hasSubGoals && goal.sub_goals.map((sg) => renderTree(sg, level + 1))}
			</TreeItem>
		);
	};

	return (
		<Box sx={{ py: 4, px: 3 }}>
			<Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
				Goal Tree View - POC
			</Typography>

			<Box sx={{ borderRadius: "8px", p: 2 }}>
				<SimpleTreeView sx={{ flexGrow: 1, maxWidth: "100%" }}>
					{Object.keys(sampleGoals).map((bucketName) => (
						<Box key={bucketName} sx={{ mb: 2 }}>
							{/* Bucket Header with Toggle Icon */}
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1,
									mb: 1,
									cursor: "pointer",
									backgroundColor: "#f5f5f5",
									padding: "8px 12px",
									borderRadius: "8px",
									"&:hover": {
										backgroundColor: "#e0e0e0",
									},
								}}
								onClick={() => toggleBucket(bucketName)}
							>
								<IconButton
									size="small"
									sx={{
										padding: 0,
										color: "#1976d2",
									}}
								>
									{expandedBuckets[bucketName] ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
								<Typography
									variant="h6"
									sx={{
										fontWeight: 600,
										fontSize: "16px",
										textTransform: "capitalize",
									}}
								>
									{bucketName}
								</Typography>
							</Box>

							{/* Collapsible Goals Section */}
							<Collapse in={"2"==="2"} timeout="auto">
								<Box sx={{ pl: 2 }}>
									{sampleGoals[bucketName].map((goal) => (
										<Box
											key={goal.goal_id}
											sx={{
												border: "3px dotted #BDBDBD",
												borderRadius: "8px",
												padding: "8px",
												marginBottom: "16px",
											}}
										>
											{renderTree(goal)}
										</Box>
									))}
								</Box>
							</Collapse>
						</Box>
					))}
				</SimpleTreeView>
			</Box>
		</Box>
	);
};

export default GoalTreePOC;
