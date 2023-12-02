Vision: To make a device that can store and display recipies.

Base features:
   - Display ingredients and recipies
   - Easy to press physical buttons to navigate cooking instructions when hands are dirty in middle of cooking
   - Edit recipie list remotely
   - Scalable portions
   - Export shopping list to pc+ app
Extra features:
   - Meal + leftovers planner (calendar type thing)
   - Expiry tracker
   - Given list of ingredients give meal possibilities (kinda hard to keep updated) maybe easy presets or get from pc+
   - General tips and tricks for prep when an ingredient appears
   - Add tools needed (stove, 1cup measure, table spoon etc.) could eventually use to optimize cooking meals in parallel
   - Group ingredients and align with the step in instructions where needed- [x] Plan
- [x] Setup raspberry pi
- [x] Install Nginx
- [x] Develop backend
- [x] Develop frontend
- [ ] 3D model/print case and add control buttons
- [ ] Script to export shopping list and import it into PC+
- [x] Make frontend more aesthetically pleasingTools to use:
   - Raspberry Pi
   - SQL
   - Nginx
Tools to learn:
   - More about web servers and networking
   - Next.js
   - Prisma
   - Modern fullstack standardsBackend:
Database for recipies -> relational ingredients and instructions -> what i have at home -> expiery timers + done meals
Pc+ script take ingredients for upcoming recipies and export to pc format and import into pc website

Front end:
On external connection -> add/edit recipies -> que up next session (with scaling) -> export next session to PC list
On device -> List of recipies sorted by meal, type and oldest unused -> choose one or more to add to current session or start session if done on external conneted device -> view current session and move between 1 or more recipies -> for each show ingredients and instrucitons (with scaling not really needed but good incase need to scale at time of cooking)

Buttons that I can hit with elbow (messy hands) to navigate while cooking:
Scroll up and down buttons
Cycle back and forth between group of few recipies buttons
Changed view (side by side or single) button
Maybe 2 extra buttons for extra features (maybe not because done and scaling can all be done from the touch screen and wont be needed while cooking)