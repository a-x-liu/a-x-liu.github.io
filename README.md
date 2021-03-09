# timetabling.github.io
Features that are currently being worked on (ordered by urgency):
- improve the new event modal:
   - add a better color selector -> switch from type to colour selecter (DONE)
   - add must have astriesks for fields that must be filled (DONE)
- Overall better style of the page -> reduce white space (DONE)
Basic page design and functionality will finish by this point
- better style for the popovers
-------------------------------------------
REFACTOR CODE 
- fix up the file sttructure 
- update to react -> so don't have to deal with updating data and dom
                  -> update to declarative programming
- maybe update to mysql backend
-------------------------------------------
Extensions:
- allowing for more start and end times:
   - timetabling after midnight (e.g 8pm - 2am)
- click and drag edges of box to 
- dark mode lol

Other updates in the works...

Known Bugs:
- on windows when cancelling a new event click and drag from certain cells stop working, will fix itself after click and dragging other boxes and exiting them (not sure what is happening here)
- when changing start and end time -> big changes will make events slightly out of position in grid -> currently resizing the window seems to snap them back perfectly
