# Recipe Server

Vision: To make a device that can store and display recipies.

Base features:
   - Display ingredients and recipies
   - Easy to press physical buttons to navigate cooking instructions when hands are dirty in middle of cooking
   - Edit recipie list remotely
   - Scalable portions
   - Export shopping list to grocery rewards points app

Extra features (WIP):
   - Meal + leftovers planner (calendar type thing)
   - Expiry tracker
   - Given list of ingredients give meal possibilities (kinda hard to keep updated) maybe easy presets
   - General tips and tricks for prep when an ingredient appears
   - Add tools needed (stove, 1cup measure, table spoon etc.) could eventually use to optimize cooking meals in parallel
   - Group ingredients and align with the step in instructions where needed

## Tasks:
- [x] Plan
- [x] Setup raspberry pi
- [x] Install Nginx
- [x] Develop backend
- [x] Develop frontend
- [x] 3D model/print case and add control buttons
- [x] Script to export shopping list and import it into grocery store rewards points app
- [x] Make frontend more aesthetically pleasing
- [x] Style front list page (add paper texture background and maybe shadow to make it look like recipe cards)
- [x] Make a backup functionality to backup all recipes in the database
- [x] Better database interactions and querying (like filtering)
- [x] Multi-select and switch between them
- [x] Optimize css on the small screen (remove padding on sides and make titles more compact)
- [x] Fix bug where portion num shows 0 on edit page
- [x] Improved ingredient parsing to get a compliled shopping list for multiple recipes
- [x] Improved ingredient measurements (automatic scaling)
- [ ] Image upload and display on recipe cards
- [x] Reverse homepage order so new recipes are at the top
- [x] Fix visual bug where selection css disapears when filtering by tag or text
- [ ] Add ingredient recipe selection/relations
- [x] Add new buttons and figure out better way to convert gpio to keyboard input
- [ ] Power off just turns backlight off should either sleep or disable input, also can turn brightness down or make it a button thing

Tools to use:
   - Raspberry Pi
   - SQL
   - Nginx

Tools to learn:
   - More about web servers and networking
   - Modern fullstack standards
   - Next.js
   - Prisma
   - TypeScript

## Notes:

Backend:
Database for recipies -> relational ingredients and instructions -> what i have at home -> expiery timers + done meals
Grocery store rewards points app script take ingredients for upcoming recipies and export to grocery store rewards points app format and import into grocery store rewards points website ** grocery store rewards points website no longer has this feature so now will copy ingredient list to clipboard to paste into notes app/email

Front end:
On external connection -> add/edit recipies -> que up next session (with scaling) -> export next session to grocery store rewards points app shopping list
On device -> List of recipies sorted by meal type and oldest unused -> choose one or more to add to current session or start session if done on external conneted device -> view current session and move between 1 or more recipies -> for each show ingredients and instrucitons (with scaling not really needed but good incase need to scale at time of cooking)

Buttons that I can hit with elbow (messy hands) to navigate while cooking:
Scroll up and down buttons
Cycle back and forth between group of few recipies buttons
Changed view (side by side or single) button
Maybe 2 extra buttons for extra features (maybe not because done and scaling can all be done from the touch screen and wont be needed while cooking)