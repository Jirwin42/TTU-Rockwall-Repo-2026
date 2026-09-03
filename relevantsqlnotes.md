SQL is, more often then not, a pain. Especially when it comes to remembering how to actually interact with the databases we're using.
This file exists to leave specific syntax requirements for each table in the Rockwall Database.

Due note that, ideally, this database and changes to it will be (in the live test enviroment) locked behind Moderator or Super-Moderator accounts. Moderators can only interact with the "visitorsInQueue" database and only via web ui, Super-Mods have access to the rest of the database for administrative or legal purposes.

Also of note: when date/time is added to the database, we have to make use of ISO 8601. When times are sent via web ui, use https://www.timestamp-converter.com/ to convert into ISO time for database usage. This ideally gives enough information to present how long someone actually has been at the Rockwall.

Example:
**exampleTable** - Permissions and accessability level
A sentence or two describing why this table exists, and what information it holds.

column1 - column2 - column3 - etc...
#Note - Exists to elaborate on a column entry.

-------------------------------------------------------------------
**Key Syntax Shortcuts**

*Syntax for adding an entry within the above table*

INSERT INTO exampleTable
VALUES (numvalue1,"textvalue1", etc...)

*Syntax for updating within the above table*

UPDATE exampleTable
SET numvalue1 = 123
WHERE textvalue1 = "456";

*Syntax for deleting within the above table for a conditional*    

DELETE FROM exampleTable
WHERE numvale1 = 123;

*Syntax for moving information from one table to another table*

INSERT INTO exampleTable2 (value1, value2)
SELECT value1a, value2a
FROM exampleTable1
WHERE value3 = "123"

--------------------------------------------------------

**tableSignInInfo** - Super-Mod only
Exists to document info given by those who created appointments to the rockwall via the website, IF entry is unqiue.

Username - TEMPPASSWORD - LastName - FirstName - UniqueID - UserPhone - UserEmail
#Note - TEMPPASSWORD is likely to be encrypted in the live enviroment. However, to ensure more elements of the database work, this is expected to not be encrpyted for now. "UserPhone" is an INT for only numbers and "UserEmail" is TEXT, both are optional and can be NULL if not given by the user.

**tableTrustedUsers** - Super-Mod only
Exists to document Super-Mods and Moderators who have access and are trusted to operate with the database via Web UI. Also includes most recent clock-in for tracking behavior.

UniqueID - LastName - FirstName - Moderator? - Super-Moderator? - Most_recent_clock-in
#Note - Moderator/Super-Moderator are binary and default to 0 for new entires, 0 = false and 1 = true. Also the clock-in is relative to use with Web UI, not with Talon or other timeclock software.

**visitorsInQueue** - Moderator and Super-Mod
When visitors come into the Rockwall, or the applied meeting time triggers in Web UI, visitors are added to the table. Moderators can remove entries as needed to keep Rockwall at 20 max capacity.

UniqueID_SignedUp - UniqueID_Walk-in - Arrival_Time_SignedUp - Arrival_Time_Walk-in
#Note - Arrival Times are set either via appointment from Signed Up or when the user actively walks into the Rockwall. Walk-in IDs are 8 randomized numbers by Web UI.

**visitorsSignedUp** - Super-Mod only
Keeps track of the visitors who have used the Web UI to sign up for specific times for the rockwall. More complicated scheduling rules are intended for Web UI work.

UniqueID - Username - LastName - FirstName - Arrival_Time
#Note - Username, Last Name and First name are required entires for data keeping purposes and backend tracking. If requested, user can request either username for full name for viewing on Web UI frontend.

**visitorsWalkIn** - Moderator and Super-Mod
Keeps track of visitors who physically walk into the rockwall location without an appointment. 

UniqueID - LastName - FirstName - Arrival_Time
#Note - Walk-in IDs are 8 randomized numbers by Web UI. If the walk-in does not provide a name when asked, first name should be "Guest" and last name a incrementing number (1 -> 2 -> 3, etc...). __This table's data is only temp. and should be cleaned out by midnight every night by Web UI__.